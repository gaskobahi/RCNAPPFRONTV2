import { TrailersActionType } from "../../../../actionTypes/procurementsModules/trailers"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    gettrailers:"",

  
    ///statistics
    gettrailersStats:"",
}

type Action={
    type:string,
    res?:any
}
 const TrailersReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case TrailersActionType.GET_TRAILER_LIST: 
        nextstate={
            ...state,
            gettrailers:action.res
        }  
        return nextstate; 
    
        case TrailersActionType.GET_SEARCH_TRAILERS_LIST: 
        nextstate={
            ...state,
            gettrailers:action.res
        }  
        return nextstate; 
        
        case TrailersActionType.GET_TRAILERS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case TrailersActionType.PACTH_TRAILERS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case TrailersActionType.PACTH_TRAILERS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case TrailersActionType.DELETE_TRAILER: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 


        

         //// STATISTIC SECTION 
         case TrailersActionType.GET_TRAILERS_GETSTATS: 
         nextstate={
             ...state,
             gettrailersStats:action.res
         }  
         return nextstate; 
        default:
            return state
    }
}
export default TrailersReducer;
