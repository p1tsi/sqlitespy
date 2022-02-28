import datetime
import click
import sqlparse
from sqlparse.tokens import DML, Whitespace, Wildcard, Name, Keyword, Literal
from sqlparse.sql import Identifier, IdentifierList, Function

from os import path

from sqlitespy.utils.query import Query, SelectQuery


class Agent:
    def __init__(self, session, reactor, parse, verbose):
        """
        Initialize the Frida agent
        """
        self._pending_queries = dict()
        self._script_path = path.join(path.abspath(path.dirname(__file__)), '../../_agent.js')
        with open(self._script_path) as src_f:
            script_src = src_f.read()
        self._script = session.create_script(script_src)
        self._reactor = reactor
        self._agent = None
        self._parse_result_set = parse
        self._verbose = verbose

    def start_hooking(self, ui):
        def on_message(message, data):
            self._reactor.schedule(lambda: self._on_message(message, data, ui))

        self._script.on('message', on_message)
        self._script.load()
        ui._update_status("Installing hooks...")
        self._agent = self._script.exports
        self._agent.install_hooks()

    def _on_message(self, message, data, ui):
        if message['type'] == 'error':
            click.secho(message['stack'], fg='red')
        mtype = message.get('payload', {}).get('type', '')

        if mtype == 'agent:hooks_installed':
            ui._update_status("Hooks installed, intercepting messages...")
            ui._resume()
        elif mtype == 'agent:trace:symbol':
            symbol = message['payload']['message']['symbol']
            data = message['payload']['message']['data']
            tid = message['payload']['message']['tid']

            if "open" in symbol:
                print(f"{datetime.datetime.fromtimestamp((message['payload']['message']['timestamp'] / 1000))} "
                      f"[{tid}]:\tDB\t->\t{data}")

            elif "sqlite3_exec" in symbol:

                query_string, _ = self._parse_query(data)
                if query_string:
                    query = Query(data, tid)
                    query.print_query(message['payload']['message']['timestamp'])
            else:
                query = self._pending_queries.get(tid, None)

                # PREPARE
                if "prepare" in symbol:
                    query_string, select_columns = self._parse_query(data)
                    if query_string:
                        if select_columns:
                            query = SelectQuery(data, tid, select_columns)
                        else:
                            query = Query(data, tid)
                        self._pending_queries[tid] = query

                # BIND PARAMS
                elif "bind_text" in symbol:
                    if query:
                        param = message['payload']['message']['param']
                        query.bind_text(param, data)
                elif "bind_int" in symbol:
                    if query:
                        param = message['payload']['message']['param']
                        query.bind_numeric(param, data)
                elif "bind_double" in symbol:
                    if query:
                        param = message['payload']['message']['param']
                        query.bind_numeric(param, data)
                elif "bind_blob" in symbol:
                    if query:
                        param = message['payload']['message']['param']
                        query.bind_text(param, data)  # TODO: PARSE BPLISTxx
                        #query.bind_text(param, "<BLOB>")

                # EXECUTE QUERY
                elif "step" in symbol:
                    if query:
                        ts = message['payload']['message']['timestamp']
                        result_code = message['payload']['message']['data']
                        query.print_query(ts, result_code)

                # CLOSE STMT
                elif "finalize" in symbol:
                    if query:
                        query.print_row()
                        del self._pending_queries[tid]

                # RESET STMT PARAMS
                elif "reset" in symbol:
                    if query:
                        query.print_row()
                        self._pending_queries[tid].reset_bindings()

                # PARSE RESULT SET
                elif "column_int" in symbol:
                    if self._parse_result_set and query:
                        column_id = message['payload']['message']['column']
                        query.column_int(column_id, data)
                elif "column_dobule" in symbol:
                    if self._parse_result_set and query:
                        column_id = message['payload']['message']['column']
                        query.column_int(column_id, data)
                elif "column_text" in symbol:
                    if self._parse_result_set and query:
                        column_id = message['payload']['message']['column']
                        query.column_text(column_id, data)
                """elif "column_bytes" in symbol:
                    if self._parse_result_set and query:
                        column_id = message['payload']['message']['column']
                        query.column_text(column_id, data)"""

            """elif "append" in symbol:
                 if query:
                     query.append_str_to_query(data)"""

        else:
            ui._print(f"Unhandled message {message}")

    def _parse_query(self, query):
        final_query = ""
        select_columns = list()
        statements = sqlparse.parse(query)
        for stmt in statements:

            # If not in verbose mode, truncate some kind of stmts
            if not self._verbose and (stmt.value.lower().startswith("begin") or stmt.value.lower().startswith(
                    "end") or stmt.value.lower().startswith("commit") or stmt.value.lower().startswith(
                "rollback") or stmt.value.lower().startswith("pragma")):
                continue
            final_query = final_query.join(stmt.value)
            tokens = stmt.tokens
            if tokens[0].match(DML, ['select']):
                tokens = list(filter(lambda x: not x.match(Whitespace, [" "], tokens), tokens))
                select_columns = self._get_select_columns(tokens[1])

        return final_query, select_columns

    @staticmethod
    def _get_select_columns(columns_token):

        def _get_identifier(identifier_token):
            if identifier_token.tokens[0].match(Name, [".*"], regex=True):  # len(identifier_token.tokens) == 1 and
                return identifier_token.value
            else:
                for t in identifier_token.tokens:
                    if t.match(Keyword, ["as", "AS"]):
                        return identifier_token.tokens[-1].value

        select_columns = list()
        if columns_token.match(Wildcard, ['*']):
            select_columns = ['*']

        elif type(columns_token) == Identifier:
            select_columns.append(_get_identifier(columns_token))

        elif type(columns_token) == IdentifierList:
            for token in columns_token.tokens:
                if type(token) == Identifier:
                    select_columns.append(_get_identifier(token))

                # this is not so beautiful, but sqlparse seems to consider following string as Keyword
                # even though they are simply names of columns of the table of current statement
                elif token.value.lower() in ["uuid", "timestamp", "type"] or type(token) == Function or token.match(
                        Literal.Number.Integer, values=[".*"], regex=True):
                    select_columns.append(token.value)

        elif type(columns_token) == Function:
            select_columns.append(columns_token.tokens[0].value)

        return select_columns
