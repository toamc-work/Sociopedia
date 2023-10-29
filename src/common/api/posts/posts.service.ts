import { PostServiceTypes, IPostService } from "./posts.types";

class PostService implements IPostService {
    private '@path':string;
    private '@baseUrl':string;
    constructor(){
        this['@path'] = 'posts/';
        this['@baseUrl'] = process.env.REACT_APP_BACKEND_URL ?? '';
    }

    createPost = async (token: string, formData: FormData):Promise<PostServiceTypes.ICreatePostResponse201> => {
        const url = this["@baseUrl"] + this["@path"];
        const options = {
            method:'post',
            headers: {
                'Authorization': ['Bearer', token].join(' '),
            },
            body:formData
        };

        const savePostResponse = await fetch(url, options);
        
        if(savePostResponse.status === 201) {
            const posts:PostServiceTypes.ICreatePostResponse201 = await savePostResponse.json();
            return posts;
        }
        else if(savePostResponse.status === 404) {
            const NotFound:PostServiceTypes.ICreatePostResponse404 = await savePostResponse.json();
            throw new Error(NotFound.msg);
        }
        else
        {
            const ResourceConflict:PostServiceTypes.ICreatePostResponse409 = await savePostResponse.json();  
            throw new Error(ResourceConflict.error);
        };
    };

    getFeedPosts = async (token: string):Promise<PostServiceTypes.IGetFeedPostsResponse200> => {
        const url = this["@baseUrl"] + this["@path"]
        const options = {
            method: 'get',
            headers :{
                'Authorization': ['Bearer', token].join(' '),
            },
        };

        const postsResponse = await fetch(url, options);

        if(postsResponse.status === 200) {
            const posts:PostServiceTypes.IGetFeedPostsResponse200 = await postsResponse.json();
            return posts;
        }
        else
        {
            const NotFound:PostServiceTypes.IGetFeedPostsResponse404 = await postsResponse.json();
            throw new Error(NotFound.error);
        };
    };
    
    getUserPosts = async (token: string, userId: string):Promise<PostServiceTypes.IGetUserPostsResponse200> => {
        const url = this["@baseUrl"] + userId + '/' + this["@path"];
        const options = {
            method: 'get',
            headers :{
                'Authorization': ['Bearer', token].join(' '),
            },
        };

        const postsResponse = await fetch(url, options);

        if(postsResponse.status === 200) {
            const posts:PostServiceTypes.IGetUserPostsResponse200 = await postsResponse.json();
            return posts;
        }
        else
        {
            const NotFound:PostServiceTypes.IGetUserPostsResponse404 = await postsResponse.json();
            throw new Error(NotFound.error);
        };
    };

    patchLike = async (authorizedUserId:string, token: string, postId: string): Promise<PostServiceTypes.IPatchLikeResponse200> => {
        const url = this["@baseUrl"] + this["@path"] + postId + '/like'
        const options = {
            method:'PATCH',
            headers: {
                'Authorization': ['Bearer', token].join(' '),
                'content-type': 'application/json',    
            },
            body:JSON.stringify({userId:authorizedUserId}),
        };

        const updatePostResponse = await fetch(url, options);

        if(updatePostResponse.status === 200) {
            const updatedPost:PostServiceTypes.IPatchLikeResponse200 = await updatePostResponse.json();
            return updatedPost;
        }
        else
        {
            const NotFound:PostServiceTypes.IPatchLikeResponse404 = await updatePostResponse.json();
            const errorMessage:string = NotFound.msg ?? NotFound.error ?? '';
            throw new Error(errorMessage);
        };
    };

   
}
const postService = new PostService();
export default postService;


