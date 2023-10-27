import React, { useMemo, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from '@mui/material'

import { EditOutlined } from '@mui/icons-material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import Dropzone from 'react-dropzone';

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

type DynamicObj = {[key:string]:string}

const initialValuesRegister:DynamicObj = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupations: "",
    picture: "",
};

const initialValuesLogin:DynamicObj = {
    email: "",
    password: "",
};

const Form:React.FunctionComponent = (props) => {
    const [pageType, setPageType] = useState<'login' | 'register'>('login');
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("min-width:600px");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const handleFormSubmit = async () => {

    };

    
    const memoState = useMemo(() => isRegister  ? initialValuesRegister : initialValuesLogin, [pageType])


    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={memoState}
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
                            </>
                        )}
                    </Box>
                </form>
            )}
        </Formik>
    )

};



export default Form;