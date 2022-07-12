
import {AnyAction, Dispatch } from 'redux';
import { SearchVehiclebrand } from '../../../../Helpers/Dto/procurementModule';
import { C5_CreateVehiclebrandService, C5_DeleteVehiclebrandService, C5_getVehiclebrandsService, C5_getSearchVehiclebrandsService, 
    C5_UpdateVehiclebrandService, 
    C5_getStatsVehiclebrandsService,
   } from '../../../../services/procurementModules/Vehiclebrands';
import { VehiclebrandsActionType } from '../../../actionTypes/procurementsModules/vehiclebrands';


export  const  C5_getVehiclebrandsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getVehiclebrandsService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:VehiclebrandsActionType.GET_VEHICLEBRAND_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export  const  C5_getSearchVehiclebrandsAction = (searchdata:SearchVehiclebrand,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchVehiclebrandsService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:VehiclebrandsActionType.GET_SEARCH_VEHICLEBRANDS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export const C5_CreateVehiclebrandAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateVehiclebrandService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:VehiclebrandsActionType.GET_VEHICLEBRANDS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateVehiclebrandAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateVehiclebrandService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:VehiclebrandsActionType.PACTH_VEHICLEBRANDS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}





export const C5_DeleteVehiclebrandAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteVehiclebrandService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:VehiclebrandsActionType.DELETE_VEHICLEBRAND,res});
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
export  const  C5_getStatsVehiclebrandsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getStatsVehiclebrandsService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:VehiclebrandsActionType.GET_VEHICLEBRANDS_GETSTATS,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}
