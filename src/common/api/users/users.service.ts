import { IUserService, UserServiceTypes } from "./users.types";

class UserService implements IUserService {
    private '@path':string;

    constructor(){
        this['@path'] = 'users/';
    }

    getUser = async (userId: string, token: string): Promise<UserServiceTypes.IGetUserResponse200> => {
        const url = process.env.REACT_APP_BACKEND_URL + this["@path"] + userId;
        const options = {
            method:'get',
            headers: {
                'Authorization': ['Bearer', token].join(' '),
            }
        };

        const userResponse:Response = await fetch(url, options);
        
        if(userResponse.status === 200) {
            const user:UserServiceTypes.IGetUserResponse200 = await userResponse.json();   
            return user;
        }
        else
        {
            const badResponse:UserServiceTypes.IGetUserResponse404 = await userResponse.json();
            throw new Error(badResponse.error);
        }

    };

    addRemoveFriend = async (token:string, _id:string, friendId:string):Promise<UserServiceTypes.IAddRemoveFriendResponse200> => {
        const url = process.env.REACT_APP_BACKEND_URL + this["@path"] + _id + '/' + friendId;
        const options = {
            method: 'patch',
            headers: {
                'Authorization': ['Bearer', token].join(' '),
                'content-type': 'application/json',
            },
        }

        const addRemoveFriendResponse = await fetch(url, options);

        if(addRemoveFriendResponse.status === 200) {
            const friends:UserServiceTypes.IAddRemoveFriendResponse200 = await addRemoveFriendResponse.json();
            return friends;
        }
        else {
            const NotFound: UserServiceTypes.IAddRemoveFriendResponse404 = await addRemoveFriendResponse.json();
            const errorMessage = NotFound.error ?? NotFound.msg ?? 'Failed At addRemoveFriend';
            throw new Error(errorMessage);
        }
    }
}

const userService = new UserService();

export default userService;