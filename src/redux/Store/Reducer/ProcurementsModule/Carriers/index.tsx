import { CarriersActionType } from "../../../../actionTypes/procurementsModules/carriers"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getcarriers:"",


    ///statistics
    getcarriersStats:"",
}

type Action={
    type:string,
    res?:any
}
 const CarriersReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case CarriersActionType.GET_CARRIER_LIST: 
        nextstate={
            ...state,
            getcarriers:action.res
        }  
        return nextstate; 
    
        case CarriersActionType.GET_SEARCH_CARRIERS_LIST: 
        nextstate={
            ...state,
            getcarriers:action.res
        }  
        return nextstate; 
        
        case CarriersActionType.GET_CARRIERS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case CarriersActionType.PACTH_CARRIERS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case CarriersActionType.PACTH_CARRIERS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case CarriersActionType.DELETE_CARRIER: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 


 

         //// STATISTIC SECTION 
         case CarriersActionType.GET_CARRIERS_GETSTATS: 
         nextstate={
             ...state,
             getcarriersStats:action.res
         }  
         return nextstate; 
        default:
            return state
    }
}
export default CarriersReducer;
