import { RegionsActionType } from "../../../../actionTypes/locationsModules/regions"

const initialState= {
    actionResponse:"",
    errorsResponse:"",
    getregions:"",
}

type Action={
    type:string,
    res?:any
}
 const RegionsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case RegionsActionType.GET_REGION_LIST: 
        nextstate={
            ...state,
            getregions:action.res
        }  
        return nextstate; 
    
        case RegionsActionType.GET_SEARCH_REGIONS_LIST: 
        nextstate={
            ...state,
            getregions:action.res
        }  
        return nextstate; 
        
        case RegionsActionType.GET_REGIONS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case RegionsActionType.PACTH_REGIONS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case RegionsActionType.DELETE_REGION: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        default:
            return state
    }
}
export default RegionsReducer;
