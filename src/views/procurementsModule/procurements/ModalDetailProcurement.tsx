import * as React from 'react';
import { useEffect, useState } from "react";
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';


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
import { C5_getTdechargmentsPhotoAction } from '../../../redux/actions/ProcurementsModule/tdechargments';
import { toast } from 'react-toastify';
import { openInNewTab } from '../../../Helpers/custom';
import { Link } from '@mui/material';
import {C5_getRcncontrolPhotoAction } from '../../../redux/actions/ProcurementsModule/rcncontrols';
import { C5_getYieldinspectionPhotoAction } from '../../../redux/actions/ProcurementsModule/yieldinspections';
import { C5_getPhotoAction } from '../../../redux/actions/ProcurementsModule/ftransferts';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import CAN from '../../../Ability/can';
import { C5_getProcurementDetailAction } from '../../../redux/actions/ProcurementsModule/procurements';
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
  
  getProcurementDetailAction:(id:string,res:any,res1:any)=>void;   
  getTDechargmentPhotoAction:(id:string,res:any,res1:any)=>void;   
  getRcncontrolPhotoAction:(id:string,res:any,res1:any)=>void;  
  getYieldinspectionPhotoAction:(id:string,res:any,res1:any)=>void;  
  getFtransfertPhotoAction:(id:string,res:any,res1:any)=>void;  
  openModal:any;
  _closeDetailProcurementModal:any;
  getDetailprocurement:any
  prmId:string
}
 

const  ModalDetailProcurement=(props:ActionProps)=> {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [myloading, setMyLoading] = React.useState(false);
  const procurement = props.getDetailprocurement;
  const prmId=props?.prmId

const  closeModal=()=> {
    props._closeDetailProcurementModal()   
  }

  const onSuccess=(res:any)=>{
    console.log(res)  
    setTimeout(()=>{ setMyLoading(true) },50)
  }
  const onError=(res:any)=>{
    console.log(res)  
     //setMyLoading(true)
  }
    
const  _dowloadTDechargmentPhoto=(id:string)=>()=> {
    const ongetPhotoSuccess=(res:any)=>{
      openInNewTab(res.data)
      }
    const ongetPhotoError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    }
     props.getTDechargmentPhotoAction(id,ongetPhotoSuccess,ongetPhotoError)
  }

const  _dowloadRcncontrolPhoto=(id:string)=>()=> {
  const ongetPhotoSuccess=(res:any)=>{
    openInNewTab(res.data)
    }
  const ongetPhotoError=(res:any)=>{
    toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
  }
    props.getRcncontrolPhotoAction(id,ongetPhotoSuccess,ongetPhotoError)
}

