import { SearchVehicle } from '../../../Helpers/Dto/procurementModule';
import HttpService from '../../HttpService';


export const C5_getVehiclesService = ()=>{
    let Url :string = "vehicles";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchVehiclesService = (data:SearchVehicle)=>{
    let {value}=data;
    let Url :string = "vehicles?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateVehicleService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "vehicles/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateVehicleService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "vehicles/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}




export const C5_DeleteVehicleService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "vehicles/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}








//////// STATISTIC SECTION ////////////

export const C5_getStatsVehiclesService = ()=>{
    let Url :string = "vehicles/getStats";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



