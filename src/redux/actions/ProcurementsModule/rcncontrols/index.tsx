
import {AnyAction, Dispatch } from 'redux';
import { C5_CreateRcncontrolService, C5_DeleteRcncontrolService, C5_getRcncontrolsService, C5_getPhotoService, C5_getSearchRcncontrolsService, 
    C5_UpdateRcncontrolService, 
    C5_UpdateRcncontrolStatusService,
    C5_getRcncontrolsForverifcreateandupService} from '../../../../services/procurementModules/Rcncontrols';
import { RcncontrolsActionType } from '../../../actionTypes/procurementsModules/rcncontrols';
import {SearchRcncontrol} from '../../../../Helpers/Dto/procurementModule'

export  const  C5_getRcncontrolsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getRcncontrolsService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:RcncontrolsActionType.GET_RCNCONTROL_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export   const   C5_getRcncontrolsv2Action = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getRcncontrolsForverifcreateandupService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:RcncontrolsActionType.GET_RCNCONTROL_LISTV2,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export  const  C5_getSearchRcncontrolsAction = (searchdata:SearchRcncontrol,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchRcncontrolsService(searchdata).then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:RcncontrolsActionType.GET_SEARCH_RCNCONTROLS_LIST,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export  const  C5_getRcncontrolPhotoAction = (id:string ,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getPhotoService(id).then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:RcncontrolsActionType.GET_RCNCONTROL_GETPHOTO,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}



export const C5_CreateRcncontrolAction= (data:FormData,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateRcncontrolService(data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:RcncontrolsActionType.GET_RCNCONTROLS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateRcncontrolAction = (id:string,data:FormData,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateRcncontrolService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:RcncontrolsActionType.PACTH_RCNCONTROLS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export const C5_UpdateRcncontrolStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateRcncontrolStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:RcncontrolsActionType.PACTH_RCNCONTROLS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}



export const C5_DeleteRcncontrolAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteRcncontrolService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:RcncontrolsActionType.DELETE_RCNCONTROL,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}



