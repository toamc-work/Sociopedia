import { IUserService, UserServiceTypes } from "./users.types";

class UserService implements IUserService {
    private '@path':string;
    private '@baseUrl':string;

    constructor(){
        this['@path'] = 'users/';
        this['@baseUrl'] = process.env.REACT_APP_BACKEND_URL ?? '';
    }

    getUser = async (userId: string, token: string): Promise<UserServiceTypes.IGetUserResponse200> => {
        const url = this["@baseUrl"] + this["@path"] + userId;
        const options = {
            method:'GET',
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
        const url = this["@baseUrl"] + this["@path"] + _id + '/' + friendId;
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
    };

    getUserFriends = async(userId: string, token: string): Promise<UserServiceTypes.IGetUserFriendsResponse200> => {
        const url = this["@baseUrl"] + this["@path"] + `/${userId}/friends`;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': ['Bearer', token].join(' '),
            },
        }

        const friendsResponse:Response = await fetch(url, options);

        if(friendsResponse.status === 200)
        {
            const friends:UserServiceTypes.IGetUserFriendsResponse200 = await friendsResponse.json();
            return friends
        }
        else if(friendsResponse.status === 400)
        {
            const badRequest:UserServiceTypes.IGetUserFriendsResponse400 = await friendsResponse.json();
            throw new Error(badRequest.msg);
        }
        else
        {
            const serverError:UserServiceTypes.IGetUserFriendsResponse500 = await friendsResponse.json();
            throw new Error(serverError.error);
        };
    };
}

const userService = new UserService();

export default userService;