import { YieldinspectionsActionType } from "../../../../actionTypes/procurementsModules/yieldinspections"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getyieldinspections:"",
    getyieldinspectionsv2:"",
    getphoto:''
}

type Action={
    type:string,
    res?:any
}
 const YieldinspectionsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case YieldinspectionsActionType.GET_YIELDINSPECTION_LIST: 
        nextstate={
            ...state,
            getyieldinspections:action.res
        }  
        return nextstate; 
        case YieldinspectionsActionType.GET_YIELDINSPECTION_LISTV2: 
        nextstate={
            ...state,
            getyieldinspectionsv2:action.res
        } 
        return nextstate; 
        case YieldinspectionsActionType.GET_SEARCH_YIELDINSPECTIONS_LIST: 
        nextstate={
            ...state,
            getyieldinspections:action.res
        }  
        return nextstate; 
       

        case YieldinspectionsActionType.GET_YIELDINSPECTION_GETPHOTO: 
        nextstate={
            ...state,
            getphoto:action.res
        }  
        return nextstate; 
        

        case YieldinspectionsActionType.GET_YIELDINSPECTIONS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case YieldinspectionsActionType.PACTH_YIELDINSPECTIONS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case YieldinspectionsActionType.PACTH_YIELDINSPECTIONS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case YieldinspectionsActionType.DELETE_YIELDINSPECTION: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default YieldinspectionsReducer;