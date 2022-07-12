import { SuppliersActionType } from "../../../../actionTypes/procurementsModules/suppliers"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getsuppliers:"",

    ///MANAGERTOSUPPLLIER
    getmanagersbysupplier:"",

    ///statistics
    getsuppliersStats:"",
}

type Action={
    type:string,
    res?:any
}
 const SuppliersReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case SuppliersActionType.GET_SUPPLIER_LIST: 
        nextstate={
            ...state,
            getsuppliers:action.res
        }  
        return nextstate; 
    
        case SuppliersActionType.GET_SEARCH_SUPPLIERS_LIST: 
        nextstate={
            ...state,
            getsuppliers:action.res
        }  
        return nextstate; 
        
        case SuppliersActionType.GET_SUPPLIERS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case SuppliersActionType.PACTH_SUPPLIERS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case SuppliersActionType.PACTH_SUPPLIERS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case SuppliersActionType.DELETE_SUPPLIER: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 

        
        //// MANGAER TO SUPPLIER SECTION // /////////

        case SuppliersActionType.GET_ALL_SUPMANAGER_BY_SUPPLIER_ID: 
        nextstate={
            ...state,
            getmanagersbysupplier:action.res
        }  
        return nextstate; 

         //// STATISTIC SECTION 
         case SuppliersActionType.GET_SUPPLIERS_GETSTATS: 
         nextstate={
             ...state,
             getsuppliersStats:action.res
         }  
         return nextstate; 
        default:
            return state
    }
}
export default SuppliersReducer;
