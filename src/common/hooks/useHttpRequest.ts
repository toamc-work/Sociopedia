import { useState, useEffect, Dispatch } from "react"

namespace UseHttpRequestHook {
    export interface IState<Payload> { 
        loading:boolean;
        error:Error | null
        payload: Payload | null
    }

    export type IResponse<Payload> = [UseHttpRequestHook.IState<Payload> ,(httpRequest: () => Promise<Payload>) => Promise<void>]

}

export const useHttpRequest = <Payload>(handler?: (payload:Payload) => void):UseHttpRequestHook.IResponse<Payload> => {
    const [state, setState] = useState<UseHttpRequestHook.IState<Payload>>({
        loading:false,
        error:null,
        payload:null,
    });

    const wrapHttpRequest = async (httpRequest: () => Promise<Payload>) => {
        try
        {
            setState((prevState) => {
                return {
                    ...prevState,
                    loading:true
                };
            });
    
            const payload:Payload =await httpRequest()
            setState((prevState) => {
                return {
                    ...prevState,
                    loading:false,
                    payload:payload
                };
            });
        }
        catch(error)
        {
            setState((prevState) => {
                return {
                    ...prevState,
                    loading:false,
                    error: error instanceof Error ? error : new Error('Failed Https Request'),
                };
            });
        };
    }

    useEffect(() => {

        if(state.payload != null)
        {
            if(handler != undefined)
            {
                handler(state.payload);
            };
        }

    },[state.payload])

    return [ state, wrapHttpRequest ]
}