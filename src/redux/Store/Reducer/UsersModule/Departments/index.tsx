import { DepartmentsActionType } from "../../../../actionTypes/usersModules/departments"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getdepartments:"",
}

type Action={
    type:string,
    res?:any
}
 const DepartmentsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case DepartmentsActionType.GET_DEPARTMENT_LIST: 
        nextstate={
            ...state,
            getdepartments:action.res
        }  
        return nextstate; 
        case DepartmentsActionType.GET_SEARCH_DEPARTMENTS_LIST: 
        nextstate={
            ...state,
            getdepartments:action.res
        }  
        return nextstate; 
        
        case DepartmentsActionType.GET_DEPARTMENTS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case DepartmentsActionType.PACTH_DEPARTMENTS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case DepartmentsActionType.DELETE_DEPARTMENT: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default DepartmentsReducer;