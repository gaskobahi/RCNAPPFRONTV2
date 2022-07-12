import { SearchCarrier } from '../../../Helpers/Dto/procurementModule';
import HttpService from '../../HttpService';


export const C5_getCarriersService = ()=>{
    let Url :string = "carriers";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchCarriersService = (data:SearchCarrier)=>{
    let {value}=data;
    let Url :string = "carriers?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateCarrierService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "carriers/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateCarrierService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "carriers/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateCarrierStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "carriers/upcarrierstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteCarrierService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "carriers/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}





//////// STATISTIC SECTION ////////////

export const C5_getStatsCarriersService = ()=>{
    let Url :string = "carriers/getStats";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



