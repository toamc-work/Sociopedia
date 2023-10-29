import React, { useMemo } from 'react';
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from 'react-router-dom';
import { IStateAuth } from '../state';

const Friend:React.FunctionComponent<{
    friendId:string, 
    name:string, 
    subtitle:string, 
    userPicturePath:string
}> = 
({
    friendId, 
    name, 
    subtitle, 
    userPicturePath
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state:IStateAuth.IInitialState) => state.user ?? {_id: ''});
    const token = useSelector((state:IStateAuth.IInitialState) => state.token ?? '');
    const friends = useSelector((state:IStateAuth.IInitialState) => state.friends);

    const theme = useTheme();
    const primaryLight= theme.palette.primary.light;
    const primaryDark= theme.palette.primary.dark;
    const main = theme.palette.neutral.main;
    const medium = theme.palette.neutral.medium

    const isFriend = useMemo(() => Boolean(friends.find((friend) => friend._id === friendId)), [friends]);

    async function handlePatchFriend(){

    }

    return (
        <FlexBetween
            gap={'1rem'}
        >
            <UserImage image={`/${userPicturePath}`} size='50px'/>
            <Box
                onClick={() => {
                    navigate(`/profile/${friendId}`)
                }}
            >
                <Typography
                    color={main}
                    variant='h5'
                    fontWeight={500}
                    sx={{
                        '&:hover': {
                            color: primaryLight,
                            cursor: 'pointer',
                        }
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
            <IconButton
             sx={{
                backgroundColor:primaryLight,
                p: '0.6rem',
             }}
            >
                {isFriend ? 
                (
                    <PersonRemoveOutlined 
                        sx={{
                            color: primaryDark
                        }}
                    />
                ):(
                    <PersonAddOutlined 
                        sx={{
                            color: primaryDark
                        }}
                    />
                )
            }
            </IconButton>
        </FlexBetween>
    )

}

export default Friend;