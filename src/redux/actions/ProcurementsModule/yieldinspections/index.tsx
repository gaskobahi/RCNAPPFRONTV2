
import {AnyAction, Dispatch } from 'redux';
import { C5_CreateYieldinspectionService, C5_DeleteYieldinspectionService, C5_getYieldinspectionsService, C5_getPhotoService, C5_getSearchYieldinspectionsService, 
    C5_UpdateYieldinspectionService, 
    C5_UpdateYieldinspectionStatusService,
    C5_getYieldinspectionsForverifcreateandupService} from '../../../../services/procurementModules/Yieldinspections';
import { YieldinspectionsActionType } from '../../../actionTypes/procurementsModules/yieldinspections';
import {SearchYieldinspection} from '../../../../Helpers/Dto/procurementModule'

export  const  C5_getYieldinspectionsAction = (onSuccess:any, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getYieldinspectionsService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:YieldinspectionsActionType.GET_YIELDINSPECTION_LIST,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export  const  C5_getYieldinspectionPhotoAction = (id:string ,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getPhotoService(id).then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:YieldinspectionsActionType.GET_YIELDINSPECTION_GETPHOTO,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export   const    C5_getYieldinspectionsv2Action =(onSuccess:any,onError:any)=>{
    return   (dispatch:Dispatch)=>{
         C5_getYieldinspectionsForverifcreateandupService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:YieldinspectionsActionType.GET_YIELDINSPECTION_LISTV2,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export const C5_CreateYieldinspectionAction= (data:FormData,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateYieldinspectionService(data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:YieldinspectionsActionType.GET_YIELDINSPECTIONS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateYieldinspectionAction = (id:string,data:FormData,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateYieldinspectionService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:YieldinspectionsActionType.PACTH_YIELDINSPECTIONS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export  const  C5_getSearchYieldinspectionsAction = (searchdata:SearchYieldinspection,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchYieldinspectionsService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:YieldinspectionsActionType.GET_SEARCH_YIELDINSPECTIONS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export const C5_UpdateYieldinspectionStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateYieldinspectionStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:YieldinspectionsActionType.PACTH_YIELDINSPECTIONS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}



export const C5_DeleteYieldinspectionAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteYieldinspectionService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:YieldinspectionsActionType.DELETE_YIELDINSPECTION,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}



