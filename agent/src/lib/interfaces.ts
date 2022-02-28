
export interface IFunctionPointer {
    name: string,
    ptr: NativePointer,
    column_id?: string,
    onEnter?,
    onLeave?,
}