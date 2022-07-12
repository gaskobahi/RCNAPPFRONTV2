
import {AnyAction, Dispatch } from 'redux';
import { C5_CreateRoleService, C5_DeleteRoleService, C5_getRolesService, C5_getSearchRolesService, C5_UpdateRoleService } from '../../../../services/userModules/Roles';
import { RolesActionType } from '../../../actionTypes/usersModules/roles';


export  const  C5_getRolesAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getRolesService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:RolesActionType.GET_ROLE_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export const C5_CreateRoleAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateRoleService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:RolesActionType.GET_ROLES_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateRoleAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateRoleService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:RolesActionType.PACTH_ROLES_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export  const  C5_getSearchRolesAction = (value:string,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchRolesService(value).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:RolesActionType.GET_SEARCH_ROLES_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}


export const C5_DeleteRoleAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteRoleService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:RolesActionType.DELETE_ROLE,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}

