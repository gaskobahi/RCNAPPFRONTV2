import { SearchSupmanager } from '../../../Helpers/Dto/procurementModule';
import HttpService from '../../HttpService';


export const C5_getSupmanagersService = ()=>{
    let Url :string = "supmanagers";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchSupmanagersService = (data:SearchSupmanager)=>{
    let {value}=data;
    let Url :string = "supmanagers?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateSupmanagerService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "supmanagers/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateSupmanagerService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "supmanagers/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateSupmanagerStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "supmanagers/upsupmanagerstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteSupmanagerService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "supmanagers/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}





//////////MANAGERTOSUPPLIERSECTION ////////////




export const C5_AffectManagertoSupplierService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "supmanagers/affectmanagertosup";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_getAllSuppliersbyManagerService = (supmanagerId:string)=>{
    let Url :string = "supmanagers/findAllSuppliersbyManager/"+supmanagerId;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

export const C5_DeleteSuppliersbyManagerService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "supmanagers/deletemanagerTosup";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



/////////ENDMANAGERTOSUPPLIER SECTION /////////








//////// STATISTIC SECTION ////////////

export const C5_getStatsSupmanagersService = ()=>{
    let Url :string = "supmanagers/getStats";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}



