import { ProcurementsActionType } from "../../../../actionTypes/procurementsModules/procurements"

const initialState= {
    actionResponse:"",
    errorsResponse:"",

    getprocurements:"",
    getDetailprocurement:"",
    getprocurementsv2:"",
    getsummeryprocurements:"",
    getexportprocurements:'',
    getphoto:'',

    ////STATISTICS SECTION ////
    getprocurementsStats:'',
    getprocurmentStatfindLast7All:'',
    getprcmtStatSumRecNtWt6Month:''
}

type Action={
    type:string,
    res?:any
}
 const ProcurementsReducer = (state:Object = initialState,action:Action)=> {
    let nextstate
    switch (action.type){
    
        case ProcurementsActionType.GET_PROCUREMENT_LIST: 
        nextstate={
            ...state,
            getprocurements:action.res
        }  
        return nextstate; 
        case ProcurementsActionType.GET_PROCUREMENT_LISTV2: 
        nextstate={
            ...state,
            getprocurementsv2:action.res
        }  
        return nextstate; 
        case ProcurementsActionType.GET_PROCUREMENT_DETAIL: 
        nextstate={
            ...state,
            getDetailprocurement:action.res
        }  
        return nextstate; 

        case ProcurementsActionType.GET_EXPORT_TO_EXCEL_PROCUREMENTS_LIST: 
        nextstate={
            ...state,
            getexportprocurements:action.res
        }  
        return nextstate; 
        
        case ProcurementsActionType.GET_SEARCH_PROCUREMENTS_LIST: 
        nextstate={
            ...state,
            getprocurements:action.res
        }  
        return nextstate; 
        case ProcurementsActionType.GET_SUMMERY_PROCUREMENTS_LIST: 
        nextstate={
            ...state,
            getsummeryprocurements:action.res
        }  
        return nextstate; 
        
        case ProcurementsActionType.GET_PROCUREMENT_GETPHOTO: 
        nextstate={
            ...state,
            getphoto:action.res
        }  
        return nextstate; 
        

        case ProcurementsActionType.GET_PROCUREMENTS_CREATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case ProcurementsActionType.PACTH_PROCUREMENTS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case ProcurementsActionType.PACTH_CONFIRM_PROCUREMENTS_UPDATE: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        
        case ProcurementsActionType.PACTH_PROCUREMENTS_UPDATE_STATUS: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 
        case ProcurementsActionType.DELETE_PROCUREMENT: 
        nextstate={
            ...state,
            actionResponse:action.res
        }  
        return nextstate; 

        //// STATISTIC SECTION 
        case ProcurementsActionType.GET_PROCUREMENT_GETSTATS: 
        nextstate={
            ...state,
            getprocurementsStats:action.res
        }  
        return nextstate;
        case ProcurementsActionType.GET_PROCUREMENT_GETLAST7ALLSTATS: 
        nextstate={
            ...state,
            getprocurmentStatfindLast7All:action.res
        }  
        return nextstate; 
        case ProcurementsActionType.GET_PROCUREMENT_GETLAST6MONTHSTATS: 
        nextstate={
            ...state,
            getprcmtStatSumRecNtWt6Month:action.res
        }  
        return nextstate; 
        
        default:
            return state
    }
}
export default ProcurementsReducer;