
import {AnyAction, Dispatch } from 'redux';
import { SearchRegion } from '../../../../Helpers/Dto/locationModule';
import { C5_CreateRegionService, C5_DeleteRegionService, C5_getRegionsService, C5_getSearchRegionsService, C5_UpdateRegionService } from '../../../../services/locationModules/Regions';
import { RegionsActionType } from '../../../actionTypes/locationsModules/regions';


export  const  C5_getRegionsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getRegionsService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:RegionsActionType.GET_REGION_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}


export const C5_CreateRegionAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateRegionService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:RegionsActionType.GET_REGIONS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdateRegionAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateRegionService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:RegionsActionType.PACTH_REGIONS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}


export  const  C5_getSearchRegionsAction = (searchdata:SearchRegion,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchRegionsService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:RegionsActionType.GET_SEARCH_REGIONS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}


export const C5_DeleteRegionAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteRegionService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:RegionsActionType.DELETE_REGION,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}

