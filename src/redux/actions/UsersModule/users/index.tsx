
import {AnyAction, Dispatch } from 'redux';


import { C5_CreateUserService, C5_DeleteUserService, C5_getSearchUsersService, C5_getUsersService, C5_ResetUserPasswordService, C5_UpdateUserService, C5_UserSettingsService } from '../../../../services/userModules/Users';
import { UsersActionType } from '../../../actionTypes/usersModules/users';



export  const  C5_getUsersAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getUsersService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:UsersActionType.GET_USERS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export  const  C5_getSearchUsersAction = (value:string,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchUsersService(value).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:UsersActionType.GET_SEARCH_USERS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}



export const C5_CreateUserAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateUserService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:UsersActionType.GET_USERS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateUserAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateUserService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:UsersActionType.PACTH_USERS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}



export const C5_ResetUserPasswordAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_ResetUserPasswordService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:UsersActionType.PACTH_RESET_USER_PASSWORD,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export const C5_UserSettingsAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UserSettingsService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:UsersActionType.PACTH_USER_SETTINGS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export const C5_DeleteUserAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteUserService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:UsersActionType.DELETE_USER,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
    }






/*
export const C5_LoginAction = (credentials:any,onSuccess:any,onError:any="")=>{
    return (dispatch :Dispatch)=>{
        C5_LoginService(credentials).then((res)=>{
            if(res.statusCode){
                if(onError!="") onError(res);
                return false
            }
            dispatch({type:AuthUserActionType.LOGIN,res});
            localStorage.setItem('user-token',res.accessToken);
            onSuccess(res);
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}

export const C5_UserProfileAction = (onSuccess:any,onError:any="")=>{
    return (dispatch:Dispatch)=>{
        C5_UserProfileService().then((res)=>{
            if(res.statusCode){
                if(onError!="") onError(res);
                return false
            }
            dispatch({type:AuthUserActionType.USER_LOGIN,res});
            onSuccess(res)
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}
*/

/*
export const C5_ChgMyPasswordAction = (credentials,onSuccess,onError="")=>{
    return (dispatch)=>{
        C5_ChgMyPasswordService(credentials).then((res)=>{
            if(res.hasOwnProperty('success') && res.success===true){
                 dispatch({type:'CHANGE_MY_PASSWORD_SUCCESS'});
                onSuccess(res);
            }else if(res.hasOwnProperty('success') && res.success===false){
                 onError(res);
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}

export const C5_ChgUserStatusAction = (credentials,onSuccess="",onError="")=>{
    return (dispatch)=>{
        C5_ChgUserStatusService(credentials).then((res)=>{
           if(res.hasOwnProperty('success') && res.success===true){
                dispatch({type:'CHANGE_USER_STATUS_SUCCESS',res});
                setTimeout(()=>{
                    dispatch(C5_getUsersAction(onSuccess,onError));
                },500)  
               
            }else if(res.hasOwnProperty('success') && res.success===false){
                onError(res);
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}



export const C5_EditUserAction= (data,onSuccess="",onError="",resetForm="")=>{
    return (dispatch)=>{
        C5_EditUserService(data).then((res)=>{
            if(res.hasOwnProperty('success') && res.success===true){
               dispatch({type:'EDIT_USER_SUCCESS',res});
                    dispatch(C5_getUsersAction());
                    onSuccess(res);
            }else if(res.hasOwnProperty('success') && res.success===false){
                onError(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
    }

    

export const C5_SearchUserAction = (searchvalue,onSuccess="",onError="")=>{
        return (dispatch)=>{
                   C5_SearchUserService(searchvalue).then((res)=>{
                   if(res.hasOwnProperty('success') && res.success===true){
                           dispatch({type:'C5_USER_SEARCH_SUCCESS',res}); 
                           if(onSuccess!=''){
                            onSuccess(res)
                           }   
                       }else if(res.hasOwnProperty('success') && res.success===false){
                           if(onError!=''){
                            onError(res)
                           } 
                       }
                    },
                       error=>{
                           dispatch({type:'CODE_ERROR',error});
                       });   
        }
        }
*/

