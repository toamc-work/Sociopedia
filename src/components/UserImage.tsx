import React from 'react';
import { Box } from '@mui/material';

const UserImage:React.FunctionComponent<{image:string, size?:string}> = ({image, size="60px"}) => {

    return (
        <Box
            width={size} height={size}
        >
            <img 
                style={{
                    objectFit:'cover',
                    borderRadius: '50%',
                    maxWidth:size,
                    maxHeight:size
                }}
                src={process.env.REACT_APP_BACKEND_URL_ASSETS + image} alt="user" />
        </Box>
    )
}

export default UserImage;