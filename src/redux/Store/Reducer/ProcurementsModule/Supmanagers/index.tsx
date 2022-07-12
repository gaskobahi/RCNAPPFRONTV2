import { SupmanagersActionType } from "../../../../actionTypes/procurementsModules/supmanagers"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getsupmanagers:"",

    ///MANAGERTOSUPPLLIER
    getsuppliersbymanager:"",


    ///statistics
    getsupmanagersStats:"",
}

type Action={
    type:string,
    res?:any
}
 const SupmanagersReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case SupmanagersActionType.GET_SUPMANAGER_LIST: 
        nextstate={
            ...state,
            getsupmanagers:action.res
        }  
        return nextstate; 
    
        case SupmanagersActionType.GET_SEARCH_SUPMANAGERS_LIST: 
        nextstate={
            ...state,
            getsupmanagers:action.res
        }  
        return nextstate; 
        
        case SupmanagersActionType.GET_SUPMANAGERS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case SupmanagersActionType.PACTH_SUPMANAGERS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case SupmanagersActionType.PACTH_SUPMANAGERS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case SupmanagersActionType.DELETE_SUPMANAGER: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 


 //// MANGAER TO SUPPLIER SECTION // /////////

        case SupmanagersActionType.GET_ALL_SUPPLIER_BY_SUPMANAGER_ID: 
        nextstate={
            ...state,
            getsuppliersbymanager:action.res
        }  
        return nextstate; 
        case SupmanagersActionType.AFFECT_ALL_MANAGER_TO_SUPLIER: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        
        case SupmanagersActionType.DELETE_SUPPLIER_BY_SUPMANAGER_ID: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        
 
  //// MANGAER TO SUPPLIER SECTION /////
        

         //// STATISTIC SECTION 
         case SupmanagersActionType.GET_SUPMANAGERS_GETSTATS: 
         nextstate={
             ...state,
             getsupmanagersStats:action.res
         }  
         return nextstate; 
        default:
            return state
    }
}
export default SupmanagersReducer;
