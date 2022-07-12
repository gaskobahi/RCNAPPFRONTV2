import { OperatorsActionType } from "../../../../actionTypes/usersModules/operators"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getoperators:"",
}

type Action={
    type:string,
    res?:any
}
 const OperatorsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case OperatorsActionType.GET_OPERATORS_LIST: 
        nextstate={
            ...state,
            getoperators:action.res
        }  
        return nextstate; 
        case OperatorsActionType.GET_SEARCH_OPERATORS_LIST: 
        nextstate={
            ...state,
            getoperators:action.res
        }  
        return nextstate; 
        
        case OperatorsActionType.GET_OPERATORS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case OperatorsActionType.PACTH_OPERATORS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case OperatorsActionType.PACTH_OPERATORS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        
        case OperatorsActionType.DELETE_OPERATOR: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
     
        default:
            return state
    }
}
export default OperatorsReducer;