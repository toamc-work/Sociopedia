import React, { useMemo, useState } from 'react';
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from 'react-router-dom';
import { IStateAuth, setFriends } from '../state';
import userService from '../common/api/users/users.service';
import { useHttpRequest } from '../common/hooks/useHttpRequest';
import { UserServiceTypes } from '../common/api/users/users.types';

const Friend: React.FunctionComponent<{
    friendId: string,
    name: string,
    subtitle: string,
    userPicturePath: string
}> =
    ({
        friendId,
        name,
        subtitle,
        userPicturePath
    }) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { _id } = useSelector((state: IStateAuth.IInitialState) => state.user ?? { _id: '' });
        const token = useSelector((state: IStateAuth.IInitialState) => state.token ?? '');
        const friends = useSelector((state: IStateAuth.IInitialState) => state.user?.friends ?? []);
        const theme = useTheme();
        const primaryLight = theme.palette.primary.light;
        const primaryDark = theme.palette.primary.dark;
        const main = theme.palette.neutral.main;
        const medium = theme.palette.neutral.medium

        function apiCallPatchLikeStateSetter(friends:UserServiceTypes.IAddRemoveFriendResponse200) {
            dispatch(setFriends({ friends: friends }))
        }
        const [
            apiCallPatchFriendState, 
            wrapApiCallPatchFriend
        ] = useHttpRequest<UserServiceTypes.IAddRemoveFriendResponse200>(apiCallPatchLikeStateSetter); 

        const isFriend = useMemo(() => friends.some((friend) => friend._id === friendId), [friends]);

        async function handlePatchFriend() {
            const callbackAPI = ():Promise<UserServiceTypes.IAddRemoveFriendResponse200> => {
                return userService.addRemoveFriend(token, _id, friendId);
            };
            wrapApiCallPatchFriend(callbackAPI)    

         
        }

        if(apiCallPatchFriendState.error)
        {
            throw new Error("Failed Api Request")
        }

        return (
            <FlexBetween
                gap={'1rem'}
            >
                <UserImage image={`/${userPicturePath}`} size='50px' />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`)
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: theme.palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        color={medium}
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
                    disabled={apiCallPatchFriendState.loading}
                    onClick={handlePatchFriend}
                    sx={{
                        backgroundColor: primaryLight,
                        p: '0.6rem',
                    }}
                >
                    {apiCallPatchFriendState.loading && (
                        <CircularProgress 
                            size={'1rem'}
                            color='primary'
                            sx={{
                                color:primaryDark
                            }}
                        />
                    )}
                    {isFriend ?
                        (
                            <PersonRemoveOutlined
                                sx={{
                                    color: primaryDark
                                }}
                            />
                        ) : (
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