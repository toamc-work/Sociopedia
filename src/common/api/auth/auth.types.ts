import { IStateAuth } from "../../../state"

export namespace AuthServiceTypes {

    /* saveUser */
    export type ISaveUserResponseStatus201 = IStateAuth.IUser 
    export interface ISaveUserResponseStatus500 {
        error:string
    }; 

    /*authUser*/

    export interface IAuthUserCredentials {
        email:string,
        password:string,
    };

    export interface IAuthUserResponse200 {
        user: IStateAuth.IUser,
        token: string,
    };

    export interface IAuthUserResponse400 {
        msg: 'Invalid Credentials' | 'User does not exists'
    };

    export interface IAuthUserResponse500 {
        error:string;
    };
}

export interface IAuthService {
    saveUser: (formData:FormData) => Promise<AuthServiceTypes.ISaveUserResponseStatus201>
    authUser: (credentials:AuthServiceTypes.IAuthUserCredentials) => Promise<AuthServiceTypes.IAuthUserResponse200 | AuthServiceTypes.IAuthUserResponse400>   
}


