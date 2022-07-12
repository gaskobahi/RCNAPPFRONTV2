import HttpService from '../../HttpService';
import FormData  from 'form-data';
import { SearchTdechargment } from '../../../Helpers/Dto/procurementModule';


export const C5_getTdechargmentsService = ()=>{
    let Url :string = "tdechargments";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getTdechargmentsForverifcreateandupService = ()=>{
    let Url :string = "tdechargments/findall4verifcreateandup";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



export const C5_getTdechargmentDetailService = (id:string)=>{
    let Url :string = "tdechargments/detail/"+id;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchTdechargmentsService = (data:SearchTdechargment)=>{
    let {startdate,enddate,value}=data
    let Url :string = "tdechargments?value="+value+"&startdate="+startdate+"&enddate="+enddate;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getPhotoService = (id:string)=>{
    let Url :string = "tdechargments/getPhoto/"+id;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_CreateTdechargmentService = (data:any)=>{
const http = new HttpService();
let Url = "tdechargments/create";
return http.postDataMT(data,Url).then((data)=>{
        return data;
    }
    ).catch((error)=>{return error})
}

export const C5_UpdateTdechargmentService = (id:string, data:any)=>{
    console.log(data)
    const http = new HttpService();
    let uri = "tdechargments/update";
    return http.patchDataByMT(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateTdechargmentStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "tdechargments/uptdechargmentstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteTdechargmentService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "tdechargments/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



