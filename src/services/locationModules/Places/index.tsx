import { SearchPlace } from '../../../Helpers/Dto/locationModule';
import HttpService from '../../HttpService';


export const C5_getPlacesService = ()=>{
    let Url :string = "places";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



export const C5_getSearchPlacesService = (data:SearchPlace)=>{
    let {value}=data;
    let Url :string = "places?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

export const C5_CreatePlaceService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "places/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdatePlaceService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "places/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeletePlaceService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "places/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



