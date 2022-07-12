import jwt_decode from "jwt-decode";;
const ADDRESS="http://rcnapp.capro.local:3333";
//const ADDRESS="http://localhost:3333";


export const URLREFRESH='auth/refreshToken';
export const URLLOGIN="/login";
export const GLOBALTOKEN="token";
export const DELAYREFRESHTOKEN:number=5*1000; //3minutes;

export default class HttpService{
    url =ADDRESS+"/api";
    STOKEN:any=localStorage.getItem(GLOBALTOKEN);
    TOKEN:any= JSON.parse(this.STOKEN);
        
    postDatalogin = async(item:any,added_url:any)=>{
        const requestOptions = this.postRequestOptionsWithoutToken(item);
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
            response.json()
        )
    }

    getDataBy=async(added_url:string)=>{
        const token=this.TOKEN.accessToken
        const dcodtoken:any = jwt_decode(token);
        let {sub}=dcodtoken;
        const requestOptions=this.getRequestOptions(token);
        const added_urlId=added_url+"/"+sub;
        return fetch(this.url+"/"+added_urlId,requestOptions).then(response=>
            response.json()
         )
    }


    putDataBy = async(id:string,item:object,added_url:string)=>{
        const token=this.TOKEN.accessToken
        const requestOptions = this.putRequestOptions(token,item);
        return fetch(this.url+"/"+added_url+"/"+id,requestOptions).then(response=>response.json())  
    }

    patchDataBy = async(id:string,item:object,added_url:string)=>{
        const token=this.TOKEN.accessToken
        const requestOptions = this.patchRequestOptions(token,item);
        return fetch(this.url+"/"+added_url+"/"+id,requestOptions).then(response=>response.json())  
    }

    patchDataByMT = async(id:string,item:object,added_url:string)=>{
        const token=this.TOKEN.accessToken
        const requestOptions = this.patchRequestOptionsMT(token,item);
        return fetch(this.url+"/"+added_url+"/"+id,requestOptions).then(response=>response.json())  
    }

   

    getData=async(added_url:string)=>{
        const token=this.TOKEN.accessToken
        const requestOptions=this.getRequestOptions(token);
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
            response.json() 
         )
    }

    postData = async(item:object,added_url:string)=>{
        const token=this.TOKEN.accessToken;
        console.log("token vision")
        console.log(token)

        const requestOptions = this.postRequestOptions(token,item);
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
              response.json()
              )
    }

    postDataWithoutToken = async(item:object,added_url:string)=>{
        const requestOptions = this.postRequestOptionsWithoutToken(item);
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
              response.json()
              )
    }

    postDataMT = async(item:object,added_url:string)=>{
        const token=this.TOKEN.accessToken;
        const requestOptions = this.postRequestOptionsMT(token,item);
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
              response.json()
              )
    }

    deleteData = async(id:string,added_url:string)=>{
        const token=this.TOKEN.accessToken
        const requestOptions = this.deleteRequestOptions(token);
        return fetch(this.url+"/"+added_url+"/"+id,requestOptions).then(response=>
              response.json()
              )

           
    }



   /* 
     

    
    postDataArticle = async(item,added_url,tokenId="")=>{
        const token = await sessionStorage.getItem(tokenId);
        const requestOptions = this.postArticleRequestOptions(token,item);
        return axios(this.url+"/"+added_url,requestOptions)
        .then((response)=>{
            return response.data;
        }
        ).catch((error)=>{
             return error;
       });
    }

    deleteData = async(added_url)=>{
        let tokenId = this.TOKEN.accessToken;
        const token = await sessionStorage.getItem(tokenId);
        const requestOptions = this.deleteRequestOptions(token);
        //console.log(requestOptions)
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
              response.json()
              )

           
    }

    deleteDatawithBody = async(added_url,credentials)=>{
        let tokenId = this.TOKEN.accessToken;
        const token = await sessionStorage.getItem(tokenId);
        const requestOptions = this.deleteRequestOptionsWithBody(token,credentials);
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
              response.json()
              )

           
    }

    
    postDataBy = async(item,added_url,Id="",tokenId="")=>{
        const token = await sessionStorage.getItem(tokenId);
        const ownerid = await sessionStorage.getItem(Id);
        const requestOptions = this.postRequestOptions(token,item);
        return fetch(this.url+"/"+added_url+"/"+ownerid,requestOptions).then(response=>
              response.json()
              )

           
    }

   //for all
    putDataBy = async(item,added_url,Id="")=>{
        let tokenId = this.TOKEN.accessToken;
        const token = await sessionStorage.getItem(tokenId);
        const requestOptions = this.putRequestOptions(token,item);
        return fetch(this.url+"/"+added_url+"/"+Id,requestOptions).then(response=>
              response.json()
              )  
    }

    //////////for user
    putData = async(item,added_url)=>{
        let tokenId = this.TOKEN.accessToken;
        const token = await sessionStorage.getItem(tokenId);
        const dcodtoken = jwt_decode(token);
        let {id}=dcodtoken.aud[0];
        const requestOptions = this.putRequestOptions(token,item);
        return fetch(this.url+"/"+added_url+"/"+id,requestOptions).then(response=>
              response.json()
              )  
    }

    putDatawithoutId = async(item,added_url)=>{
        let tokenId = this.TOKEN.accessToken;
        const token = await sessionStorage.getItem(tokenId);
        const requestOptions = this.putRequestOptions(token,item);
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
              response.json()
              )  
    }

    putManagerData = async(item,added_url,tokenId="")=>{
        const token = await sessionStorage.getItem(tokenId);
        const requestOptions = this.putRequestOptions(token,item);
        return fetch(this.url+"/"+added_url,requestOptions).then(response=>
              response.json()
              )  
    }
    

    
    

    getDataBy=async(added_url)=>{
        let tokenId = this.TOKEN.accessToken;
        const token = await sessionStorage.getItem(tokenId);
        const dcodtoken = jwt_decode(token);
        let {id}=dcodtoken.aud[0];
        const requestOptions=this.getRequestOptions(token);
        const added_urlId=added_url+"/"+id;
        return fetch(this.url+"/"+added_urlId,requestOptions).then(response=>
            response.json()
         )
    }

*/


