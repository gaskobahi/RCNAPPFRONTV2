import HttpService from '../../HttpService';
import FormData  from 'form-data';
import { SearchFtransfert } from '../../../Helpers/Dto/procurementModule';


export const C5_getFtransfertsService = ()=>{
    let Url :string = "ftransferts";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getFtransfertDetailService = (id:string)=>{
    let Url :string = "ftransferts/detail/"+id;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



export const C5_getSearchFtransfertsService = (data:SearchFtransfert)=>{
    let {startdate,enddate,value}=data
    let Url :string = "ftransferts?value="+value+"&startdate="+startdate+"&enddate="+enddate;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getPhotoService = (id:string)=>{
    let Url :string = "ftransferts/getPhoto/"+id;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_CreateFtransfertService = (data:any)=>{
const http = new HttpService();
let Url = "ftransferts/create";
return http.postDataMT(data,Url).then((data)=>{
        return data;
    }
    ).catch((error)=>{return error})
}

export const C5_UpdateFtransfertService = (id:string, data:any)=>{
    console.log(data)
    const http = new HttpService();
    let uri = "ftransferts/update";
    return http.patchDataByMT(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateFtransfertStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "ftransferts/upftransfertstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteFtransfertService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "ftransferts/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



