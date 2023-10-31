import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateAuth, setPost } from "../../state";

import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';

import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';

import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import postService from "../../common/api/posts/posts.service";
import WidgetWrapper from "../../components/WidgetWrapper";

export interface PostWidgetProps {
    _id:string;
    userId:string;
    name:string;
    description:string;
    location:string;
    picturePath:string;
    userPicturePath:string;
    likes:{[key:string]:boolean};
    comments:string[];
}

const PostWidget:React.FunctionComponent<PostWidgetProps> = 
({
    _id,
    userId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState<boolean>(false);
    const dispatch = useDispatch();
    const token = useSelector((state:IStateAuth.IInitialState) => state.token ?? '');
    const authorizedUserId = useSelector((state:IStateAuth.IInitialState) => state.user?._id ?? '');
    const isLiked = React.useMemo(() => Boolean(likes[authorizedUserId]), [authorizedUserId, token, likes])
    const likeCount = React.useMemo(() => Object.keys(likes).length, [authorizedUserId, token, likes])
    const theme = useTheme();
    console.log({comments})
    const main = theme.palette.neutral.main;
    const primary = theme.palette.primary.main;
    
    async function handleUpdatePostLikeEvent(_event:React.MouseEvent<HTMLButtonElement>):Promise<void>
    {
        try
        {
            const updatedPost = await postService.patchLike(authorizedUserId, token, _id);
            dispatch(setPost({post:updatedPost}));                
        }
        catch(error)
        {
            console.log(error);
            
            // throw error
        }
    };    
    
    return (
        <WidgetWrapper theme={theme}>
            <Friend
                friendId={userId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography
                color={main}
                sx={{
                    mt:'1rem'
                }}
            >
                {description}
            </Typography>
            {picturePath && (
                <img
                    width='100%'
                    height='auto'
                    alt="post"
                    style={{
                        borderRadius: '0.75rem',
                        marginTop:'0.75rem'
                    }}
                    src={process.env.REACT_APP_BACKEND_URL_ASSETS + '/' + picturePath}
                />
            )}
            <FlexBetween
                mt={'0.25rem'}
            >
                    <FlexBetween
                        gap={'1rem'}
                    >
                        <FlexBetween
                            gap={'0.3rem'}
                        >
                            <IconButton
                                onClick={handleUpdatePostLikeEvent}
                            >
                                {isLiked ? (
                                            <FavoriteOutlined
                                                sx={{
                                                    color:primary
                                                }}
                                            />
                                        ) : (
                                            <FavoriteBorderOutlined/>
                                        )}
                            </IconButton>
                        <Typography>{likeCount}</Typography>
                        </FlexBetween>
                        <FlexBetween
                            gap={'0.3rem'}
                        >
                            <IconButton
                                onClick={() => setIsComments((prevState) => !prevState)}
                            >
                                <ChatBubbleOutlineOutlined/>
                            </IconButton>
                            <Typography>{comments?.length}</Typography>
                        </FlexBetween>
                    </FlexBetween>
                    <IconButton>
                        <ShareOutlined/>
                    </IconButton>
            </FlexBetween>
            {isComments && (
                <Box
                    mt={'0.5rem'}
                >
                    {comments.map((comment:string, i:number) => {
                        return (
                            <Box
                                key={`${name}-${i}`}
                            >
                                <Divider/>
                                <Typography
                                    sx={{
                                        color:main,
                                        m:'0.5rem 0',
                                        pl: '1rem',
                                    }}
                                >
                                    {comment}
                                </Typography>
                            </Box>
                        )
                    })}
                    <Divider/>
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget;