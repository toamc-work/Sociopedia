import React, { useState } from 'react';
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import RegisterForm from '../auth-page/RegisterForm';
import LoginForm from '../auth-page/LoginForm';

const AuthPage: React.FunctionComponent = () => {
    const [pageType, setPageType] = useState<'register' | 'login'>('login')
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

    return (
        <Box>
            <Box
                width={'100%'}
                p={'1rem 6%'}
                sx={{
                    backgroundColor: theme.palette.background.alt
                }}
            >
                <Typography
                    fontWeight={'bold'}
                    fontSize={'32px'}
                    color='primary'
                    textAlign={'center'}
                >
                    {'Sociopedia'}
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? '50%' : '93%'}
                p={"2rem"}
                m={"2rem auto"}
                borderRadius={"1rem"}
                sx={{
                    backgroundColor: theme.palette.background.alt
                }}
            >
                <Typography
                    fontWeight={500}
                    variant='h5'
                    sx={{
                        mb: '1.5rem'
                    }}
                >
                    Welcome to Sociopedia, the Social Media for Sociopaths
                </Typography>
                {pageType === 'login' ? <LoginForm setPageType={setPageType} /> : <RegisterForm setPageType={setPageType}/>}
            </Box>
        </Box>
    )


};

export default AuthPage;