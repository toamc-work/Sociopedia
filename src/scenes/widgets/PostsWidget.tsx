import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateAuth, setPost, setPosts } from "../../state";
import PostWidget from './PostWidget';
import postService from "../../common/api/posts/posts.service";


const PostsWidget:React.FunctionComponent<{userId:string, isProfile:boolean}> = ({userId, isProfile = false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state:IStateAuth.IInitialState) => state.posts)
    const token = useSelector((state:IStateAuth.IInitialState) => state.token)


    useEffect(() => {
        async function callAPIAndUpdatePostsState(postsApiCall: () => Promise<IStateAuth.IPost[]>):Promise<void> {
            const posts = await postsApiCall();
            dispatch(setPosts({posts:posts}));
        }

        if(isProfile) {
            callAPIAndUpdatePostsState(() => postService.getUserPosts(token ?? '', userId));
        }
        else
        {
            callAPIAndUpdatePostsState(() => postService.getFeedPosts(token ?? ''));
        }
    }, [])

    return (
        <>
            {posts.map(({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
            }) => (
                <PostWidget
                key={_id}
                _id={_id}
                userId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                />
            ))}
        </>
    )

}