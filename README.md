# sqlitespy - SQLite C API interceptor

## Features:
* Intercept (currently not all) sqlite C API functions
* iOS support.

## Example:
1.Compile the agent with:
```
$ make compile-agent
```
2. Launch the script
```
$ python3 sqlite-runner.py -U -f com.apple.mobilesafari -r -v
```

Inspired by: https://github.com/hot3eed/xpcspy
