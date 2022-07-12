import HttpService from '../../HttpService';
import FormData  from 'form-data';
import { SearchYieldinspection } from '../../../Helpers/Dto/procurementModule';


export const C5_getYieldinspectionsService =async  ()=>{
    let Url :string = "yieldinspections";
    const http = new HttpService();
    return await http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getYieldinspectionsForverifcreateandupService = async ()=>{
    let Url :string = "yieldinspections/findall4verifcreateandup";
    const http = new HttpService();
    return  await http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getSearchYieldinspectionsService = async (data:SearchYieldinspection)=>{
    let {startdate,enddate,value}=data
    let Url :string = "yieldinspections?value="+value+"&startdate="+startdate+"&enddate="+enddate;
    const http = new HttpService();
    return await http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_getPhotoService = (id:string)=>{
    let Url :string = "yieldinspections/getPhoto/"+id;
    const http = new HttpService();
    return http.getData(Url).then((data)=>{
        return data;
    }).catch((error)=>{
        return error
    })
}


export const C5_CreateYieldinspectionService = (data:any)=>{
const http = new HttpService();
let Url = "yieldinspections/create";
return http.postDataMT(data,Url).then((data)=>{
        return data;
    }
    ).catch((error)=>{return error})
}

export const C5_UpdateYieldinspectionService = (id:string, data:any)=>{
    console.log(data)
    const http = new HttpService();
    let uri = "yieldinspections/update";
    return http.patchDataByMT(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}

export const C5_UpdateYieldinspectionStatusService = (id:string, data:any)=>{
    const http = new HttpService();
    let uri = "yieldinspections/upyieldinspectionstatus";
    return http.patchDataBy(id,data,uri).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



export const C5_DeleteYieldinspectionService = (id:string)=>{
    const http = new HttpService();
    let deleteUrl = "yieldinspections/delete";
    return http.deleteData(id,deleteUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        return error
    })
}



