import { SearchTrailer } from '../../../Helpers/Dto/procurementModule';
import HttpService from '../../HttpService';


export const C5_getTrailersService = ()=>{
    let Url :string = "trailers";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchTrailersService = (data:SearchTrailer)=>{
    let {value}=data;
    let Url :string = "trailers?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateTrailerService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "trailers/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateTrailerService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "trailers/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}




export const C5_DeleteTrailerService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "trailers/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}








//////// STATISTIC SECTION ////////////

export const C5_getStatsTrailersService = ()=>{
    let Url :string = "trailers/getStats";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



