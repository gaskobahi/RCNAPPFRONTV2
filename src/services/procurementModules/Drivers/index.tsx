import { SearchDriver } from '../../../Helpers/Dto/procurementModule';
import HttpService from '../../HttpService';


export const C5_getDriversService = ()=>{
    let Url :string = "drivers";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchDriversService = (data:SearchDriver)=>{
    let {value}=data;
    let Url :string = "drivers?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateDriverService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "drivers/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateDriverService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "drivers/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateDriverStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "drivers/updriverstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteDriverService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "drivers/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}





//////// STATISTIC SECTION ////////////

export const C5_getStatsDriversService = ()=>{
    let Url :string = "drivers/getStats";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



