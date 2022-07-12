import { VehiclesActionType } from "../../../../actionTypes/procurementsModules/vehicles"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getvehicles:"",

  
    ///statistics
    getvehiclesStats:"",
}

type Action={
    type:string,
    res?:any
}
 const VehiclesReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case VehiclesActionType.GET_VEHICLE_LIST: 
        nextstate={
            ...state,
            getvehicles:action.res
        }  
        return nextstate; 
    
        case VehiclesActionType.GET_SEARCH_VEHICLES_LIST: 
        nextstate={
            ...state,
            getvehicles:action.res
        }  
        return nextstate; 
        
        case VehiclesActionType.GET_VEHICLES_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case VehiclesActionType.PACTH_VEHICLES_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case VehiclesActionType.PACTH_VEHICLES_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case VehiclesActionType.DELETE_VEHICLE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 


        

         //// STATISTIC SECTION 
         case VehiclesActionType.GET_VEHICLES_GETSTATS: 
         nextstate={
             ...state,
             getvehiclesStats:action.res
         }  
         return nextstate; 
        default:
            return state
    }
}
export default VehiclesReducer;
