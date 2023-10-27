import {
    Box, 
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material'

const LoginPage:React.FunctionComponent = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("min-width: 1000px");

    return (
            <Box>
                <Box
                width={'100%'}
                p={'1rem 6%'}
                sx={{
                    backgroundColor:theme.palette.background.alt
                }}
            >
                <Typography
                fontWeight={'bold'}
                fontSize={'32px'}
                color='primary'
                >
                    {'Sociopedia'}
                </Typography>
            </Box>
            <Box
                p={"2rem"}
                m={"2rem auto"}
                borderRadius={"1.rem"}
                sx={{
                    backgroundColor:theme.palette.background.alt
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
            </Box>
        </Box>
    )
    

};

export default LoginPage;