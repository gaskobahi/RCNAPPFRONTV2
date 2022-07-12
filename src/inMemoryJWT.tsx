// inMemoryJwt.js
import { promises } from 'form-data';
import decodeJwt from 'jwt-decode';
import { C5_RefreshToken } from './services/Auth/AuthService';
import { TYPERROR_FAILEDTOFETCH } from './services/httpErrorMessage';
import {GLOBALTOKEN} from './services/HttpService';
//import {useRedirect} from 'react-admin';

const inMemoryJWTManager = () => {
    let inMemoryJWT:any= null;
    let refreshTokenJWT:any = null;
    let logoutEventName:any = 'ra-logout';
    let refreshEndpoint:any = '';
    let refreshTimeOutId:any;
    let isRefreshing:any = null;
    let  AuthUser:any=null;

    //2.1 This listener allows to disconnect another session of react-admin started in another tab
    //Gestion de onglets ouvert apres la deconnexion
    window.addEventListener('storage', (event) => {
        if (event.key ===logoutEventName) {
            inMemoryJWT = null;
        }
    });


    //2.2
    const setRefreshTokenEndpoint = (endpoint:any)=>{
         refreshEndpoint = endpoint;
    }
    const setLastRecordRefreshTokenJWT = (lastrefreshtoken:any)=> {
        refreshTokenJWT=lastrefreshtoken;
    }

    //2.3- This countdown feature is used to renew the JWT in a way that is transparent to the user.
    // before it's no longer valid
    const refreshToken = (delay:any) => {
        refreshTimeOutId = window.setTimeout(
            getRefreshedToken,
            delay * 1000 - 5000
        ); // Validity period of the token in seconds, minus 5 seconds
    };

    const abordRefreshToken = () => {
        if (refreshTimeOutId) {
            window.clearTimeout(refreshTimeOutId);
        }
    };
    
    const waitForTokenRefresh = async () => {
        if (!isRefreshing) {
            return false;
        }
        return  isRefreshing.then(() => {
            isRefreshing = null;
            return true
        });
        
    }

    const RedirectToLoginPage=()=>{
       // const redirect = useRedirect();
      //  return redirect('/login');
    }

    
    // The method makes a call to the refresh-token endpoint
    // If there is a valid cookie, the endpoint will return a fresh jwt.
    const  getRefreshedToken =  (refreshTokenJWT:any) => {
       isRefreshing= C5_RefreshToken(refreshTokenJWT)
                    .then((res)=>{
                        console.log("DIEU11")
                        console.log(res)
                    if(res!=TYPERROR_FAILEDTOFETCH){
                        localStorage.setItem(GLOBALTOKEN,JSON.stringify(res))
                        return true;
                    }
                      ereaseToken()
                        //return false
                    
                    return res
                     }).catch((error)=>{
                        console.log(  'Failed to renew the jwt from the refresh token.');
                         return false
                    })
        return isRefreshing
    }

    const getToken = () =>{
           console.log("moibories")
           console.log(inMemoryJWT)

            return inMemoryJWT
    } 


    const getAuthUser = () => AuthUser;

    const setAuthUser = (token:any)=>{
        AuthUser=decodeJwt(token);
        return true;
    }

    /*
    const setToken = (token:any,refreshTken:any,delay:any) => {
        inMemoryJWT = token;
        refreshTokenJWT=refreshTken;
        //refreshToken(delay);
       // setAuthUser(token);
        if(!localStorage.getItem(AUTHVALUES)){
            let decode:any=decodeJwt(token);
            localStorage.setItem(AUTHVALUES,JSON.stringify(decode))
        }

        return true;
    };*/


   
    const ereaseToken = () => {
        //abordRefreshToken();
       // window.localStorage.setItem(logoutEventName, Date.now().toString());
       // localStorage.removeItem(REFRESHTOKEN)
       // localStorage.removeItem(ACCESSTOKEN)
        localStorage.removeItem(GLOBALTOKEN)



        return true;
    }

    const setLogoutEventName = (name:any)=> logoutEventName = name;

    return {
        ereaseToken,
        getToken,
        setLogoutEventName,
        setRefreshTokenEndpoint,
        //setToken,
        getRefreshedToken,
        setLastRecordRefreshTokenJWT,
        waitForTokenRefresh,
        getAuthUser,
        RedirectToLoginPage
    }

};

export default inMemoryJWTManager();