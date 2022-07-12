import { SearchStack } from '../../../Helpers/Dto/procurementModule';
import HttpService from '../../HttpService';


export const C5_getStacksService = ()=>{
    let Url :string = "stacks";
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchStacksService = (data:SearchStack)=>{
    let {value}=data;
    let Url :string = "stacks?value="+value;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}

export const C5_CreateStackService = (credentials: object)=>{
    const http = new HttpService();
    let Url = "stacks/create";
    return http.postData(credentials,Url).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateStackService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "stacks/update";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteStackService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "stacks/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}
