import { IStateAuth } from "../../../state"

export namespace PostServiceTypes {
    /*createPost*/
    export type ICreatePostResponse201 = IStateAuth.IPost[];

    export interface ICreatePostResponse404 {
        msg: 'User was not found';
    };

    export interface ICreatePostResponse409 {
        error:string;
    }
    /*getUserPosts*/
    export type IGetUserPostsResponse200 = IStateAuth.IPost[]

    export interface IGetUserPostsResponse404 {
        error:string;
    }
    /*getFeedPosts*/
    export type IGetFeedPostsResponse200 = IStateAuth.IPost[]

    export interface IGetFeedPostsResponse404 {
        error:string;
    }
}

export interface IPostService {
    createPost: (token:string, formData:FormData) => Promise<PostServiceTypes.ICreatePostResponse201>
    getUserPosts: (token:string, userId:string) => Promise<PostServiceTypes.IGetUserPostsResponse200>
    getFeedPosts: (token:string) => Promise<PostServiceTypes.IGetFeedPostsResponse200>
}


