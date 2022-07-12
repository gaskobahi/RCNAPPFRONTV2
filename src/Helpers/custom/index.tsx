  
import CircularProgress from '@mui/material/CircularProgress';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';


export  function MyLoading() {
  const classes = useLoadingStyles();

  return (
        
          <div className={classes.container}>
           <CircularProgress />
         </div> 
  );
}

export  function NotFound() {
  const classes = useLoadingStyles();
  const message:string=" No information found";
  return (
        <Box sx={{ display: 'flex' }} height={40}  alignItems="center" justifyContent="center">
            {message}
        </Box>
   ) 
   
}

export  function NotAuthorizedPage() {
  const classes = useLoadingStyles();
  const message:string="You are not authorized on this page";
  return (
        <Box sx={{ display: 'flex' }} height={40}  alignItems="center" justifyContent="center">
          <h1>{message}</h1>
        </Box>
   ) 
}

const useLoadingStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
      paddingLeft: theme.spacing(90),
    }
    
  }),
);


export const openInNewTab = (data:any): void => {
  const link = document.createElement('a');
  let blob = new Blob([new Uint8Array(data)],{type:'application/pdf'})
  const url = window.URL.createObjectURL(blob);
  window.open(url);
}


export function isEmptyObj(obj:any) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop) && obj[prop]){
        return false;
      }
  }
  return true;
}

export function toMonthName(monthNumber:number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}



export function usePrevious(value:any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}