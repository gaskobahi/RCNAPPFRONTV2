import React, { useEffect,useState } from 'react';
import {authProvider} from './AuthProvider'
import {
  Navigate,Outlet
  } from "react-router-dom";
import {DELAYREFRESHTOKEN, GLOBALTOKEN, URLLOGIN} from './services/HttpService';
import inMemoryJWT from './inMemoryJWT';
 

const ProtectedRoutes=(props:any)=>{
  useEffect(()=>{
    let interval=setInterval(()=>{
      let STOKEN:any=localStorage.getItem(GLOBALTOKEN)
      if(STOKEN){
        let JTOKEN:any=JSON.parse(STOKEN)
        inMemoryJWT.getRefreshedToken(JTOKEN.refreshToken)
      }
    },DELAYREFRESHTOKEN)
    return ()=>clearInterval(interval)
  },[])

let {checkAuth}=authProvider;
    const auth=checkAuth();
    return  auth? <Outlet/>:<Navigate to={URLLOGIN}/>

}



export default ProtectedRoutes;