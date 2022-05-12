from frida_tools.application import ConsoleApplication
from frida_tools.tracer import UI

from sqlitespy.utils.agent import Agent


class SQLiteSpyApplication(ConsoleApplication, UI):
    def _usage(self):
        return "usage: python sqlite-dev-runner.py [options] target"

    def _needs_target(self):
        return True

    def _add_options(self, parser):
        parser.add_option('-r', '--print-result-set',
                          help="Parse 'SELECT' queries result set",
                          action='store_true')
        parser.add_option('-v', '--verbose',
                          help="Print all queries (also PRAGMA and transactions ones)",
                          action='store_true')

    def _initialize(self, parser, options, args):
        self._should_parse = options.print_result_set or False
        self._verbose = options.verbose or False

    def _start(self):
        agent = Agent(self._session, self._reactor, self._should_parse, self._verbose)
        agent.start_hooking(self)


def main():
    app = SQLiteSpyApplication()
    app.run()
