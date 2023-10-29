import { AuthServiceTypes, IAuthService } from "./auth.types";

class AuthService implements IAuthService {
    private '@path':string;

    constructor(){
        this['@path'] = 'auth/';
    }

    public saveUser = async (formData:FormData):Promise<AuthServiceTypes.ISaveUserResponseStatus201> => {
        const url = process.env.REACT_APP_BACKEND_URL + this["@path"] + 'register';
        console.log(url)
        const options = 
        {
            method:'post',
            body:formData,
        }

        const saveUserResponse:Response = await fetch(url, options);
        console.log({saveUserResponse})

        if(saveUserResponse.status === 201) {
            const savedUser:AuthServiceTypes.ISaveUserResponseStatus201 = await saveUserResponse.json();
            return savedUser; 
        }
        else
        {
            const badResponse:AuthServiceTypes.ISaveUserResponseStatus500 = await saveUserResponse.json();
            console.log(badResponse);
            throw new Error(badResponse.error);
        };
    };

    public authUser = async (credentials: AuthServiceTypes.IAuthUserCredentials): Promise<AuthServiceTypes.IAuthUserResponse200 | AuthServiceTypes.IAuthUserResponse400> => {
        const url = process.env.REACT_APP_BACKEND_URL + this["@path"] + 'login';
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
            const loggedIn:AuthServiceTypes.IAuthUserResponse200 = await loginResponse.json(); 
            return loggedIn
            
        }
        else if(loginResponse.status === 400) {
            const badRequest:AuthServiceTypes.IAuthUserResponse400 = await loginResponse.json();
            return badRequest;
        }
        else
        {
            const badResponse:AuthServiceTypes.IAuthUserResponse500 = await loginResponse.json();
            throw new Error(badResponse.error);
        }
    }
}
const authService = new AuthService();
export default authService;


