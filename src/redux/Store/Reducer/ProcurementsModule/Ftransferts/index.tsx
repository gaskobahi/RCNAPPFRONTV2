import { FtransfertsActionType } from "../../../../actionTypes/procurementsModules/ftransferts"

const initialState= {
    actionResponse:"",
    getDetailftransfert:"",
    errorsResponse:"",
    getftransferts:"",
    getphoto:''
}

type Action={
    type:string,
    res?:any
}
 const FtransfertsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case FtransfertsActionType.GET_FTRANSFERT_LIST: 
        nextstate={
            ...state,
            getftransferts:action.res
        }  
        return nextstate; 
        case FtransfertsActionType.GET_SEARCH_FTRANSFERTS_LIST: 
        nextstate={
            ...state,
            getftransferts:action.res
        }  
        return nextstate; 

        case FtransfertsActionType.GET_FTRANSFERT_GETPHOTO: 
        nextstate={
            ...state,
            getphoto:action.res
        }  
        return nextstate; 

        case FtransfertsActionType.GET_FTRANSFERT_DETAIL: 
        nextstate={
            ...state,
            getDetailftransfert:action.res
        }  
        return nextstate; 

        case FtransfertsActionType.GET_FTRANSFERTS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case FtransfertsActionType.PACTH_FTRANSFERTS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case FtransfertsActionType.PACTH_FTRANSFERTS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case FtransfertsActionType.DELETE_FTRANSFERT: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default FtransfertsReducer;