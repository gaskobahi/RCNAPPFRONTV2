import HttpService from '../../HttpService';


export const C5_getDepartmentsService = ()=>{
    let Url :string = "departments";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchDepartmentsService = (value:string)=>{
    let Url :string = "departments/search?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateDepartmentService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "departments/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateDepartmentService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "departments/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteDepartmentService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "departments/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}
