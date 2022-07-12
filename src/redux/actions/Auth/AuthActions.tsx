
import { Dispatch } from 'redux';
import inMemoryJWT from '../../../inMemoryJWT';

import {C5_LoginService, C5_UpdateMyProfileService, C5_UserProfileService,C5_ChangeMyPasswordService
} from '../../../services/Auth/AuthService';
import {GLOBALTOKEN} from '../../../services/HttpService';
import { AuthUserActionType } from '../../actionTypes/auth';



export const C5_LoginAction =  (credentials:any,onSuccess:any,onError:any="")=>{
    return (dispatch :Dispatch)=>{
        C5_LoginService(credentials).then((res)=>{
            if(res.statusCode){
                if(onError!="") onError(res);
                return false
            }else{
                dispatch({type:AuthUserActionType.LOGIN,res});
                localStorage.setItem(GLOBALTOKEN,JSON.stringify(res))
                setTimeout(()=>{
                    onSuccess(res);
                },200)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}



/*export const C5_LogoutAction=() =>{
    let navigate=useNavigate();
    localStorage.removeItem(TOKEN);
    navigate("/login", { replace: true })
  }*/
  

export const C5_UserProfileAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_UserProfileService().then((res)=>{
            if(res.statusCode){
                onError(res);
                return false;
            }else{
                console.log('TCI')
                console.log(res)
            dispatch({type:AuthUserActionType.USER_PROFILE,res});
            onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}

export const C5_UpdateMyProfileAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateMyProfileService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:AuthUserActionType.USER_UPDATE_MY_PROFILE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export const C5_ChangeMyPasswordAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_ChangeMyPasswordService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:AuthUserActionType.USER_CHANGE_MYPASSWORD,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}



