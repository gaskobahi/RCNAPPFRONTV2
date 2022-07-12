import { RolesActionType } from "../../../../actionTypes/usersModules/roles"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getroles:"",
}

type Action={
    type:string,
    res?:any
}
 const RolesReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case RolesActionType.GET_ROLE_LIST: 
        nextstate={
            ...state,
            getroles:action.res
        }  
        return nextstate; 
    
        case RolesActionType.GET_SEARCH_ROLES_LIST: 
        nextstate={
            ...state,
            getroles:action.res
        }  
        return nextstate; 
        
        case RolesActionType.GET_ROLES_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case RolesActionType.PACTH_ROLES_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case RolesActionType.DELETE_ROLE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default RolesReducer;
