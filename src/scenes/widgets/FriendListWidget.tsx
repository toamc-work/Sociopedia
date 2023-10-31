import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Typography,
    useTheme,
} from '@mui/material'

import WidgetWrapper from '../../components/WidgetWrapper';
import { IStateAuth, setFriends } from '../../state';
import userService from '../../common/api/users/users.service';
import Friend from '../../components/Friend';

const FriendListWidget:React.FunctionComponent<{userId:string}> = ({userId}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const token = useSelector((state:IStateAuth.IInitialState) => state.token ?? '');
    const friends = useSelector((state:IStateAuth.IInitialState) => state.user?.friends ?? []);
    useEffect(() => {
        async function makeRequest() {
            const friends = await userService.getUserFriends(userId, token);
             dispatch(setFriends({friends:friends}));
        }
        makeRequest();
    }, []);

    return (
        <WidgetWrapper theme={theme}>
            <Typography
                color={theme.palette.neutral.dark}
                fontWeight={500}
                variant='h5'
                sx={{
                    mb:'1.5rem'
                }}
            >
                Friend List
            </Typography>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={'1.5rem'}
            >
                {friends.map(({_id, firstName, lastName, occupations, picturePath}) => {
                    return (
                        <Friend
                            key={_id}
                            friendId={_id}
                            name={`${firstName} ${lastName}`}
                            subtitle={occupations}
                            userPicturePath={picturePath}
                        />
                    )
                })}
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget;