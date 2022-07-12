import { SearchVehiclebrand } from '../../../Helpers/Dto/procurementModule';
import HttpService from '../../HttpService';


export const C5_getVehiclebrandsService = ()=>{
    let Url :string = "vehiclebrands";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchVehiclebrandsService = (data:SearchVehiclebrand)=>{
    let {value}=data;
    let Url :string = "vehiclebrands?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateVehiclebrandService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "vehiclebrands/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateVehiclebrandService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "vehiclebrands/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}




export const C5_DeleteVehiclebrandService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "vehiclebrands/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}












//////// STATISTIC SECTION ////////////

export const C5_getStatsVehiclebrandsService = ()=>{
    let Url :string = "vehiclebrands/getStats";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



