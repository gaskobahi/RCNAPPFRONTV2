
import {AnyAction, Dispatch } from 'redux';
import { SearchSupmanager } from '../../../../Helpers/Dto/procurementModule';
import { C5_CreateSupmanagerService, C5_DeleteSupmanagerService, C5_getSupmanagersService, C5_getSearchSupmanagersService, 
    C5_UpdateSupmanagerService, 
    C5_UpdateSupmanagerStatusService,
    C5_getStatsSupmanagersService,
    C5_getAllSuppliersbyManagerService,
    C5_DeleteSuppliersbyManagerService,
    C5_AffectManagertoSupplierService} from '../../../../services/procurementModules/Supmanagers';
import { SupmanagersActionType } from '../../../actionTypes/procurementsModules/supmanagers';


export  const  C5_getSupmanagersAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSupmanagersService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:SupmanagersActionType.GET_SUPMANAGER_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export  const  C5_getSearchSupmanagersAction = (searchdata:SearchSupmanager,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchSupmanagersService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:SupmanagersActionType.GET_SEARCH_SUPMANAGERS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export const C5_CreateSupmanagerAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateSupmanagerService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:SupmanagersActionType.GET_SUPMANAGERS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateSupmanagerAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateSupmanagerService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:SupmanagersActionType.PACTH_SUPMANAGERS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}




export const C5_UpdateSupmanagerStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateSupmanagerStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:SupmanagersActionType.PACTH_SUPMANAGERS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export const C5_DeleteSupmanagerAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteSupmanagerService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:SupmanagersActionType.DELETE_SUPMANAGER,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}



////////// MANAGERTOSUPPLIERSECTION ////////////



export  const C5_AffectManagertoSupplierAction = (data:any, onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_AffectManagertoSupplierService(data).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:SupmanagersActionType.AFFECT_ALL_MANAGER_TO_SUPLIER,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export  const  C5_getAllSuppliersbyManagerAction = (id:string, onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getAllSuppliersbyManagerService(id).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:SupmanagersActionType.GET_ALL_SUPPLIER_BY_SUPMANAGER_ID,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export const C5_DeleteSuppliersbyManagerAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteSuppliersbyManagerService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:SupmanagersActionType.DELETE_SUPPLIER_BY_SUPMANAGER_ID,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}



//////////////////END MANAGERTOSUPPLIERSECTION ////////////






//////////STATISTICS OF PROCUREMENTS //////////////
export  const  C5_getStatsSupmanagersAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getStatsSupmanagersService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:SupmanagersActionType.GET_SUPMANAGERS_GETSTATS,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}
