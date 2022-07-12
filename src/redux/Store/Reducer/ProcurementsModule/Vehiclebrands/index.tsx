import { VehiclebrandsActionType } from "../../../../actionTypes/procurementsModules/vehiclebrands"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getvehiclebrands:"",

  
    ///statistics
    getvehiclebrandsStats:"",
}

type Action={
    type:string,
    res?:any
}
 const VehiclebrandsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case VehiclebrandsActionType.GET_VEHICLEBRAND_LIST: 
        nextstate={
            ...state,
            getvehiclebrands:action.res
        }  
        return nextstate; 
    
        case VehiclebrandsActionType.GET_SEARCH_VEHICLEBRANDS_LIST: 
        nextstate={
            ...state,
            getvehiclebrands:action.res
        }  
        return nextstate; 
        
        case VehiclebrandsActionType.GET_VEHICLEBRANDS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case VehiclebrandsActionType.PACTH_VEHICLEBRANDS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case VehiclebrandsActionType.PACTH_VEHICLEBRANDS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case VehiclebrandsActionType.DELETE_VEHICLEBRAND: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 


        

         //// STATISTIC SECTION 
         case VehiclebrandsActionType.GET_VEHICLEBRANDS_GETSTATS: 
         nextstate={
             ...state,
             getvehiclebrandsStats:action.res
         }  
         return nextstate; 
        default:
            return state
    }
}
export default VehiclebrandsReducer;
