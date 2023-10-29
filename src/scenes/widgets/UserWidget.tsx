import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Twitter,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme } from "@mui/material";  
import UserImage from '../../components/UserImage';
import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useSelector } from 'react-redux'; 
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IStateAuth } from '../../state';
import userService from '../../common/api/users/users.service';
// import twitterImageSrc from 
const UserWidget:React.FunctionComponent<{userId:string, picturePath:string}> = 
({
    userId, picturePath
}) => {

    const [user, setUser] = useState<IStateAuth.IUser | null>(null);
    const theme = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state:IStateAuth.IInitialState) => state.token);
    const dark = theme.palette.neutral.dark;
    const medium = theme.palette.neutral.medium;
    const main = theme.palette.neutral.main;

    const memoApiCallGetUser = useCallback(() => userService.getUser(userId, token ?? '') , [userId, token]);

    useEffect(() => {
        async function apiRequest() {
            const user = await memoApiCallGetUser();
            setUser(user);
        }
        apiRequest();
    },[memoApiCallGetUser]);

    if(!user) return null;

    const {
        firstName,
        lastName,
        location,
        occupations,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper theme={theme}>
            <FlexBetween
                gap={"0.5rem"}
                pb={"1.1rem"}
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween
                    gap={"1rem"}
                >
                    <UserImage image={`/${picturePath}`} />
                    <Box>
                        <Typography
                            variant='h4'
                            color={dark}
                            fontWeight={500}
                            sx={{
                                '&:hover': {
                                    color:theme.palette.primary.light,
                                    cursor:'pointer',
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography
                            color={medium}
                        >
                            friends {friends.length}
                        </Typography>
                    </Box>    
                </FlexBetween>
                <ManageAccountsOutlined/>
            </FlexBetween>
            <Divider/>
            <Box
                p={"1rem 0"}
            >
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={"1rem"}
                    mb={"0.5rem"}
                >
                    <LocationOnOutlined/>
                    <Typography
                        color={medium}
                    >
                        {location}
                    </Typography>
                </Box>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={"1rem"}
                    mb={"0.5rem"}
                >
                    <WorkOutlineOutlined/>
                    <Typography
                        color={medium}
                    >
                        {occupations}
                    </Typography>
                </Box>
            </Box>

            <Divider/>

            <Box
                p={"1rem 0"}
            >
                <FlexBetween
                    mb={"0.5rem"}
                >
                    <Typography
                        color={medium}
                    >
                        Who's viewed your profile
                    </Typography>
                    <Typography
                        color={main}
                        fontWeight={500}
                    >
                        {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography
                        color={medium}
                    >
                        Impressions of your post
                    </Typography>
                    <Typography
                        color={main}
                        fontWeight={500}
                    >
                        {impressions}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider/>

            <Box
                p={"1rem 0"}
            >
                <Typography
                    fontSize={"1rem"}
                    fontWeight={500}
                    color={main}
                    mb={"1rem"}
                >
                    Social Profiles
                </Typography>

                <FlexBetween
                    gap={"1rem"}
                    mb={"0.5rem"}
                >
                    <FlexBetween
                        gap={"1rem"}
                    >
                        <img src={process.env.REACT_APP_BACKEND_URL_ASSETS + '/twitter.png'} alt="twitter" />
                        <Box>
                            <Typography
                                color={main}
                                fontWeight={500}
                            >
                                Twitter
                            </Typography>
                            <Typography
                                color={medium}
                            >
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color:main}}/>
                </FlexBetween>

                <FlexBetween
                    gap={"1rem"}
                    mb={"0.5rem"}
                >

                    <FlexBetween
                        gap={"1rem"}
                    >
                        <img src={process.env.REACT_APP_BACKEND_URL_ASSETS + '/linkedin.png'} alt="linkedin" />
                        <Box>
                            <Typography
                                color={main}
                                fontWeight={500}
                            >
                                Linkedin
                            </Typography>
                            <Typography
                                color={medium}
                            >
                                Network Platform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color:main}}/>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    ) 
}

export default UserWidget