import React, { useEffect,useState } from 'react';
import jwt_decode from "jwt-decode";
import {authProvider} from './AuthProvider'
import {
  Navigate,Outlet
  } from "react-router-dom";
 
const DASHBOARD="/";
//const URLLOGIN="/login";
const PublicRoutes=(props:any)=>{
  let {checkAuth}=authProvider;
    const auth=checkAuth();
    //console.log(auth)
    return  auth?<Navigate to={DASHBOARD}/>: <Outlet/>
}
export default PublicRoutes;