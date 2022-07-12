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
import { C5_getTdechargmentDetailAction, C5_getTdechargmentsPhotoAction } from '../../../redux/actions/ProcurementsModule/tdechargments';
import MyLoadingPinner from '../../../components/Loading';
import { C5_getPhotoAction } from '../../../redux/actions/ProcurementsModule/ftransferts';



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
  
  getTdechargmentDetailAction:(id:string,res:any,res1:any)=>void;   
  getTdechargmentPhotoAction:(id:string,res:any,res1:any)=>void;  
  getFtransfertPhotoAction:(id:string,res:any,res1:any)=>void;  
  openModal:any;
  _closeDetailTdechargmentModal:any;
  getDetailtdechargment:any
  tdchm:string
}
 

const  ModalDetailTdechargment=(props:ActionProps)=> {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [myloading, setMyLoading] = React.useState(false);
  const tdechargment = props.getDetailtdechargment;
  const tdchm=props?.tdchm

const  closeModal=()=> {
    props._closeDetailTdechargmentModal()   
  }

  const onSuccess=(res:any)=>{
    console.log(res)  
    setTimeout(()=>{ setMyLoading(true) },50)
  }
  const onError=(res:any)=>{
    console.log(res)  
     //setMyLoading(true)
  }
    

  const  _dowloadTdechargmentPhoto=(id:string)=>()=> {
    const ongetPhotoSuccess=(res:any)=>{
      openInNewTab(res.data)
      }
    const ongetPhotoError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    }
      props.getTdechargmentPhotoAction(id,ongetPhotoSuccess,ongetPhotoError)
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
    props.getTdechargmentDetailAction(tdchm,onSuccess,onError)
  }, []);

