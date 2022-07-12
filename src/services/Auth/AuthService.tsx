
import inMemoryJWT from '../../inMemoryJWT';
import { TYPERROR_FAILEDTOFETCH } from '../httpErrorMessage';
import HttpService, {URLREFRESH } from '../HttpService';



export const C5_LoginService = async(credentials:any)=>{
    const http = new HttpService();
    let loginUrl = "auth/login";
    return await http.postDatalogin(credentials,loginUrl).then((data)=>{
        return data;
    })
    .catch((error)=>{
        //if(error!=TYPERROR_FAILEDTOFETCH){
            return error
       // }
    })
}

export const C5_RefreshToken = async (refreshtoken:any)=>{
    let reftoken={refreshToken:refreshtoken}
    console.log(reftoken)
    const http = new HttpService();
    return await http.postData(reftoken,URLREFRESH).then((data)=>{
        return data;
    })
    .catch((error)=>{
        //if(error!=TYPERROR_FAILEDTOFETCH){
            return error
        //}  
    })
}


export const  C5_UserProfileService = ()=>{
    let signUpUrl :string = "auth/profile";
    const http = new HttpService();
    //alert(token)
    return http.getDataBy(signUpUrl).then((data)=>{
       return data;
    }).catch((error)=>{
        return error
    })
}

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

