import { UsersActionType } from "../../../../actionTypes/usersModules/users"

//import {UserActionType} from '../../../actionTypes/users'
const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getusers:"",
}

type Action={
    type:string,
    res?:any
}
 const UsersReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case UsersActionType.GET_USERS_LIST: 
        nextstate={
            ...state,
            getusers:action.res
        }  
        return nextstate; 
        case UsersActionType.GET_SEARCH_USERS_LIST: 
        nextstate={
            ...state,
            getusers:action.res
        }  
        return nextstate; 
        
        case UsersActionType.GET_USERS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case UsersActionType.PACTH_USERS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case UsersActionType.PACTH_RESET_USER_PASSWORD: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case UsersActionType.PACTH_USER_SETTINGS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case UsersActionType.DELETE_USER: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
     
        default:
            return state
    }
}
export default UsersReducer;