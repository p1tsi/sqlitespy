import { IFunctionPointer } from './interfaces';

const libSQLiteDylib = 'libsqlite3.dylib';

//DB STUFF
const p_sqlite3_open = Module.getExportByName(libSQLiteDylib, "sqlite3_open");
const p_sqlite3_open16 = Module.getExportByName(libSQLiteDylib, "sqlite3_open16");
const p_sqlite3_open_v2 = Module.getExportByName(libSQLiteDylib, "sqlite3_open_v2");

// QUERIES ROUTINE
const p_sqlite3_prepare = Module.getExportByName(libSQLiteDylib, 'sqlite3_prepare');
const p_sqlite3_prepare_v2 = Module.getExportByName(libSQLiteDylib, 'sqlite3_prepare_v2');
const p_sqlite3_prepare_v3 = Module.getExportByName(libSQLiteDylib, 'sqlite3_prepare_v3');
const p_sqlite3_str_appendf = Module.getExportByName(libSQLiteDylib, 'sqlite3_str_appendf');
const p_sqlite3_str_vappendf = Module.getExportByName(libSQLiteDylib, 'sqlite3_str_vappendf');
const p_sqlite3_step = Module.getExportByName(libSQLiteDylib, 'sqlite3_step');
const p_sqlite3_exec = Module.getExportByName(libSQLiteDylib, 'sqlite3_exec');
const p_sqlite3_reset = Module.getExportByName(libSQLiteDylib, 'sqlite3_reset');
const p_sqlite3_finalize = Module.getExportByName(libSQLiteDylib, 'sqlite3_finalize');

// PARAMS BIND
const p_sqlite3_bind_text = Module.getExportByName(libSQLiteDylib, 'sqlite3_bind_text');
const p_sqlite3_bind_int = Module.getExportByName(libSQLiteDylib, 'sqlite3_bind_int');
const p_sqlite3_bind_int64 = Module.getExportByName(libSQLiteDylib, 'sqlite3_bind_int64');
const p_sqlite3_bind_double = Module.getExportByName(libSQLiteDylib, 'sqlite3_bind_double');
const p_sqlite3_bind_blob = Module.getExportByName(libSQLiteDylib, 'sqlite3_bind_blob');

// GET RESULTS
const p_sqlite3_column_int = Module.getExportByName(libSQLiteDylib, 'sqlite3_column_int');
const p_sqlite3_column_int64 = Module.getExportByName(libSQLiteDylib, 'sqlite3_column_int64');
const p_sqlite3_column_double = Module.getExportByName(libSQLiteDylib, 'sqlite3_column_double');
const p_sqlite3_column_text = Module.getExportByName(libSQLiteDylib, 'sqlite3_column_text');
const p_sqlite3_column_bytes = Module.getExportByName(libSQLiteDylib, 'sqlite3_column_bytes');


export const SQLiteOpen: IFunctionPointer = {
    name: 'sqlite3_open',
    ptr: p_sqlite3_open,
    onEnter: function(args: InvocationArguments){
        const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        timestamp: ts,
		        symbol: this.name,
		        data: args[0].readUtf8String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    },
};

export const SQLiteOpenV2: IFunctionPointer = {
    name: 'sqlite3_open_v2',
    ptr: p_sqlite3_open_v2,
    onEnter: function(args: InvocationArguments){
        const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        timestamp: ts,
		        symbol: this.name,
		        data: args[0].readUtf8String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    },
};

export const SQLiteOpen16: IFunctionPointer = {
    name: 'sqlite3_open16',
    ptr: p_sqlite3_open16,
    onEnter: function(args: InvocationArguments){
        const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        timestamp: ts,
		        symbol: this.name,
		        data: args[0].readUtf16String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    },
};


export const SQLiteExec: IFunctionPointer = {
    name: 'sqlite3_exec',
    ptr: p_sqlite3_exec,
    onEnter: function(args: InvocationArguments){
        const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        timestamp: ts,
		        symbol: this.name,
		        data: args[1].readUtf8String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    },
};

export const SQLiteReset: IFunctionPointer = {
    name: 'sqlite3_reset',
    ptr: p_sqlite3_reset,
    onLeave: function(retval: NativePointer){
        const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        timestamp: ts,
		        symbol: this.name,
		        data: retval.toString(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    },
};


export const SQLitePrepare: IFunctionPointer = {
    name: 'sqlite3_prepare',
    ptr: p_sqlite3_prepare,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        data: args[1].readUtf8String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    }
};

export const SQLitePrepareV2: IFunctionPointer = {
    name: 'sqlite3_prepare_v2',
    ptr: p_sqlite3_prepare_v2,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        data: args[1].readUtf8String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    }
};

