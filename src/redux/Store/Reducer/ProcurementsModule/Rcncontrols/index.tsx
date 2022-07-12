import { RcncontrolsActionType } from "../../../../actionTypes/procurementsModules/rcncontrols"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getrcncontrols:"",
    getrcncontrolsv2:"",
    getphoto:''
}

type Action={
    type:string,
    res?:any
}
 const RcncontrolsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case RcncontrolsActionType.GET_RCNCONTROL_LIST: 
        nextstate={
            ...state,
            getrcncontrols:action.res
        }  
        return nextstate; 
        case RcncontrolsActionType.GET_SEARCH_RCNCONTROLS_LIST: 
        nextstate={
            ...state,
            getrcncontrols:action.res
        }  
        return nextstate; 
        case RcncontrolsActionType.GET_RCNCONTROL_LISTV2: 
        nextstate={
            ...state,
            getrcncontrolsv2:action.res
        } 
        return nextstate; 
        case RcncontrolsActionType.GET_RCNCONTROL_GETPHOTO: 
        nextstate={
            ...state,
            getphoto:action.res
        }  
        return nextstate; 
        

        case RcncontrolsActionType.GET_RCNCONTROLS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case RcncontrolsActionType.PACTH_RCNCONTROLS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case RcncontrolsActionType.PACTH_RCNCONTROLS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case RcncontrolsActionType.DELETE_RCNCONTROL: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default RcncontrolsReducer;