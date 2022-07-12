import { Grid } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { number } from "yup";

  interface EnhancedMySmallBoxProps {
    mytitle: string;
    myvalue:any;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export  const MySmallBox=(props:EnhancedMySmallBoxProps)=> {
    let {mytitle,myvalue}=props
    let val:number=0
    val=myvalue!=''?myvalue:0
    return (
        <Grid item md={2} xs={6}  >
              <Item>
                <h5><b>{val }</b></h5>
                <p>{mytitle}</p>
              </Item>

        </Grid>  
      
    );
  }

  export  const MySmallBox2=(props:EnhancedMySmallBoxProps)=> {
    let {mytitle,myvalue}=props
    return (
      <Grid item md={12} xs={12} style={{margin:5}}>

     <Item>
            <h1><b>{myvalue}</b></h1>
            <p>{mytitle}</p>
    </Item>
    </Grid> 
    )

   
   


            
      
    
  }