/*
    getRequestOptions=(token)=>{
        let requestOptions={
            method:'GET',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json'
            }
        }
        return requestOptions;
    }

    getRequestOptionsCompanyWithApiKey=(Api_Key)=>{
        let requestOptions={
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'Authorization':Api_Key,
            }
        }
        return requestOptions;
    }

    putWithApikeyRequestOptions=(Api_Key,item)=>{
        let requestOptions={
            method:'PUT',
            headers:{
                'Authorization':Api_Key,
                'Content-type':'application/json',
                 },
            body:JSON.stringify(item)
        }
        return requestOptions;
    }
*/


    postRequestOptionsWithoutToken=(item:any)=>{
        let requestOptions={
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(item)
        }
        return requestOptions;
    }

    getRequestOptions=(token:any)=>{
        let requestOptions={
            method:'GET',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json'
            }
        }
        return requestOptions;
    }

    putRequestOptions=(token:any,item:object)=>{
        let requestOptions={
            method:'PUT',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json',
                //'Access-Control-Allow-Origin':'*',
                //"Access-Control-Allow-Methods": "OPTIONS,POST,GET",  
            },
            body:JSON.stringify(item)
        }
        return requestOptions;
    }

    
    patchRequestOptions=(token:any,item:object)=>{
        let requestOptions={
            method:'PATCH',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json',
                //'Access-Control-Allow-Origin':'*',
                //"Access-Control-Allow-Methods": "OPTIONS,POST,GET",  
            },
            body:JSON.stringify(item)
        }
        return requestOptions;
    }


    postRequestOptions=(token:any,item:object)=>{
        let requestOptions={
            method:'POST',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json',
            },
            body:JSON.stringify(item)
        }
        return requestOptions;
    }

    postRequestOptionsMT=(token:any,item:any)=>{
        let requestOptions={
            method:'POST',
            headers:{
                'Authorization':'Bearer '+token,
            },
            body:item
        }
        console.log("requestOptionsll")
        console.log(requestOptions)
        return requestOptions;
    }

    deleteRequestOptions=(token:any)=>{
        let requestOptions={
            method:'DELETE',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json', 
            }
        }
        return requestOptions;
    }

    patchRequestOptionsMT=(token:any,item:any)=>{
        let requestOptions={
          method:'PATCH',
          headers:{
              'Authorization':'Bearer '+token,
          },
          body:item
      }
      return requestOptions;
  }

/*
    

    
    postArticleRequestOptions=(token,item)=>{
        let requestOptions={
            method:'POST',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'multipart/form-data'
            },
            data:item
        }
        return requestOptions;
    }

   
    
   

    deleteRequestOptionsWithBody=(token,item)=>{
        let requestOptions={
            method:'DELETE',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json',
              },
              body:JSON.stringify(item)
           }
        return requestOptions;
    }
*/


 /*{
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify(item)
    }*/
    
   


}