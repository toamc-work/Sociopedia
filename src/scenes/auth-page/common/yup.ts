import * as yup from 'yup';
import { AuthPageTypes } from './types';
export namespace AuthPageYup {

    export const REGISTER_FORM_SCHEMA:yup.Schema<AuthPageTypes.IRegisterSchema> = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName:yup.string().required("required"),
        email:yup.string().email("invalid email").required("required"),
        password:yup.string().required("required"),
        location:yup.string().required("required"),
        occupations:yup.string().required("required"),
        picture:yup.string().required("required"),
    });  

    export const LOGIN_FORM_SCHEMA: yup.Schema<AuthPageTypes.ILoginSchema> = yup.object().shape({
            email:yup.string().email("invalid email").required("required"),
            password:yup.string().required("required"),
    });
}