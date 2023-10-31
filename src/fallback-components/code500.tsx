import { Box, Typography } from '@mui/material';
export const Code500 = ({ error }: { error: Error }) => (
    <Box 
        minHeight={"100vh"} 
        width={"100%"} 
        height={"auto"}
        sx={{
            backgroundImage:`url(${process.env.REACT_APP_BACKEND_URL_ASSETS}/hero-1.jpg)`,
            backgroundPosition:'center',
            backgroundSize:'50% auto',
            backgroundRepeat:'no-repeat',
            backgroundColor:'white'
        }} 

    />
)