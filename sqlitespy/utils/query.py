import re
import datetime
import time

# define SQLITE_OK           0   /* Successful result */
# define SQLITE_ERROR        1   /* SQL error or missing database */
# define SQLITE_INTERNAL     2   /* Internal logic error in SQLite */
# define SQLITE_PERM         3   /* Access permission denied */
# define SQLITE_ABORT        4   /* Callback routine requested an abort */
# define SQLITE_BUSY         5   /* The database file is locked */
# define SQLITE_LOCKED       6   /* A table in the database is locked */
# define SQLITE_NOMEM        7   /* A malloc() failed */
# define SQLITE_READONLY     8   /* Attempt to write a readonly database */
# define SQLITE_INTERRUPT    9   /* Operation terminated by sqlite3_interrupt()*/
# define SQLITE_IOERR       10   /* Some kind of disk I/O error occurred */
# define SQLITE_CORRUPT     11   /* The database disk image is malformed */
# define SQLITE_NOTFOUND    12   /* NOT USED. Table or record not found */
# define SQLITE_FULL        13   /* Insertion failed because database is full */
# define SQLITE_CANTOPEN    14   /* Unable to open the database file */
# define SQLITE_PROTOCOL    15   /* NOT USED. Database lock protocol error */
# define SQLITE_EMPTY       16   /* Database is empty */
# define SQLITE_SCHEMA      17   /* The database schema changed */
# define SQLITE_TOOBIG      18   /* String or BLOB exceeds size limit */
# define SQLITE_CONSTRAINT  19   /* Abort due to constraint violation */
# define SQLITE_MISMATCH    20   /* Data type mismatch */
# define SQLITE_MISUSE      21   /* Library used incorrectly */
# define SQLITE_NOLFS       22   /* Uses OS features not supported on host */
# define SQLITE_AUTH        23   /* Authorization denied */
# define SQLITE_FORMAT      24   /* Auxiliary database format error */
# define SQLITE_RANGE       25   /* 2nd parameter to sqlite3_bind out of range */
# define SQLITE_NOTADB      26   /* File opened that is not a database file */
# define SQLITE_ROW         100  /* sqlite3_step() has another row ready */
# define SQLITE_DONE        101  /* sqlite3_step() has finished executing */


QUERY_RESULT_CODES = {
    0: "SQLITE_OK",
    1: "SQLITE_ERROR",
    2: "SQLITE_INTERNAL",
    3: "SQLITE_PERM",
    4: "SQLITE_ABORT",
    5: "SQLITE_BUSY",
    6: "SQLITE_LOCKED",
    7: "SQLITE_NOMEM",
    8: "SQLITE_READONLY",
    9: "SQLITE_INTERRUPT",
    10: "SQLITE_IOERR",
    11: "SQLITE_CORRUPT",
    12: "SQLITE_NOTFOUND",
    13: "SQLITE_FULL",
    14: "SQLITE_CANTOPEN",
    15: "SQLITE_PROTOCOL",
    16: "SQLITE_EMPTY",
    17: "SQLITE_SCHEMA",
    18: "SQLITE_TOOBIG",
    19: "SQLITE_CONSTRAINT",
    20: "SQLITE_MISMATCH",
    21: "SQLITE_MISUSE",
    22: "SQLITE_NOLFS",
    23: "SQLITE_AUTH",
    24: "SQLITE_FORMAT",
    25: "SQLITE_RANGE",
    26: "SQLITE_NOTADB",
    100: "SQLITE_ROW",
    101: "SQLITE_DONE"
}


class Query:
    def __init__(self, query, tid):
        self.query = query
        self.tid = tid
        self.substitutions = dict()
        self.timestamp = time.time()
        self.result_code = None

    def append_str_to_query(self, data):
        self.query = f"{self.query} {data}"

    def bind_text(self, param, data):
        self.substitutions[int(param, 16)] = str(data)

    def bind_numeric(self, param, data):
        self.substitutions[int(param, 16)] = str(int(data, 16))

    def reset_bindings(self):
        self.substitutions = dict()

    def print_query(self, ts, result_code=None):
        self.timestamp = ts
        self.result_code = QUERY_RESULT_CODES[int(result_code, 16)] if result_code else None
        populated_query = self.query
        substitutions = sorted(self.substitutions.items())
        for _, value in substitutions:
            populated_query = re.sub(r"[?]", value, populated_query, count=1)
        print(f"{datetime.datetime.fromtimestamp((ts / 1000))} [{self.tid}]:\t{populated_query}\t->"
              f"\t{self.result_code}")

    def column_int(self, column_id, data):
        pass

    def column_text(self, column_id, data):
        pass

    def print_row(self):
        pass


class SelectQuery(Query):
    def __init__(self, query, tid, columns):
        super().__init__(query, tid)
        self.columns = columns if columns[0] != "*" else [f"d_{i}" for i in range(30)]
        self.result_set = {i: int(i) if re.match(r"[\d]+", i) else None for i in self.columns}

    def column_int(self, column_id, data):
        try:
            column = self.columns[int(column_id, 16)]
            self.result_set[column] = int(data, 16)
        except IndexError:
            print(f"{int(column_id, 16)} out of range. Data: {int(data, 16)}")

    def column_text(self, column_id, data):
        try:
            column = self.columns[int(column_id, 16)]
            self.result_set[column] = data
        except IndexError:
            print(f"{int(column_id, 16)} out of range. Data: {data}")

    def print_row(self):
        if self.result_code == "SQLITE_ROW":
            print(f"{datetime.datetime.fromtimestamp((self.timestamp / 1000))} [{self.tid}]:\t{self.result_set}")
