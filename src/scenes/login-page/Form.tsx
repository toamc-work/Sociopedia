import React, { useMemo, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from '@mui/material'

import { EditOutlined } from '@mui/icons-material';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import Dropzone, { DropzoneOptions, FileWithPath, Accept } from 'react-dropzone';

import FlexBetween from '../../components/FlexBetween';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
    location:yup.string().required("required"),
    occupations:yup.string().required("required"),
    picture:yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
});

type DynamicObj = {[key:string]:string | File }
const initialValuesRegister:DynamicObj & {picture:string | {name:string}} = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupations: "",
    picture: ''
};

const initialValuesLogin:DynamicObj = {
    email: "",
    password: "",
};

const Form:React.FunctionComponent = (props) => {
    const [pageType, setPageType] = useState<'login' | 'register'>('register');
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("min-width:600px");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values:DynamicObj, onSubmitProps: FormikHelpers<DynamicObj>) => {
        const formData = new FormData();
        for(let value in values)
        for (let key in values) {
            if (values.hasOwnProperty(key)) {
                const value: string| Blob = values[key as keyof typeof values];
                formData.append(key, value);
            }
        }

        formData.append('picturePath', typeof values.picture != "string" ? values.picture.name : '');

        const saveUserResponse = await fetch(process.env.REACT_APP_BACKEND_URL ?? '', {method:'POST', body:formData});
        const savedUser = await saveUserResponse.json();
        onSubmitProps.resetForm();

        if(savedUser) {
            setPageType('login');
        };
    }

    const login = async (values:DynamicObj, onSubmitProps:FormikHelpers<DynamicObj>) => {
        const loggedInResponse = await fetch(process.env.REACT_APP_BACKEND_URL ?? '', {
            method:'POST', 
            headers: {'content-type': "application/json", 'accept': 'application/json'}, 
            body:JSON.stringify(values), 
        })

        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if(loggedIn) {
            dispatch(setLogin({
                user:loggedIn.user,
                token:loggedIn.token
            }));

            navigate('/home')
        };

    }

    const handleFormSubmit = async (values:DynamicObj, onSubmitProps: FormikHelpers<DynamicObj>) => {
        if(isLogin) await login(values, onSubmitProps)
        if(isRegister) await register(values, onSubmitProps)
    };

    
    
    const acceptedFileTypes: Accept = {
        '.jpg': ['image/jpeg'],
        '.png': ['image/png'],
        '.gif': ['image/gif'],
        '.svg': ['image/svg+xml'],
        '.pdf': ['application/pdf'],
        // Add more file types if needed
      };
      
    const memoInitialValues = React.useCallback(() => isRegister  ? initialValuesRegister : initialValuesLogin, [pageType]);
    console.log(memoInitialValues);
    
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={memoInitialValues()}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display={'grid'}
                        gap={"30px"}
                        gridTemplateColumns={'repeat(4, minmax(0, 1fr))'}
                        sx={{
                            '& > div': {
                                gridColumn: isNonMobile ? undefined : "span 4"
                            }
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label='First Name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name='firstName'
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                <TextField
                                    label='Last Name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name='lastName'
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                <TextField
                                    label='Location'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name='location'
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                                <TextField
                                    label='Occupation'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupations}
                                    name='occupations'
                                    error={Boolean(touched.occupations) && Boolean(errors.occupations)}
                                    helperText={touched.occupations && errors.occupations}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                                <Box
                                    gridColumn={'span 4'}
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius={'5px'}
                                    p={'1rem'}
                                >
                                    <Dropzone 
                                    accept={acceptedFileTypes}
                                    multiple={false}
                                    onDrop={(acceptedFields) => {
                                        setFieldValue('picture', acceptedFields[0]);
                                    }}
                                    >
                                       {({getRootProps, getInputProps}) => {
                                        console.log(values)
                                        return (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p={'1rem'}
                                                sx={{
                                                    '&:hover': {
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                                >
                                                <input {...getInputProps()} />
                                                {
                                                    !values.picture ? (
                                                        <p>Add Picture Here</p>
                                                    ): (
                                                        <FlexBetween>
                                                            <Typography>{typeof values.picture === 'string' ? values.picture : values.picture?.name}</Typography>
                                                        </FlexBetween>
                                                    )
                                                }
                                            </Box>
                                        )
                                       }} 
                                    </Dropzone>

                                </Box>
                            </>
                        )}

                        <TextField
                            label='Email'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name='email'
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{
                                gridColumn: "span 4"
                            }}
                        />

                        <TextField
                            label='Password'
                            type='password'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name='password'
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{
                                gridColumn: "span 4"
                            }}
                        />
                    </Box>
                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type='submit'
                            sx={{
                                m: '2rem 0',
                                p: '1rem',
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                '&:hover': {
                                    color: palette.primary.main
                                }
                            }}
                        >
                            {isLogin? 'LOGIN' : 'REGISTER'}
                        </Button>
                        <Typography
                            onClick={() =>  {
                                setPageType(isLogin ? "register" : 'login')
                                resetForm();
                            }}
                            sx={{
                                textDecoration: 'underline',
                                color: palette.primary.main,
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: palette.primary.light
                                }
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign Up here": "Already have an account? Login here"}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )

};



export default Form;