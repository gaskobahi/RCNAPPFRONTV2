
import {AnyAction, Dispatch } from 'redux';
import { SearchPlace } from '../../../../Helpers/Dto/locationModule';
import { C5_CreatePlaceService, C5_DeletePlaceService, C5_getPlacesService, C5_getSearchPlacesService, C5_UpdatePlaceService } from '../../../../services/locationModules/Places';
import { PlacesActionType } from '../../../actionTypes/locationsModules/places';


export  const  C5_getPlacesAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getPlacesService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:PlacesActionType.GET_PLACE_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}




export  const  C5_getSearchPlacesAction = (searchdata:SearchPlace,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchPlacesService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:PlacesActionType.GET_SEARCH_PLACES_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });

    }
}

export const C5_CreatePlaceAction= (credentials:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreatePlaceService(credentials).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:PlacesActionType.GET_PLACES_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}


export const C5_UpdatePlaceAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdatePlaceService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:PlacesActionType.PACTH_PLACES_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}



export const C5_DeletePlaceAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeletePlaceService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:PlacesActionType.DELETE_PLACE,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}

