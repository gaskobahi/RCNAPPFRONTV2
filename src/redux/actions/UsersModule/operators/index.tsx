
import {AnyAction, Dispatch } from 'redux';


import { C5_CreateOperatorService, C5_DeleteOperatorService, C5_getSearchOperatorsService, C5_getOperatorsService,C5_UpdateOperatorService, C5_UpdateOperartorStatusService } from '../../../../services/userModules/Operators';
import { OperatorsActionType } from '../../../actionTypes/usersModules/operators';



export  const  C5_getOperatorsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getOperatorsService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:OperatorsActionType.GET_OPERATORS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export  const  C5_getsearchOperatorsAction = (value:string,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
        return (dispatch:Dispatch)=>{
            C5_getSearchOperatorsService(value).then((res:any)=>{
                if(res.statusCode){
                    onError(res)
                    return false
                }else{
                    dispatch({type:OperatorsActionType.GET_SEARCH_OPERATORS_LIST,res});
                    onSuccess(res);
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
    }
}

/*
export  const  C5_getSearchOperatorsAction = (value:string,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchOperatorsService(value).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:OperatorsActionType.GET_SEARCH_OPERATORS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}*/



export const C5_CreateOperatorAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateOperatorService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:OperatorsActionType.GET_OPERATORS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateOperatorAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateOperatorService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:OperatorsActionType.PACTH_OPERATORS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export const C5_UpdateOperartorStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateOperartorStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:OperatorsActionType.PACTH_OPERATORS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export const C5_DeleteOperatorAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteOperatorService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:OperatorsActionType.DELETE_OPERATOR,res});
            onSuccess(res)
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


    


