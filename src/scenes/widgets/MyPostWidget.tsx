import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import {
    EditOutlined,
    DeleteOutline,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from '@mui/icons-material'

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from '@mui/material'

import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import WidgetWrapper from '../../components/WidgetWrapper';

import { IStateAuth, setPosts } from '../../state';
import postService from '../../common/api/posts/posts.service';

const MyPostWidget:React.FunctionComponent<{picturePath:string}> = ({picturePath}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState<boolean>(false);
    const [image, setImage] = useState<null | File>(null);
    const [post, setPost] = useState<string>('')
    const theme = useTheme();
    const { _id } = useSelector((state:IStateAuth.IInitialState) => state.user ?? { _id: '' });
    const token  = useSelector((state:IStateAuth.IInitialState) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = theme.palette.neutral.mediumMain;
    const medium = theme.palette.neutral.medium;

    function resetState(){
        setPost('');
        setIsImage(false);
        setImage(null);
    }

    async function handleEventSavePost(_event:React.MouseEvent<HTMLButtonElement>) {
        const formData = new FormData();
        formData.append('userId', _id);
        formData.append('description', post)
        if(image)
        {
            formData.append('picture', image);
            formData.append('picturePath', picturePath);
        }
        
        const posts:IStateAuth.IPost[] = await postService.createPost(token ?? '', formData);
        dispatch(setPosts({posts:posts}));
        resetState();
    }

    return (
        <WidgetWrapper theme={theme}>
            <FlexBetween 
                gap={"1.5rem"}
            >
                <UserImage image={`/${picturePath}`}/>
                <InputBase 
                    placeholder="Wha's on you'r mind..."
                    onChange={(event) => setPost(event.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: theme.palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem"
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box 
                    borderRadius={'5px'}
                    border={`1px solid ${medium}`}
                    mt={'1rem'}
                    p={'1rem'}
                >
                    <Dropzone 
                        acceptedFields= '.jpg, .png, .jpeg'
                        multiple={false}
                        onDrop={(acceptedFields:File[]) => {
                            setImage(acceptedFields[0]);
                        }}
                    >
                        {({getRootProps, getInputProps}) => {
                        return (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${theme.palette.primary.main}`}
                                    width={'100%'}
                                    p={'1rem'}
                                    sx={{
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                    >
                                    <input {...getInputProps()} />
                                    {
                                        !image ? (
                                            <p>Add Picture Here</p>
                                        ): (
                                            <FlexBetween>
                                                <Typography>{image.name} </Typography>
                                                <EditOutlined/>
                                            </FlexBetween>
                                        )
                                    }
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{
                                            width:'15%'
                                        }}
                                    >
                                        <DeleteOutline/>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )
                        }} 
                    </Dropzone>

                </Box>
            )}
            <Divider sx={{m: "1.25rem 0"}}/>
            <FlexBetween>
                <FlexBetween
                    gap={'0.25rem'}
                    onClick={() => setIsImage(!isImage)}
                >
                    <ImageOutlined/>
                    <Typography
                        color={mediumMain}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                color: medium,
                            }
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween
                            gap={"0.25rem"}
                        >
                            <GifBoxOutlined sx={{color:mediumMain}}/>
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        
                        <FlexBetween
                            gap={"0.25rem"}
                        >
                            <AttachFileOutlined sx={{color:mediumMain}}/>
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween
                            gap={"0.25rem"}
                        >
                            <MicOutlined sx={{color:mediumMain}}/>
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>

                    </>
                ) : (
                    <FlexBetween>
                        <MoreHorizOutlined sx={{color:mediumMain}}/>
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    sx={{
                        color: theme.palette.background.alt,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '3rem',
                    }}
                    onClick={handleEventSavePost}
                >
                    Save
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )


}

export default MyPostWidget