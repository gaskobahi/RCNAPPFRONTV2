import { StacksActionType } from "../../../../actionTypes/procurementsModules/stacks"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getstacks:"",
}

type Action={
    type:string,
    res?:any
}
 const StacksReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case StacksActionType.GET_STACK_LIST: 
        nextstate={
            ...state,
            getstacks:action.res
        }  
        return nextstate; 
        case StacksActionType.GET_SEARCH_STACKS_LIST: 
        nextstate={
            ...state,
            getstacks:action.res
        }  
        return nextstate; 
        
        case StacksActionType.GET_STACKS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case StacksActionType.PACTH_STACKS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case StacksActionType.DELETE_STACK: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default StacksReducer;