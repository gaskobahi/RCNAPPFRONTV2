import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

 export function loadTree() {
    const $ =(window as any).$;
    const trees :any = $('[data-widget="treeview"]');
    trees.Treeview('init');
  }

  
  export function reloadPage() {
    const $ =(window as any).$;
    let isreload:boolean=false;
    setInterval(() => {
      document.location.reload();
    },3000);

  /*  const timedRefresh=(timeoutPeriod:number)=>{
       setTimeout(() => {
              $.location.reload();
          },timeoutPeriod);
      
     }*/
  //   $.onload =timedRefresh(1000);
    /* if(!isreload){
      let id = setTimeout(() => {
        document.location.reload();
       },2000);
       isreload=true
       window.clearTimeout(id)
     }*/
       
   
  }


export  enum TYPESUPPLIER{
  INDIVIDUAL ="INDIVIDUAL",
  COOPERATIVE ="COOPERATIVE",
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const emailRegExp=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const  regexCoords = /^([+-]?\d+\.?\d+)\s*,\s*([+-]?\d+\.?\d+)$/


  
export  function IsActive() {
  return (
    <Stack alignItems='center' spacing={1}>
      <Chip label="Yes" color="success" size="small"  />
    </Stack>
  );
}
export  function IsNotActive() {
  return (
    <Stack  alignItems='center'  spacing={1}>
      <Chip label="No" color="default" size="small" />
    </Stack>
  );
}
export  function IsAccepted(value:any) {
  return (
    <Stack  spacing={1}  alignItems='center'>
      <Chip label={value} color="success" size="small"  />
    </Stack>
  );
}

export  function CountValue(value:any) {
    return (
      <Stack  spacing={1}  alignItems='center'>
        <Chip label={value} color="success" size="small"  />
      </Stack>
    );
  }

export  function IsNotAccepted(value:any) {
  return (
    <Stack alignItems='center' spacing={1}>
      <Chip label={value} color="default" size="small"  />
    </Stack>
  );
}



  
/*export  function IsConfirmed(value:boolean) {
  return (
    <Stack  spacing={1} alignItems='center'>
         {value?<Chip label="Yes" color="success" size="small"/>:<Chip label="No" color="warning" size="small"/>}
    </Stack>
  );
}*/


export  function IsConfirmed(value:boolean) {
  return (
    <span style={{alignContent:"center"}}>
         {value?<Chip label="Approved" style={{color: "green"}} size="small"/>:<Chip label="Pending" style={{color: "goldenrod"}} size="small"/>}
    </span>
  );
}




