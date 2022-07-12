
import {AnyAction, Dispatch } from 'redux';
import { C5_CreateTdechargmentService, C5_DeleteTdechargmentService, C5_getTdechargmentsService, C5_getPhotoService, C5_getSearchTdechargmentsService, 
    C5_UpdateTdechargmentService, 
    C5_UpdateTdechargmentStatusService,
    C5_getTdechargmentsForverifcreateandupService,
    C5_getTdechargmentDetailService} from '../../../../services/procurementModules/Tdechargments';
import { TdechargmentsActionType } from '../../../actionTypes/procurementsModules/tdechargments';
import {SearchTdechargment} from '../../../../Helpers/Dto/procurementModule'

export  const  C5_getTdechargmentsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getTdechargmentsService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:TdechargmentsActionType.GET_TDECHARGMENT_LIST,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export   const   C5_getTdechargmentsv2Action = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getTdechargmentsForverifcreateandupService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:TdechargmentsActionType.GET_TDECHARGMENT_LISTV2,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export const C5_getTdechargmentDetailAction = (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_getTdechargmentDetailService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:TdechargmentsActionType.GET_TDECHARGMENT_DETAIL,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export  const  C5_getTdechargmentsPhotoAction = (id:string ,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getPhotoService(id).then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:TdechargmentsActionType.GET_TDECHARGMENT_GETPHOTO,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}



export const C5_CreateTdechargmentAction= (data:FormData,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateTdechargmentService(data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:TdechargmentsActionType.GET_TDECHARGMENTS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateTdechargmentAction = (id:string,data:FormData,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateTdechargmentService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:TdechargmentsActionType.PACTH_TDECHARGMENTS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}



export  const  C5_getSearchTdechargmentsAction = (searchdata:SearchTdechargment,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchTdechargmentsService(searchdata).then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:TdechargmentsActionType.GET_SEARCH_TDECHARGMENTS_LIST,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}



export const C5_UpdateTdechargmentStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateTdechargmentStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:TdechargmentsActionType.PACTH_TDECHARGMENTS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}



export const C5_DeleteTdechargmentAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteTdechargmentService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:TdechargmentsActionType.DELETE_TDECHARGMENT,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}



