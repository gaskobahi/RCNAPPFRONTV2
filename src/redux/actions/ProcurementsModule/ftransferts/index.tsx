
import {AnyAction, Dispatch } from 'redux';
import { C5_CreateFtransfertService, C5_DeleteFtransfertService, C5_getFtransfertDetailService, C5_getFtransfertsService, C5_getPhotoService, C5_getSearchFtransfertsService, 
    C5_UpdateFtransfertService, 
    C5_UpdateFtransfertStatusService} from '../../../../services/procurementModules/Ftransferts';
import { FtransfertsActionType } from '../../../actionTypes/procurementsModules/ftransferts';
import {SearchFtransfert} from '../../../../Helpers/Dto/procurementModule'

export  const  C5_getFtransfertsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getFtransfertsService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:FtransfertsActionType.GET_FTRANSFERT_LIST,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export const C5_getFtransfertDetailAction = (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_getFtransfertDetailService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:FtransfertsActionType.GET_FTRANSFERT_DETAIL,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export  const  C5_getPhotoAction = (id:string ,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getPhotoService(id).then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:FtransfertsActionType.GET_FTRANSFERT_GETPHOTO,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}



export const C5_CreateFtransfertAction= (data:FormData,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateFtransfertService(data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:FtransfertsActionType.GET_FTRANSFERTS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateFtransfertAction = (id:string,data:FormData,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateFtransfertService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:FtransfertsActionType.PACTH_FTRANSFERTS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export  const  C5_getSearchFtransfertsAction = (searchdata:SearchFtransfert,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchFtransfertsService(searchdata).then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:FtransfertsActionType.GET_SEARCH_FTRANSFERTS_LIST,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}
export const C5_UpdateFtransfertStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateFtransfertStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:FtransfertsActionType.PACTH_FTRANSFERTS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}



export const C5_DeleteFtransfertAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteFtransfertService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:FtransfertsActionType.DELETE_FTRANSFERT,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}

function id(id: any) {
    throw new Error('Function not implemented.');
}

