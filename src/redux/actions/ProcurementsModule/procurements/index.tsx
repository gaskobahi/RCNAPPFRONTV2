
import {AnyAction, Dispatch } from 'redux';
import { C5_CreateProcurementService, C5_DeleteProcurementService, C5_getProcurementsService, C5_getPhotoService, 
    C5_UpdateProcurementService, 
    C5_UpdateProcurementStatusService,
    C5_getSearchProcurementsService,
    C5_getSummeryProcurementsService,
    C5_getProcurementsForverifcreateandupService,
    C5_ConfirmProcurementService,
    C5_getProcurementDetailService,
    C5_getStatsProcurementsService,
    C5_getStatfindLast7AllProcurementsService,
    C5_getStatfindLast6MonthAllProcurementsService,
    C5_getExportToExcelProcurementsService} from '../../../../services/procurementModules/Procurements';
import { ProcurementsActionType } from '../../../actionTypes/procurementsModules/procurements';
import {SearchProcurement, SummeryProcurement} from '../../../../Helpers/Dto/procurementModule'

export  const  C5_getProcurementsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getProcurementsService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:ProcurementsActionType.GET_PROCUREMENT_LIST,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}
export   const   C5_getProcurementsv2Action = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getProcurementsForverifcreateandupService().then((res:any)=>{
            if(res.statusCode){
                 onError(res);
                return false
            }else{
                dispatch({type:ProcurementsActionType.GET_PROCUREMENT_LISTV2,res});
                onSuccess(res);
            }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export const C5_getProcurementDetailAction = (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_getProcurementDetailService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:ProcurementsActionType.GET_PROCUREMENT_DETAIL,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}






export  const  C5_getExportToExcelProcurementsAction = (searchdata:SearchProcurement,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getExportToExcelProcurementsService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:ProcurementsActionType.GET_EXPORT_TO_EXCEL_PROCUREMENTS_LIST,res});
               // setTimeout(()=>{
                    onSuccess(res);
               // },2000)
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export  const  C5_getSearchProcurementsAction = (searchdata:SearchProcurement,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSearchProcurementsService(searchdata).then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:ProcurementsActionType.GET_SEARCH_PROCUREMENTS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export  const  C5_getSummeryProcurementsAction = (searchSummerydata:SummeryProcurement,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getSummeryProcurementsService(searchSummerydata).then((res:any)=>{
            if(res.statusCode){
                  onError(res);
                 return false
            }else{
                dispatch({type:ProcurementsActionType.GET_SUMMERY_PROCUREMENTS_LIST,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export const C5_CreateProcurementAction= (data:any,onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_CreateProcurementService(data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
                dispatch({type:ProcurementsActionType.GET_PROCUREMENTS_CREATE});
                onSuccess(res)
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        });
        
    }
}

export const C5_UpdateProcurementAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateProcurementService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:ProcurementsActionType.PACTH_PROCUREMENTS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export const C5_ConfirmProcurementAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    
    return async (dispatch:Dispatch)=>{
        await C5_ConfirmProcurementService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:ProcurementsActionType.PACTH_PROCUREMENTS_UPDATE,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export const C5_UpdateProcurementStatusAction = (id:string,data:any,onSuccess:(res:any)=>void,onError:(res:any)=>void) =>{
    return async (dispatch:Dispatch)=>{
        await C5_UpdateProcurementStatusService(id,data).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:ProcurementsActionType.PACTH_PROCUREMENTS_UPDATE_STATUS,res});
            onSuccess(res)
            }
        },
        error=>{
        dispatch({type:'CODE_ERROR',error});
        });
        }
}

export const C5_DeleteProcurementAction= (id:string,onSuccess:(res:any)=>void,onError:(res:any)=>void)=>{
    return (dispatch: Dispatch<AnyAction>)=>{
        C5_DeleteProcurementService(id).then((res)=>{
            if(res.statusCode){
                onError(res);
                return false
            }else{
            dispatch({type:ProcurementsActionType.DELETE_PROCUREMENT,res});
            onSuccess(res)
            }
        },
        error=>{
            console.log(error)
        dispatch({type:'CODE_ERROR',error});
        });
    
    }
}


//////////STATISTICS OF PROCUREMENTS //////////////
export  const  C5_getStatsProcurementsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getStatsProcurementsService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:ProcurementsActionType.GET_PROCUREMENT_GETSTATS,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export  const  C5_getStatfindLast7AllProcurementsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getStatfindLast7AllProcurementsService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:ProcurementsActionType.GET_PROCUREMENT_GETLAST7ALLSTATS,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}

export  const  C5_getStatfindLast6MonthAllProcurementsAction = (onSuccess:(res:any)=>void, onError:(res:any)=>void)=>{
    return (dispatch:Dispatch)=>{
        C5_getStatfindLast6MonthAllProcurementsService().then((res:any)=>{
            if(res.statusCode){
                  onError(res)
                 return false
            }else{
                dispatch({type:ProcurementsActionType.GET_PROCUREMENT_GETLAST6MONTHSTATS,res});
                onSuccess(res);
          }
    },
    error=>{
    dispatch({type:'CODE_ERROR',error});
    });
    }
}








