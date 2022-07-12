import HttpService from '../../HttpService';
import FormData  from 'form-data';
import { SearchRcncontrol } from '../../../Helpers/Dto/procurementModule';

export const C5_getRcncontrolsService = ()=>{
    let Url :string = "rcncontrols";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



export const C5_getSearchRcncontrolsService = (data:SearchRcncontrol)=>{
    let {startdate,enddate,value}=data
    let Url :string = "rcncontrols?value="+value+"&startdate="+startdate+"&enddate="+enddate;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getRcncontrolsForverifcreateandupService = ()=>{
    let Url :string = "rcncontrols/findall4verifcreateandup";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



export const C5_getPhotoService = (id:string)=>{
    let Url :string = "rcncontrols/getPhoto/"+id;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_CreateRcncontrolService = (data:any)=>{
const http = new HttpService();
let Url = "rcncontrols/create";
return http.postDataMT(data,Url).then((data)=>{
        return data;
    }
    ).catch((error)=>{return error})
}

export const C5_UpdateRcncontrolService = (id:string, data:any)=>{
    console.log(data)
    const http = new HttpService();
    let uri = "rcncontrols/update";
    return http.patchDataByMT(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateRcncontrolStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "rcncontrols/uprcncontrolstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteRcncontrolService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "rcncontrols/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



