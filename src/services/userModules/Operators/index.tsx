import HttpService from '../../HttpService';


export const C5_getOperatorsService = ()=>{
    let Url :string = "operators";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

export const C5_getSearchOperatorsService = (value:string)=>{
    let Url :string = "operators/search?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateOperatorService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "operators/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateOperatorService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "operators/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_UpdateOperartorStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "operators/upoperatorstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteOperatorService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "operators/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



