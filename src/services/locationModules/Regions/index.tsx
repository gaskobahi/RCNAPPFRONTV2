import HttpService from '../../HttpService';
import { SearchRegion } from '../../../Helpers/Dto/locationModule';


export const C5_getRegionsService = ()=>{
    let Url :string = "regions";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



export const C5_getSearchRegionsService = (data:SearchRegion)=>{
    let {value}=data;
    let Url :string = "regions?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



export const C5_CreateRegionService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "regions/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateRegionService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "regions/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteRegionService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "regions/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}
