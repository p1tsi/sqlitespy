import { IFunctionPointer } from './lib/interfaces';
import {
    SQLitePrepareV2,
    SQLiteBindText,
    SQLiteBindInt,
    SQLiteStep,
    SQLiteBindInt64,
    SQLiteBindDouble,
    SQLiteExec,
    SQLiteColumnInt,
    SQLiteColumnInt64,
    SQLiteColumnDouble,
    SQLiteColumnText,
    SQLiteFinalize,
    SQLiteReset,
    SQLitePrepareV3,
    SQLitePrepare,
    SQLiteStrAppendf,
    SQLiteStrVappendf,
    SQLiteOpen,
    SQLiteOpenV2,
    SQLiteOpen16,
    SQLiteBindBlob,
    SQLiteColumnBytes
} from './lib/systemFunctions';


export const SQLiteFunctionPointers: IFunctionPointer[] = [
    SQLitePrepareV2,
    SQLiteBindText,
    SQLiteBindInt,
    SQLiteBindInt64,
    SQLiteBindDouble,
    SQLiteBindBlob,
    SQLiteStep,
    SQLiteExec,
    SQLiteColumnInt,
    SQLiteColumnInt64,
    SQLiteColumnDouble,
    SQLiteColumnText,
    SQLiteFinalize,
    SQLiteReset,
    SQLitePrepareV3,
    SQLitePrepare,
    //SQLiteStrAppendf,
    //SQLiteStrVappendf,
    SQLiteOpen,
    SQLiteOpenV2,
    SQLiteOpen16,
    SQLiteColumnBytes
]

