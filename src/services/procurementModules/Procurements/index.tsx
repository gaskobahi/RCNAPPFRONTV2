import HttpService from '../../HttpService';
import FormData  from 'form-data';
import { SearchProcurement, SummeryProcurement } from '../../../Helpers/Dto/procurementModule';


export const C5_getProcurementsService = ()=>{
    let Url :string = "procurements";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}




export const C5_getProcurementDetailService = (id:string)=>{
    let Url :string = "procurements/detail/"+id;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

export const C5_getSearchProcurementsService = (data:SearchProcurement)=>{
    let Url :string = "procurements?startdate="+data.startdate+"&enddate="+data.enddate+
    "&stackCode="+data.stackCode+"&tdechargmentCode="+data.tdechargmentCode+
    "&ftransfertCode="+data.ftransfertCode+"&isConfirmed="+data.isConfirmed+
    "&ftransfertType="+data.ftransfertType;
    
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getExportToExcelProcurementsService = (data:SearchProcurement)=>{
    let Url :string = "procurements/exportToExcel?startdate="+data.startdate+"&enddate="+data.enddate+
    "&stackCode="+data.stackCode+"&tdechargmentCode="+data.tdechargmentCode+
    "&ftransfertCode="+data.ftransfertCode+"&isConfirmed="+data.isConfirmed+
    "&ftransfertType="+data.ftransfertType;
    
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

export const C5_getProcurementsForverifcreateandupService = ()=>{
    let Url :string = "procurements/findall4verifcreateandup";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}




export const C5_getSummeryProcurementsService = (data:SummeryProcurement)=>{
    let Url :string="procurements/summery?startdate="+data.startdate+"&enddate="+data.enddate;;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

/*
export const C5_PostSearchProcurementsService = (data:SearchProcurement)=>{
    const http = new HttpService();
    let Url = "procurements/search";
    return http.postData(data,Url).then((data)=>{
            return data;
        }
        ).catch((error)=>{return error})
    }
*/

export const C5_getPhotoService = (id:string)=>{
    let Url :string = "procurements/getPhoto/"+id;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_CreateProcurementService = (data:any)=>{
const http = new HttpService();
let Url = "procurements/create";
return http.postData(data,Url).then((data)=>{
        return data;
    }
    ).catch((error)=>{return error})
}

export const C5_UpdateProcurementService = (id:string, data:any)=>{
    console.log(data)
    const http = new HttpService();
    let uri = "procurements/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateProcurementStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "procurements/upprocurementstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_ConfirmProcurementService = (id:string,data:any)=>{
    const http = new HttpService();
    let uri = "procurements/confirm";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}




export const C5_DeleteProcurementService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "procurements/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



//////// STATISTIC SECTION ////////////

export const C5_getStatsProcurementsService = ()=>{
    let Url :string = "procurements/getStats";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_getStatfindLast7AllProcurementsService = ()=>{
    let Url :string = "procurements/getStatfindLast7All";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

export const C5_getStatfindLast6MonthAllProcurementsService = ()=>{
    let Url :string = "procurements/getStatfindLast6MonthAll";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



