import {AuthUserActionType} from '../../../actionTypes/auth'
const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getuserprofile:"",
}

/*
interface LoginAction{
    type:'LOGIN_REDIRECTION_SUCCESS',
    res:Object
}
type Action1=LoginAction*/

type Action={
    type:string,
    res?:any
}
 const AuthReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
        
        case AuthUserActionType.LOGIN: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case AuthUserActionType.USER_PROFILE: 
            nextstate={
                ...state,
                getuserprofile:action.res
            }  
            return nextstate; 
        case AuthUserActionType.USER_UPDATE_MY_PROFILE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate;
        case AuthUserActionType.USER_CHANGE_MYPASSWORD: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate;
        
            
        default:
            return state
    }
}
export default AuthReducer;