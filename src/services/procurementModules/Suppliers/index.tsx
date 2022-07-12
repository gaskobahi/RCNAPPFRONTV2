import { SearchSupplier } from '../../../Helpers/Dto/procurementModule';
import HttpService from '../../HttpService';


export const C5_getSuppliersService = ()=>{
    let Url :string = "suppliers";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchSuppliersService = (data:SearchSupplier)=>{
    let {value}=data;
    let Url :string = "suppliers?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateSupplierService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "suppliers/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateSupplierService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "suppliers/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateSupplierStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "suppliers/upsupplierstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteSupplierService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "suppliers/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}




//////////MANAGERTOSUPPLIERSECTION ////////////



export const C5_getAllManagersbySupplierService = (supplierId:string)=>{
    let Url :string = "suppliers/findAllManagersbySupplier/"+supplierId;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


//////// STATISTIC SECTION ////////////

export const C5_getStatsSuppliersService = ()=>{
    let Url :string = "suppliers/getStats";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
