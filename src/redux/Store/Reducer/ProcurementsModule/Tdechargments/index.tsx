import { TdechargmentsActionType } from "../../../../actionTypes/procurementsModules/tdechargments"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    gettdechargments:"",
    getDetailtdechargment:"",
    gettdechargmentsv2:"",
    getphoto:''
}

type Action={
    type:string,
    res?:any
}
 const TdechargmentsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case TdechargmentsActionType.GET_TDECHARGMENT_LIST: 
        nextstate={
            ...state,
            gettdechargments:action.res
        }  
        return nextstate; 
        case TdechargmentsActionType.GET_SEARCH_TDECHARGMENTS_LIST: 
        nextstate={
            ...state,
            gettdechargments:action.res
        }  
        return nextstate; 
        case TdechargmentsActionType.GET_TDECHARGMENT_LISTV2: 
        nextstate={
            ...state,
            gettdechargmentsv2:action.res
        } 
        return nextstate; 
        case TdechargmentsActionType.GET_TDECHARGMENT_GETPHOTO: 
        nextstate={
            ...state,
            getphoto:action.res
        }  
        return nextstate; 
        
        case TdechargmentsActionType.GET_TDECHARGMENT_DETAIL: 
        nextstate={
            ...state,
            getDetailtdechargment:action.res
        }  
        return nextstate; 

        case TdechargmentsActionType.GET_TDECHARGMENTS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case TdechargmentsActionType.PACTH_TDECHARGMENTS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case TdechargmentsActionType.PACTH_TDECHARGMENTS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case TdechargmentsActionType.DELETE_TDECHARGMENT: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default TdechargmentsReducer;