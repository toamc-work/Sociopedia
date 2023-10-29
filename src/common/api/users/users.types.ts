import { IStateAuth } from "../../../state";

export namespace UserServiceTypes {
    /*getUser*/
    export type IGetUserResponse200 = IStateAuth.IUser; 

    export interface IGetUserResponse404 {
        error:string
    }

    /*addRemoveFriend*/
    interface IUserFriendListItem {
        _id: string;
        firstName:string;
        lastName:string;
        email:string;
        location:string;
        occupations:string;
    };

    export type IAddRemoveFriendResponse200 = IUserFriendListItem[] 
    export interface IAddRemoveFriendResponse404 {
        msg?:'User was not found';
        error?: string;
    }
}

export interface IUserService {
    getUser:(userId:string, token:string) => Promise<UserServiceTypes.IGetUserResponse200>
    addRemoveFriend:(token:string, _id:string, friendId:string) => Promise<UserServiceTypes.IAddRemoveFriendResponse200>
}