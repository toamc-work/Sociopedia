import React from 'react';
import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { IStateAuth } from './state';
import { useSelector } from 'react-redux';

export const ProtectRoute:React.FunctionComponent<RouteProps> = (props) => {
    const isAuth:boolean = Boolean(useSelector((state:IStateAuth.IInitialState) => state.token));
    console.log({isAuth})
    return isAuth ? <Routes><Route {...props} path='' /></Routes> : <Navigate to={'/'}/>

}
