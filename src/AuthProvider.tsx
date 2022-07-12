import jwt_decode from "jwt-decode";
import { useEffect } from "react";
// in authProvider.js
import inMemoryJWT from './inMemoryJWT';
import { GLOBALTOKEN} from "./services/HttpService";


    export  const authProvider:any = {

    checkAuth: () => {
		//1SI LOCALSTORAGE VIDE,RETOURNE A LA FENETRE LOGIN
        let STOKEN:any=localStorage.getItem(GLOBALTOKEN)
        if(!STOKEN){
          return false; 
        }else{
            let JTOKEN = JSON.parse(STOKEN);
            let refreshTokenJWT=JTOKEN.refreshToken;
            let isActive=JTOKEN.isActive;
            if(!isActive){
                  inMemoryJWT.ereaseToken();
                  return false; 
            }else{
           
                return inMemoryJWT.waitForTokenRefresh().then((result) => { 
                  if(result){
                      return true;
                    }else{
                          if(!refreshTokenJWT!){
                            inMemoryJWT.ereaseToken();
                              return false
                          }
                          return inMemoryJWT.getRefreshedToken(refreshTokenJWT).then((tokenHasBeenRefreshed:any)=> {
                              if(!tokenHasBeenRefreshed){
                                inMemoryJWT.ereaseToken();
                                return false
                              }
                              return true
                          });
                      }
                }) 
              }
          }   
          
          
    }
  }





   