import React, { useEffect, useState } from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import FriendListWidget from '../widgets/FriendListWidget';
import UserWidget from '../widgets/UserWidget';
import PostsWidget from '../widgets/PostsWidget';

import { Box, useMediaQuery} from '@mui/material'
import { IStateAuth } from '../../state';
import userService from '../../common/api/users/users.service';
import MyPostWidget from '../widgets/MyPostWidget';

const ProfilePage:React.FunctionComponent = () => {
    const [user, setUser] = useState<IStateAuth.IUser | null>(null);
    const { userId } = useParams();
    const token = useSelector((state: IStateAuth.IInitialState) => state.token ?? '');
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    useEffect(() => {
        async function makeRequest()
        {
            const user = await userService.getUser(userId ?? '', token);
            setUser(user);
        }
        makeRequest();
    })

    if(!user || !userId) return null;
    
    return (
        <Box>
            <Navbar/>
            <Box
                width={"100%"}
                p={"2rem 6%"}
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap={"2rem"}
                justifyContent={"center"}
            >
                <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath}/>
                    <Box m={'2rem 0'}/>
                    <FriendListWidget
                        userId={userId}
                    />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? '42%' : undefined}
                    mt={isNonMobileScreens ? undefined : '2rem'}
                >
                    <MyPostWidget picturePath={user.picturePath}/>
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    )
};

export default ProfilePage;