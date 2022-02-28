import { IFunctionPointer } from './lib/interfaces';
import { SQLiteFunctionPointers } from './consts';


export function installHooks() {
	const pointers: IFunctionPointer[] = [];

	pointers.push(...SQLiteFunctionPointers);
	
	for (let pointer of pointers) {
		Interceptor.attach(pointer.ptr, 
			{ 
				onEnter: function(args: InvocationArguments) {
				    if (pointer.onEnter){
				        pointer.onEnter(args);
				    }
				},
				onLeave: function(retval: NativePointer){
				    if (pointer.onLeave){
				        pointer.onLeave(retval);
				    }
				}
			}
        );
	}

	send({
		'type': 'agent:hooks_installed'
	});
}