/*

export const CHW_getUsersAction = (onSucces="",onError="")=>{

    return (dispatch)=>{
        CHW_GetUsersService().then((res)=>{
    if(res.hasOwnProperty('success') && res.success===true){
        dispatch({type:'GET_ALL_USERS_SUCCESS',res});
        onSucces(res)
    }else if(res.hasOwnProperty('success') && res.success===false){
        dispatch({type:'GET_ALL_USERS_ERROR',res});
        onError(res)
    }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}



export const  CHW_CreateUserAction = (data,resetForm,onSuccess="",onError="",setOpen="")=>{
    return (dispatch)=>{
        CHW_CreateUserService(data).then((res)=>{
      if(res.hasOwnProperty('success') && res.success===true){
           dispatch({type:'CHW_CREATE_USER_SUCCESS',res});
           resetForm();
           setOpen(false)
           setTimeout(()=>{
            dispatch(CHW_getUsersAction(onSuccess,onError));
           },500)
       }else if(res.hasOwnProperty('success') && res.success===false){
          dispatch({type:'CHW_CREATE_USER_ERROR',res});
           onError(res)
       }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export const CHW_EditUserAction = (data,onSuccess="",onError="",resetForm="")=>{
    return (dispatch)=>{
        CHW_UpdateUserService(data).then((res)=>{
            if(res.hasOwnProperty('success') && res.success===true){
               dispatch({type:'CHW_UPDATE_USER_SUCCESS',res});
                //resetForm();
                  //setTimeout(()=>{
                    dispatch(CHW_getUsersAction(onSuccess,onError));
               // },500) 
            }else if(res.hasOwnProperty('success') && res.success===false){
                onError(res)
                //alert("boris2")
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
    }

    
export const CHW_SearchUserAction = (value,onSuccess="",onError="")=>{
    return (dispatch)=>{
               CHW_SearchUserService(value).then((res)=>{
               if(res.hasOwnProperty('success') && res.success===true){
                       dispatch({type:'CHW_USER_SEARCH_SUCCESS',res}); 
                       onSuccess(res)   
                   }else if(res.hasOwnProperty('success') && res.success===false){
                       dispatch({type:'CHW_USER_SEARCH_ERROR',res});
                       if(onError!=""){
                            onError(res)
                       }
                   }
                   },
                   error=>{
                       dispatch({type:'CODE_ERROR',error});
                   });
               
    }
    }


export const CHW_UserChgStatusAction = (credentials,onSuccess="",onError="")=>{
        return (dispatch)=>{
            CSW_userChgStatusService(credentials).then((res)=>{
               if(res.hasOwnProperty('success') && res.success===true){
                    dispatch({type:'USER_CHANGESTATUS_SUCCESS',res});
                    setTimeout(()=>{
                        dispatch(CHW_getUsersAction(onSuccess,onError));
                    },500)  
                    //resetForm();
                    //onSuccess(res);
                }else if(res.hasOwnProperty('success') && res.success===false){
                    dispatch({type:'USER_CHANGESTATUS_ERROR',res});
                    onError(res);
                }
            },
            error=>{
                dispatch({type:'CODE_ERROR',error});
            });
            
        }
    }
    




export const CHW_deleteUserAction = (data,onSuccess,onErrors="")=>{
        return (dispatch)=>{
            CHW_deleteUserService(data).then((res)=>{
            if(res.hasOwnProperty('success') && res.success===true){
                dispatch({type:'DELETE_USER_SUCCESS',res});
                setTimeout(()=>{
                    dispatch(CHW_getUsersAction(onSuccess,onErrors));
                },500)
            }else if(res.hasOwnProperty('success') && res.success===false){
                dispatch({type:'DELETE_USER_ERROR',res});
                onErrors(res);
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
        }
    }

*/
