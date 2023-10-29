import React from "react";

import {Formik, FormikHelpers} from 'formik';
import Dropzone from 'react-dropzone';

import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from '@mui/material';

import FlexBetween from "../../components/FlexBetween";
import { AuthPageYup } from "./common/yup";
import { AuthPageTypes } from "./common/types";
import { EditOutlined } from "@mui/icons-material";
import authService from "../../common/api/auth/auth.service";


const registerSchema = AuthPageYup.REGISTER_FORM_SCHEMA;
const initialFormValues:AuthPageTypes.IRegisterForm = {
    firstName:'',
    lastName: '',
    email: '',
    location: '',
    occupations: '',
    password: '',
    picture: null,
}

const RegisterForm:React.FunctionComponent<{setPageType: (page:'login' | 'register') => void }> = 
({
    setPageType
}) => {
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");


    async function onSubmitForm(
        values:AuthPageTypes.IRegisterForm, 
        onSubmitProps:FormikHelpers<AuthPageTypes.IRegisterForm>
        ): Promise<void> {

            const formData = new FormData();

            for(let key in values)
            {
                formData.append(key, values[key as keyof typeof values] ?? '');
            };

        
            formData.append('picturePath', values.picture ? values.picture.name : '')
        

            const savedUser = await authService.saveUser(formData);
            if(savedUser)
            {
                setPageType('login');
            }
            else
            {
                onSubmitProps.resetForm();
            };
    };
    

    return (
        <Formik
            onSubmit={onSubmitForm}
            initialValues={initialFormValues}
            validationSchema={registerSchema}   
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                setFieldValue,
                values,
                touched,
                errors,
            }) => {
                return (
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
                                accept={{
                                    'image/jpeg': ['.jpeg', '.png', '.jpg']
                                }}
                                multiple={false}
                                onDrop={(acceptedFields) => {
                                    setFieldValue('picture', acceptedFields[0]);
                                }}
                                >
                                    {({getRootProps, getInputProps}) => {
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
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlined/>
                                                    </FlexBetween>
                                                )
                                            }
                                        </Box>
                                    )
                                    }} 
                                </Dropzone>

                            </Box>                        
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
                            {'REGISTER'}
                        </Button>
                        <Typography
                            onClick={() =>  {
                                setPageType('login')
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
                            {"Already have an account? Login here"}
                        </Typography>
                    </Box>
                    </form>
                )
            }}
        </Formik>
    )
}

export default RegisterForm;