console.log("tdechargment2020")
console.log(tdechargment)

  return (
    
      <Modal
        open={props.openModal}
        onClose={closeModal}
      >
         <Container fixed maxWidth="lg">
          {myloading?
            <>
              <Card>
              <CardHeader  subheader="" title= {"Detail Ticket Dechargment: "+tdechargment.code +" - "+tdechargment?.place +" - "+tdechargment?.region +" - "+moment(tdechargment?.date).format("DD/MM/YYYY HH:mm")}/>
              <Divider/>
                <Box sx={{flex:1,  flexDirection:'row',alignSelf:'flex-start'}}>
                  <Box sx={{display: 'flex',flexDirection:'row', alignSelf:'flex-start'}} style={{background:'#d8b91a',padding:10,marginBottom:2}}>
                      {tdechargment.code?
                                <Item style={{margin:4}}><b>Ticket N° :</b>
                                  {CAN(UserAction.Read,EntityUSERMODAbilty.TDECHARGMENTS) ?
                                        <Link onClick={_dowloadTdechargmentPhoto(tdechargment?.id)}>{tdechargment?.code}</Link>
                                        :tdechargment?.code
                                  }  
                                </Item>
                          :''}
                        <Item style={{margin:4}}><b>Bags: </b>{tdechargment?.bags}</Item>
                        <Item style={{margin:4}}><b>Net Weight : </b>{tdechargment?.recnetwt} Kg</Item>
                        <Item style={{margin:4}}><b>Gross Weight : </b>{tdechargment?.grosswt} Kg</Item>
                        <Item style={{margin:4}}><b>In procurement ?: </b>{tdechargment.isExistInProcurement?'Yes':'No'}</Item>
                  </Box>
                </Box>
                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>FILE TRANSFERT</b></Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1, borderRadius: 1}}>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                      {tdechargment.ftransfertCode?
                                <Item style={{margin:4}}><b>File Transfert N° :</b>
                                  {CAN(UserAction.Read,EntityUSERMODAbilty.FTRANSFERTS) ?
                                        <Link onClick={_dowloadFtransfertPhoto(tdechargment?.ftransfertId)}>{tdechargment?.ftransfertCode}</Link>
                                        :tdechargment?.ftransfertCode
                                  }  
                                </Item>
                          :''}
                    </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                      <Item><b>Sticker N° : </b>{tdechargment?.ftransfertStickerno}</Item>
                  </Box>
                  <Box sx={{flex:1,alignSelf:'flex-start' }}>
                      <Item><b>Type : </b>{tdechargment?.ftransfertType}</Item>
                  </Box>
                  
                </Box>
                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>SUPPLIER</b></Item>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                    <Box sx={{flex:1,alignSelf:'flex-start' }}>
                      <Item><b>Code : </b>{tdechargment?.supplierCode}</Item>
                    </Box>
                    <Box sx={{flex:1,alignSelf:'flex-start' }}>
                      <Item><b>Name : </b>{tdechargment?.supplierFullname}</Item>
                    </Box>
                    <Box sx={{flex:1,alignSelf:'flex-start' }}>
                      <Item><b>Phone : </b>{tdechargment?.supplierPhone}</Item>
                    </Box>
                    <Box sx={{flex:1,alignSelf:'flex-start' }}>
                      <Item><b> Type : </b>{tdechargment?.supplierType}</Item>
                    </Box>
                </Box>
                {tdechargment.carrier?
                 <>
                    <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                      <Item style={{background:'#d8b91a'}}><b>CARRIER</b></Item>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item>{tdechargment?.carrier}</Item>
                      </Box>
                    </Box>
                </>:""}
                {tdechargment.driver || tdechargment.trailerRegistNumber || tdechargment.vehicleRegistNumber?
                 <>
                    <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                      <Item style={{background:'#d8b91a'}}><b>DRIVER , TRAILER AND VEHICLE</b></Item>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item><b>Driver : </b> {tdechargment?.driver}</Item>
                      </Box>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item><b>Trailer N° : </b> {tdechargment?.trailerRegistNumber}</Item>
                      </Box>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item><b>Vehicle N° : </b> {tdechargment?.vehicleRegistNumber}</Item>
                      </Box>
                    </Box>
                </>:""}
               
                {tdechargment.manager?
                 <>
                    <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start' }}>
                      <Item style={{background:'#d8b91a'}}><b>MANAGER</b></Item>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                      <Box sx={{flex:1,alignSelf:'flex-start' }}>
                        <Item>{tdechargment?.manager}</Item>
                      </Box>
                    </Box>
                </>:""}

                <Box sx={{flex:1, flexDirection:'row',alignSelf:'flex-start'}}>
                  <Item style={{background:'#d8b91a'}}><b>OTHERS</b></Item>
                </Box>
               
                {tdechargment.user_createdBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Created By : </b>{tdechargment?.user_createdBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Created At : </b>{moment(tdechargment?.createdAt).format("DD/MM/YYYY HH:mm")}</Item>
                            </Box>
                  </Box> 
                :''}
                {tdechargment.user_updatedBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Updated By : </b>{tdechargment?.user_updatedBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Updated At : </b>{moment(tdechargment?.updatedAt).format("DD/MM/YYYY HH:mm")}</Item>
                            </Box>
                  </Box> 
                :''}
                {tdechargment.user_confirmedBy?
                  <Box sx={{ display: 'flex', flexDirection:'row', p: 1, m: 1,  borderRadius: 1}}>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                              <Item><b>Confirmed By : </b>{tdechargment?.user_confirmedBy}</Item>
                            </Box>
                            <Box sx={{flex:1,alignSelf:'flex-start' }}>
                            <Item><b>Confirmed At : </b>{moment(tdechargment?.confirmedAt).format("DD/MM/YYYY HH:mm")}</Item>
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
  tdechargments: { getDetailtdechargment: any; };
}

const mapStateToProps = (state:StateProps) => {
 const { getDetailtdechargment } = state.tdechargments;
  return {getDetailtdechargment}
};
const mapDispatchToProps =(dispatch:any) => {
    return {
        getTdechargmentDetailAction: (id:any,onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentDetailAction(id,onSuccess,onError)),
        getTdechargmentPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentsPhotoAction(id,onSuccess,onError)),
        getFtransfertPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getPhotoAction(id,onSuccess,onError)),

        

      }
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalDetailTdechargment);
