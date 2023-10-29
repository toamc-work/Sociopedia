import React from "react";
import { useNavigate } from 'react-router-dom'
import {Formik, FormikHelpers} from 'formik';

import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from '@mui/material';

import { AuthPageYup } from "./common/yup";
import { AuthPageTypes } from "./common/types";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { API } from "./common/api";

const loginSchema = AuthPageYup.LOGIN_FORM_SCHEMA;
const initialFormValues:AuthPageTypes.ILoginForm = {
    email: '',
    password: '',
};

const LoginForm:React.FunctionComponent<{setPageType:(page:'login' | 'register') => void}> = ({setPageType}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();

    async function handleSubmitForm(
        values:AuthPageTypes.ILoginForm, 
        onSubmitProps:FormikHelpers<AuthPageTypes.ILoginForm>
        ):Promise<void> {
            const auth = await API.authUser(values); 
            if('msg' in auth) {
                onSubmitProps.resetForm();
                if(auth.msg === 'Invalid Credentials') {
                    onSubmitProps.setErrors({ password:'Invalid Password' })
                }
                else
                {
                    onSubmitProps.setErrors({ email:'Invalid Email' })
                };
            }
            else {
                dispatch( setLogin({ user:auth.user, token:auth.token }) );
                navigate('/home');
            };
    }

    return (
        <Formik
            onSubmit={handleSubmitForm}
            initialValues={initialFormValues}
            validationSchema={loginSchema}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                errors,
                values,
                touched
            }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display={'grid'}
                            gap={"30px"}
                            gridTemplateColumns={'repeat(4, minmax(0, 1fr))'}
                            sx={{
                                '& > div': {
                                    gridColumn: isNonMobile ? 'span 4' : "span 4"
                                }
                            }}
                        >
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
                                    {'LOGIN'}
                                </Button>
                                <Typography
                                    onClick={() =>  {
                                        setPageType('register');
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
                                    {"Don't have an account? Sign Up here"}
                                </Typography>
                            </Box>
                        </Box>
                    </form>
                )
            }}
        </Formik>
    )
}

export default LoginForm