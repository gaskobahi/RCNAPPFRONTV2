import HttpService from '../../HttpService';


export const C5_getRolesService = ()=>{
    let Url :string = "roles";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchRolesService = (value:string)=>{
    let Url :string = "roles/search?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateRoleService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "roles/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateRoleService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "roles/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}


/*
export const C5_UpdateOperartorStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "roles/uprolestatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}
*/


export const C5_DeleteRoleService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "roles/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



