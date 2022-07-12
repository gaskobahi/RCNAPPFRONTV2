import HttpService from '../../HttpService';


export const C5_getUsersService = ()=>{
    let Url :string = "users";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

export const C5_getSearchUsersService = (value:string)=>{
    let Url :string = "users/search?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_CreateUserService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "users/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateUserService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "users/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_ResetUserPasswordService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "users/resetpasword";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UserSettingsService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "users/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}


export const C5_DeleteUserService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "users/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



/*
export const C5_UpdateMyProfileService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "auth/updatemyprofile";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}


export const C5_ChangeMyPasswordService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "auth/changemypassword";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}
*/

/*
export const C5_ChgMyPasswordService = (credentials)=>{
    let chgmypasswordUrl = "users/changemypassword";
    const http = new HttpService();
    return http.putData(credentials,chgmypasswordUrl).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_GetUsersService = ()=>{
    let signUpUrl = "users";
    const http = new HttpService();
    return http.getData(signUpUrl).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}
export const C5_ChgUserStatusService = (credentials)=>{
     let id=credentials.id;
    const http = new HttpService();
    let signUpUrl = "users/changeuserstatus";
    return http.putDataBy(credentials,signUpUrl,id).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}




export const C5_DeleteUserService = (data)=>{
    let {id}=data;
    const http = new HttpService();
    let deleteUrl = "users/delete/"+id;
  
    return http.deleteData(deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_SearchUserService = (value)=>{
    let signUpUrl = "users/search/?value="+value;
    const http = new HttpService();
    return http.getData(signUpUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}
*/