export const SQLitePrepareV3: IFunctionPointer = {
    name: 'sqlite3_prepare_v3',
    ptr: p_sqlite3_prepare_v3,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        data: args[1].readUtf8String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    }
};

export const SQLiteStrAppendf: IFunctionPointer = {
    name: 'sqlite3_str_appendf',
    ptr: p_sqlite3_str_appendf,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        data: args[1].readUtf8String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    }
};

export const SQLiteStrVappendf: IFunctionPointer = {
    name: 'sqlite3_str_vappendf',
    ptr: p_sqlite3_str_vappendf,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        data: args[1].readUtf8String(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    }
};

export const SQLiteFinalize: IFunctionPointer = {
    name: 'sqlite3_finalize',
    ptr: p_sqlite3_finalize,
    onLeave: function(retval: NativePointer){
        const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        timestamp: ts,
		        symbol: this.name,
		        data: retval.toString(),
		        tid: Process.getCurrentThreadId()
            }
	    });
    },
};

export const SQLiteBindInt: IFunctionPointer = {
    name: 'sqlite3_bind_int',
    ptr: p_sqlite3_bind_int,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
                symbol: this.name,
                param: args[1].toString(),
                data: args[2].toString(),
                tid: Process.getCurrentThreadId()
            }
	    });
    },
};

export const SQLiteBindInt64: IFunctionPointer = {
    name: 'sqlite3_bind_int64',
    ptr: p_sqlite3_bind_int64,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        param: args[1].toString(),
		        data: args[2].toString(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};

export const SQLiteBindText: IFunctionPointer = {
    name: 'sqlite3_bind_text',
    ptr: p_sqlite3_bind_text,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        param: args[1].toString(),
		        data: args[2].readUtf8String(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};


export const SQLiteBindDouble: IFunctionPointer = {
    name: 'sqlite3_bind_double',
    ptr: p_sqlite3_bind_double,
    onEnter: function(args: InvocationArguments){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        param: args[1].toString(),
		        data: args[2].toString(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};

export const SQLiteBindBlob: IFunctionPointer = {
    name: 'sqlite3_bind_blob',
    ptr: p_sqlite3_bind_blob,
    onEnter: function(args: InvocationArguments){
        var length = int64(args[3].toString());
        var buf = "NULL";
        if (length.toNumber() > 0) {
            buf = args[2].readByteArray(length.toNumber()).unwrap().readCString();
        }
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        symbol: this.name,
		        param: args[1].toString(),
		        data: buf,
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};

export const SQLiteStep: IFunctionPointer = {
    name: 'sqlite3_step',
    ptr: p_sqlite3_step,
    onLeave: function(retval: NativePointer){
        const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        timestamp: ts,
		        symbol: this.name,
		        data: retval.toString(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};

/*
COLUMN FUNCTIONS
*/
export const SQLiteColumnInt: IFunctionPointer = {
    name: 'sqlite3_column_int',
    ptr: p_sqlite3_column_int,
    column_id: '',
    onEnter: function(args:InvocationArguments){
        this.column_id = args[1].toString();
    },
    onLeave: function(retval: NativePointer){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        column: this.column_id,
		        data: retval.toString(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};

export const SQLiteColumnInt64: IFunctionPointer = {
    name: 'sqlite3_column_int64',
    ptr: p_sqlite3_column_int64,
    column_id: '',
    onEnter: function(args:InvocationArguments){
        this.column_id = args[1].toString();
    },
    onLeave: function(retval: NativePointer){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        column: this.column_id,
		        data: retval.toString(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};

export const SQLiteColumnDouble: IFunctionPointer = {
    name: 'sqlite3_column_double',
    ptr: p_sqlite3_column_double,
    column_id: '',
    onEnter: function(args: InvocationArguments){
        this.column_id = args[1].toString();
    },
    onLeave: function(retval: NativePointer){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        column: this.column_id,
		        data: retval.toString(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};

export const SQLiteColumnText: IFunctionPointer = {
    name: 'sqlite3_column_text',
    ptr: p_sqlite3_column_text,
    column_id: '',
    onEnter: function(args:InvocationArguments){
        this.column_id = args[1].toString();
    },
    onLeave: function(retval: NativePointer){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        column: this.column_id,
		        data: retval.readUtf8String(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};

export const SQLiteColumnBytes: IFunctionPointer = {
    name: 'sqlite3_column_bytes',
    ptr: p_sqlite3_column_bytes,
    column_id: '',
    onEnter: function(args:InvocationArguments){
        this.column_id = args[1].toString();
    },
    onLeave: function(retval: NativePointer){
        //const ts = Date.now();
        send({
		    type: 'agent:trace:symbol',
		    message: {
		        //timestamp: ts,
		        symbol: this.name,
		        column: this.column_id,
		        data: retval.toString(),
		        tid: Process.getCurrentThreadId()
		    }
	    });
    },
};



