import { IStateAuth } from "../../../state";

export namespace API {

    type ISaveUserResponseStatus201 = IStateAuth.IUser 

    interface ISaveUserResponseStatus500 {
        error:string
    }; 

    export async function saveUser(formData:FormData):Promise<ISaveUserResponseStatus201> {
        const url = process.env.REACT_APP_BACKEND_URL + '/auth/register';
        console.log(url)
        const options = 
        {
            method:'post',
            body:formData,
        }

        const saveUserResponse:Response = await fetch(url, options);
        console.log({saveUserResponse})

        if(saveUserResponse.status === 201) {
            const savedUser:ISaveUserResponseStatus201 = await saveUserResponse.json();
            return savedUser; 
        }
        else
        {
            const badResponse:ISaveUserResponseStatus500 = await saveUserResponse.json();
            console.log(badResponse);
            throw new Error(badResponse.error);
        };
    }; 

    interface IAuthUserCredentials {
        email:string,
        password:string,
    };

    interface IAuthUserResponse200 {
        user: IStateAuth.IUser,
        token: string,
    };

    interface IAuthUserResponse400 {
        msg: 'Invalid Credentials' | 'User does not exists'
    };

    interface IAuthUserResponse500 {
        error:string;
    };

    type IAuthUserResponses = IAuthUserResponse200 | IAuthUserResponse400

    export async function authUser(credentials: IAuthUserCredentials):Promise<IAuthUserResponses> {
        const url = process.env.REACT_APP_BACKEND_URL + '/auth/login';
        const options = {
            method:'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify(credentials),
        };

        const loginResponse:Response = await fetch(url, options);
        
        if(loginResponse.status === 200) {
            const loggedIn:IAuthUserResponse200 = await loginResponse.json(); 
            return loggedIn
            
        }
        else if(loginResponse.status === 400) {
            const badRequest:IAuthUserResponse400 = await loginResponse.json();
            return badRequest;
        }
        else
        {
            const badResponse:IAuthUserResponse500 = await loginResponse.json();
            throw new Error(badResponse.error);
        }
    };

}

