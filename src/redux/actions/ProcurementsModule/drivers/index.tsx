
import {AnyAction, Dispatch } from 'redux';
import { SearchDriver } from '../../../../Helpers/Dto/procurementModule';
import { C5_CreateDriverService, C5_DeleteDriverService, C5_getDriversService, C5_getSearchDriversService, 
    C5_UpdateDriverService, 
    C5_UpdateDriverStatusService,
    C5_getStatsDriversService,
    } from '../../../../services/procurementModules/Drivers';
import { DriversActionType } from '../../../actionTypes/procurementsModules/drivers';


export  const  C5_getDriversAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getDriversService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:DriversActionType.GET_DRIVER_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export  const  C5_getSearchDriversAction = (searchdata:SearchDriver,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchDriversService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:DriversActionType.GET_SEARCH_DRIVERS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export const C5_CreateDriverAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateDriverService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:DriversActionType.GET_DRIVERS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateDriverAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateDriverService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:DriversActionType.PACTH_DRIVERS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}




export const C5_UpdateDriverStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateDriverStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:DriversActionType.PACTH_DRIVERS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export const C5_DeleteDriverAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteDriverService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:DriversActionType.DELETE_DRIVER,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}







//////////STATISTICS OF PROCUREMENTS //////////////
export  const  C5_getStatsDriversAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getStatsDriversService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:DriversActionType.GET_DRIVERS_GETSTATS,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}
