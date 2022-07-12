
import {AnyAction, Dispatch } from 'redux';
import { SearchSupplier } from '../../../../Helpers/Dto/procurementModule';
import { C5_CreateSupplierService, C5_DeleteSupplierService, C5_getSuppliersService, C5_getSearchSuppliersService, 
    C5_UpdateSupplierService, 
    C5_UpdateSupplierStatusService,
    C5_getStatsSuppliersService,
    C5_getAllManagersbySupplierService} from '../../../../services/procurementModules/Suppliers';
import { SuppliersActionType } from '../../../actionTypes/procurementsModules/suppliers';


export  const  C5_getSuppliersAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSuppliersService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:SuppliersActionType.GET_SUPPLIER_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export  const  C5_getSearchSuppliersAction = (searchdata:SearchSupplier,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchSuppliersService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:SuppliersActionType.GET_SEARCH_SUPPLIERS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export const C5_CreateSupplierAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateSupplierService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:SuppliersActionType.GET_SUPPLIERS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateSupplierAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateSupplierService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:SuppliersActionType.PACTH_SUPPLIERS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}




export const C5_UpdateSupplierStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateSupplierStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:SuppliersActionType.PACTH_SUPPLIERS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export const C5_DeleteSupplierAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteSupplierService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:SuppliersActionType.DELETE_SUPPLIER,res});
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


export  const  C5_getAllManagersbySupplierAction = (id:string, onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getAllManagersbySupplierService(id).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:SuppliersActionType.GET_ALL_SUPMANAGER_BY_SUPPLIER_ID,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}
//////////////////END MANAGERTOSUPPLIERSECTION ////////////


//////////STATISTICS OF PROCUREMENTS //////////////
export  const  C5_getStatsSuppliersAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getStatsSuppliersService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:SuppliersActionType.GET_SUPPLIERS_GETSTATS,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}
