import { PlacesActionType } from "../../../../actionTypes/locationsModules/places"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getplaces:"",
}

type Action={
    type:string,
    res?:any
}
 const PlacesReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case PlacesActionType.GET_PLACE_LIST: 
        nextstate={
            ...state,
            getplaces:action.res
        }  
        return nextstate; 
        case PlacesActionType.GET_SEARCH_PLACES_LIST: 
        nextstate={
            ...state,
            getplaces:action.res
        }  
        return nextstate; 
        
        case PlacesActionType.GET_PLACES_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case PlacesActionType.PACTH_PLACES_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case PlacesActionType.DELETE_PLACE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default PlacesReducer;