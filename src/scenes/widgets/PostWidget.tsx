import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

import {
    ChatBubbleOutline,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';

import {
    Box,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';

import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";

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
    return <></>
}

export default PostWidget;