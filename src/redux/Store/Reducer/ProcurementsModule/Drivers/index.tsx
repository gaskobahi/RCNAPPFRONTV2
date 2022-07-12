import { DriversActionType } from "../../../../actionTypes/procurementsModules/drivers"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getdrivers:"",


    ///statistics
    getdriversStats:"",
}

type Action={
    type:string,
    res?:any
}
 const DriversReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case DriversActionType.GET_DRIVER_LIST: 
        nextstate={
            ...state,
            getdrivers:action.res
        }  
        return nextstate; 
    
        case DriversActionType.GET_SEARCH_DRIVERS_LIST: 
        nextstate={
            ...state,
            getdrivers:action.res
        }  
        return nextstate; 
        
        case DriversActionType.GET_DRIVERS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case DriversActionType.PACTH_DRIVERS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case DriversActionType.PACTH_DRIVERS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case DriversActionType.DELETE_DRIVER: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 


 

         //// STATISTIC SECTION 
         case DriversActionType.GET_DRIVERS_GETSTATS: 
         nextstate={
             ...state,
             getdriversStats:action.res
         }  
         return nextstate; 
        default:
            return state
    }
}
export default DriversReducer;
