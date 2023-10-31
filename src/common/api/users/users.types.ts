import { IStateAuth } from "../../../state";

export namespace UserServiceTypes {
    /*getUser*/
    export type IGetUserResponse200 = IStateAuth.IUser; 

    export interface IGetUserResponse404 {
        error:string
    }

    /*addRemoveFriend*/
    // type IUserFriendListItem = Pick<IStateAuth.IFriend, '_id' |  'firstName' | 'lastName' | 'occupations' | 'picturePath'>;
    export type IAddRemoveFriendResponse200 = IStateAuth.IFriend[]
    export interface IAddRemoveFriendResponse404 {
        msg?:'User was not found';
        error?: string;
    }

    export type IGetUserFriendsResponse200 = IStateAuth.IFriend[];

    export interface IGetUserFriendsResponse400 {
        msg:'User was not found';
    };

    export interface IGetUserFriendsResponse500 {
        error:'string';
    };

    
}

export interface IUserService {
    getUser:(userId:string, token:string) => Promise<UserServiceTypes.IGetUserResponse200>
    addRemoveFriend:(token:string, _id:string, friendId:string) => Promise<UserServiceTypes.IAddRemoveFriendResponse200>
    getUserFriends:(userId:string, token:string) => Promise<UserServiceTypes.IGetUserFriendsResponse200>
}