const  _dowloadYieldinspectionPhoto=(id:string)=>()=> {
  const ongetPhotoSuccess=(res:any)=>{
    openInNewTab(res.data)
    }
  const ongetPhotoError=(res:any)=>{
    toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
  }
    props.getYieldinspectionPhotoAction(id,ongetPhotoSuccess,ongetPhotoError)
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
    props.getProcurementDetailAction(prmId,onSuccess,onError)
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
              <CardHeader  subheader="" title= {"Detail Procurement: "+procurement?.stack_code +" - "+procurement?.placeName+" - "+ moment(procurement?.date).format("DD/MM/YYYY HH:mm")}/>
              <Divider/>
                <Box sx={{flex:1,  flexDirection:'row',alignSelf:'flex-start'}}>
                  <Box sx={{display: 'flex',flexDirection:'row', alignSelf:'flex-start'}} style={{background:'#d8b91a',padding:10}}>
                      {procurement.ftransfertCode?
                            <Item style={{margin:4}}><b>File Transfert N° :</b>
                              {CAN(UserAction.Read,EntityUSERMODAbilty.FTRANSFERTS) ?
                                    <Link onClick={_dowloadFtransfertPhoto(procurement?.ftransfertId)}>{procurement?.ftransfertCode +' ('+procurement?.ftransfertType+')'}</Link>
                                    :procurement?.ftransfertCode
                              }  
                            </Item>
                      :''}
                      {procurement.tdechargmentCode?
                            <Item style={{margin:4}}><b>Ticket N° : </b>
                            {CAN(UserAction.Read,EntityUSERMODAbilty.TDECHARGMENTS) ?
                                  <Link onClick={_dowloadTDechargmentPhoto(procurement.tdechargmentId)}>{procurement?.tdechargmentCode}</Link>
                                  :procurement?.tdechargmentCode
                            }  
                            </Item>
                        :''}
                      {procurement.rcncontrolCode?
                      <Item style={{margin:4}}><b>RCN Control N° : </b>
                        {CAN(UserAction.Read,EntityUSERMODAbilty.RCNCONTROLS) ?
                            <Link onClick={_dowloadRcncontrolPhoto(procurement.rcncontrolId)}>{procurement?.rcncontrolCode}</Link>
                            :procurement?.rcncontrolCode
                        }
                      </Item>
                      :''}
                      {procurement.yieldinspectionCode?
                      <Item style={{margin:4}}><b>Yield Inspection N° : </b>
                          {CAN(UserAction.Read,EntityUSERMODAbilty.YIELDINSPECTIONS) ?
                            <Link onClick={_dowloadYieldinspectionPhoto(procurement.yieldinspectionId)}>{procurement?.yieldinspectionCode}</Link>
                          :procurement.yieldinspectionCode}
                        </Item>
                      :''}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                  <Box sx={{flex:1,alignSelf:'flex-end' }}>
                    <Item><b> 1/2IMM+SPOT : </b>{procurement?.halfmmspot}(g)</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-end' }}>
                    <Item><b> GK : </b>{procurement?.gk}(g)</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-end' }}>
                    <Item><b> OUTTURN : </b>{procurement?.outturn.toFixed(2)} (LBS)</Item>
                  </Box>
                </Box>
                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>RECEIVED DETAILS</b></Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                    <Item><b>BAGS : </b>{procurement?.bags}</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                  <Item><b> NET WEIGHT  : </b>{procurement?.recnetwt} (Kg) </Item>
                  </Box>
                </Box>
                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>CUTTING TEST QLTY REPORT</b></Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                    <Item><b>MOISTURE : </b>{procurement?.moisture.toFixed(1)}%</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                  <Item><b> NC : </b>{procurement?.nc.toFixed(0)}</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                  <Item><b> BROWNS : </b>{procurement?.browns.toFixed(1)}%</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                  <Item><b> VOIDS : </b>{procurement?.voids.toFixed(1)}%</Item>
                  </Box>
                </Box>
                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>IMMATURE</b></Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                    <Item><b>IMMATURE : </b>{procurement?.immature.toFixed(1)}%</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                  <Item><b> IMMATURE KERNEL : </b>{procurement?.imkernels.toFixed(0)}</Item>
                  </Box>
                </Box>
                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>SPOTTED</b></Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                    <Item><b>SPOTTED : </b>{procurement?.spotted.toFixed(1)}%</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                  <Item><b> SPOTTED KERNEL : </b>{procurement?.sptkernels.toFixed(0)}</Item>
                  </Box>
                </Box>
                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>OTHERS</b></Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Supplier : </b>{procurement?.supplier}</Item>
                            </Box>
                           
                  </Box> 
                {procurement.user_createdBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Created By : </b>{procurement?.user_createdBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Created At : </b>{moment(procurement?.createdAt).format("DD/MM/YYYY HH:mm")}</Item>
                            </Box>
                  </Box> 
                :''}
                {procurement.user_updatedBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Updated By : </b>{procurement?.user_updatedBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Updated At : </b>{moment(procurement?.updatedAt).format("DD/MM/YYYY HH:mm")}</Item>
                            </Box>
                  </Box> 
                :''}
                {procurement.user_confirmedBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Confirmed By : </b>{procurement?.user_confirmedBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Confirmed At : </b>{moment(procurement?.confirmedAt).format("DD/MM/YYYY HH:mm")}</Item>
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
  procurements: { getDetailprocurement: any; };
}

const mapStateToProps = (state:StateProps) => {
 const { getDetailprocurement } = state.procurements;
  return {getDetailprocurement}
};
const mapDispatchToProps =(dispatch:any) => {
    return {
        getProcurementDetailAction: (id:any,onSuccess:any,onError:any)=> dispatch(C5_getProcurementDetailAction(id,onSuccess,onError)),
        getTDechargmentPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentsPhotoAction(id,onSuccess,onError)),
        getRcncontrolPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getRcncontrolPhotoAction(id,onSuccess,onError)),
        getYieldinspectionPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getYieldinspectionPhotoAction(id,onSuccess,onError)),
        getFtransfertPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getPhotoAction(id,onSuccess,onError)),



      }
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalDetailProcurement);
