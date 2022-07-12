import * as React from 'react';
import { useEffect, useState } from "react";


import {
  Container,
  makeStyles,
  Modal,
  Card,
  Grid,
  Divider,
  CardContent,
  CardHeader,
  TextField,
} from "@material-ui/core";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import  moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { openInNewTab } from '../../../Helpers/custom';
import { Link } from '@mui/material';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import CAN from '../../../Ability/can';
import { C5_getFtransfertDetailAction, C5_getPhotoAction } from '../../../redux/actions/ProcurementsModule/ftransferts';
import MyLoadingPinner from '../../../components/Loading';



const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    width: 400,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 
interface ActionProps {
  
  getFtransfertDetailAction:(id:string,res:any,res1:any)=>void;   
  getFtransfertPhotoAction:(id:string,res:any,res1:any)=>void;  
  openModal:any;
  _closeDetailFtransfertModal:any;
  getDetailftransfert:any
  ftrId:string
}
 

const  ModalDetailFtransfert=(props:ActionProps)=> {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [myloading, setMyLoading] = React.useState(false);
  const ftransfert = props.getDetailftransfert;
  const ftrId=props?.ftrId

const  closeModal=()=> {
    props._closeDetailFtransfertModal()   
  }

  const onSuccess=(res:any)=>{
    console.log(res)  
    setTimeout(()=>{ setMyLoading(true) },50)
  }
  const onError=(res:any)=>{
    console.log(res)  
     //setMyLoading(true)
  }
    

  const  _dowloadFtransfertPhoto=(id:string)=>()=> {
    const ongetPhotoSuccess=(res:any)=>{
      openInNewTab(res.data)
      }
    const ongetPhotoError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    }
      props.getFtransfertPhotoAction(id,ongetPhotoSuccess,ongetPhotoError)
  }

  
  useEffect(() => {
    props.getFtransfertDetailAction(ftrId,onSuccess,onError)
  }, []);


  return (
    
      <Modal
        open={props.openModal}
        onClose={closeModal}
      >
         <Container fixed maxWidth="lg">
          {myloading?
            <>
              <Card>
              <CardHeader  subheader="" title= {"Detail File Transfert: "+ftransfert?.code +" - "+ftransfert?.place +" - "+ftransfert?.region +" - "+moment(ftransfert?.date).format("DD/MM/YYYY HH:mm")}/>
              <Divider/>
                <Box sx={{flex:1,  flexDirection:'row',alignSelf:'flex-start'}}>
                  <Box sx={{display: 'flex',flexDirection:'row', alignSelf:'flex-start'}} style={{background:'#d8b91a',padding:10,marginBottom:2}}>
                          {ftransfert.code?
                                    <Item style={{margin:4}}><b>File Transfert N° :</b>
                                      {CAN(UserAction.Read,EntityUSERMODAbilty.FTRANSFERTS) ?
                                            <Link onClick={_dowloadFtransfertPhoto(ftransfert?.id)}>{ftransfert?.code}</Link>
                                            :ftransfert?.code
                                      }  
                                    </Item>
                              :''}
                            <Item style={{margin:4}}><b>Sticker N° : </b>{ftransfert?.stickerno}</Item>
                            <Item style={{margin:4}}><b>Type : </b>{ftransfert?.type}</Item>
                            <Item style={{margin:4}}><b>Status : </b>{ftransfert.isaccepted?"Accepted":"Rejected"}</Item>
                  </Box>
                </Box>
                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>SUPPLIER</b></Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                
                <Box sx={{flex:1,alignSelf:'flex-start' }}>
                    <Item><b>Code : </b>{ftransfert?.supplierCode}</Item>
                  </Box>
                <Box sx={{flex:1,alignSelf:'flex-start' }}>
                    <Item><b>Name : </b>{ftransfert?.supplierName}</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                    <Item><b>Phone : </b>{ftransfert?.supplierPhone}</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                  <Item><b> Type : </b>{ftransfert?.supplierType}</Item>
                  </Box>
                </Box>
                {ftransfert.carrier?
                 <>
                    <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                      <Item style={{background:'#d8b91a'}}><b>CARRIER</b></Item>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item>{ftransfert?.carrier}</Item>
                      </Box>
                    </Box>
                </>:""}
                {ftransfert.driver || ftransfert.trailerRegistNumber || ftransfert.vehicleRegistNumber?
                 <>
                    <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                      <Item style={{background:'#d8b91a'}}><b>DRIVER , TRAILER AND VEHICLE</b></Item>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item><b>Driver : </b> {ftransfert?.driver}</Item>
                      </Box>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item><b>Trailer N° : </b> {ftransfert?.trailerRegistNumber}</Item>
                      </Box>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item><b>Vehicle N° : </b> {ftransfert?.vehicleRegistNumber}</Item>
                      </Box>
                    </Box>
                </>:""}
               
                {ftransfert.manager?
                 <>
                    <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start' }}>
                      <Item style={{background:'#d8b91a'}}><b>MANAGER</b></Item>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item>{ftransfert?.manager}</Item>
                      </Box>
                    </Box>
                </>:""}

                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>OTHERS</b></Item>
                </Box>
               
                {ftransfert.user_createdBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Created By : </b>{ftransfert?.user_createdBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Created At : </b>{moment(ftransfert?.createdAt).format("DD/MM/YYYY HH:mm")}</Item>
                            </Box>
                  </Box> 
                :''}
                {ftransfert.user_updatedBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Updated By : </b>{ftransfert?.user_updatedBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Updated At : </b>{moment(ftransfert?.updatedAt).format("DD/MM/YYYY HH:mm")}</Item>
                            </Box>
                  </Box> 
                :''}
                {ftransfert.user_confirmedBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Confirmed By : </b>{ftransfert?.user_confirmedBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Confirmed At : </b>{moment(ftransfert?.confirmedAt).format("DD/MM/YYYY HH:mm")}</Item>
                            </Box>
                  </Box> 
                :''}
              </Card>
            </>
          : <MyLoadingPinner/>
          }
       
        </Container>
      </Modal>
     
    
  );
}



 interface StateProps {
  ftransferts: { getDetailftransfert: any; };
}

const mapStateToProps = (state:StateProps) => {
 const { getDetailftransfert } = state.ftransferts;
  return {getDetailftransfert}
};
const mapDispatchToProps =(dispatch:any) => {
    return {
        getFtransfertDetailAction: (id:any,onSuccess:any,onError:any)=> dispatch(C5_getFtransfertDetailAction(id,onSuccess,onError)),
        getFtransfertPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getPhotoAction(id,onSuccess,onError)),

      }
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalDetailFtransfert);
