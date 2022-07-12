import * as React from 'react';
import { useEffect, useState } from "react";
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';


import {
  Container,
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
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {C5_getSummeryProcurementsAction } from '../../../redux/actions/ProcurementsModule/procurements';
import { SummeryProcurement } from '../../../Helpers/Dto/procurementModule';
import {EnhancedSearchTwoDate} from '../../../components/Searchs/searchTwoDate';
import SummeryTableProcurement from '../../../components/tables/summeryTableProcurement';
import MyLoadingPinner from '../../../components/Loading';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}),
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 
interface ActionProps {
  getSummeryProcurementsAction:(dateValues:SummeryProcurement,res:any,res1:any)=>void;    
  openModal:any;
  getsummeryprocurements:any,
  _closeSummeryProcurementModal:any;
}
let summeryProcurement:SummeryProcurement={startdate:'',enddate:''};

const  ModalSummeryProcurement=(props:ActionProps)=> {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [myloading, setMyLoading] = React.useState(false);

  const [titleDate, setTitleDate] = React.useState("Procurement - " +moment(new Date()).format("YYYY"));
  const [titleExcel, setTitleExcel] = React.useState("Procurement_" +moment(new Date()).format("YYYY"));

  const classes = useStyles();
  const {getsummeryprocurements}=props;


const  closeModal=()=> {
    _ResetFilter()
    props._closeSummeryProcurementModal()   
  }

  const  _getSummeryProcurement=()=> { 
    const ongetSummerySuccess=(res:any)=>{ 
      setMyLoading(true)
    }
  const ongetSummeryError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setMyLoading(true)
    } 
    setMyLoading(false)
    props.getSummeryProcurementsAction(summeryProcurement,ongetSummerySuccess,ongetSummeryError)
    _customTile(summeryProcurement)
  }

const _searchByStartDate=(startvalue:any)=>{
    startvalue?summeryProcurement={...summeryProcurement,startdate:moment(startvalue).format("YYYY-MM-DD")}:summeryProcurement={...summeryProcurement,startdate:''}
    const ongetSummerySuccess=(res:any)=>{ setMyLoading(true) }
  const ongetSummeryError=(res:any)=>{ 
    toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    setMyLoading(true)
  } 
    setMyLoading(false)
    props.getSummeryProcurementsAction(summeryProcurement,ongetSummerySuccess,ongetSummeryError)
    _customTile(summeryProcurement)
  }
  
  const _searchByEndDate=(endvalue:any)=>{
    endvalue?summeryProcurement={...summeryProcurement,enddate:moment(endvalue).format("YYYY-MM-DD")}:summeryProcurement={...summeryProcurement,enddate:''}
    const ongetSummerySuccess=(res:any)=>{setMyLoading(true)}
    const ongetSummeryError=(res:any)=>{ 
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setMyLoading(true)
    } 
    setMyLoading(false)
    props.getSummeryProcurementsAction(summeryProcurement,ongetSummerySuccess,ongetSummeryError)
    _customTile(summeryProcurement)
  }

  const _ResetFilter=()=>{
    if(summeryProcurement.startdate || summeryProcurement.enddate){
      setMyLoading(false)
        summeryProcurement={...summeryProcurement,startdate:'',enddate:''}
        const ongetSummerySuccess=(res:any)=>{setMyLoading(true) }
        const ongetSummeryError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER}); 
        setMyLoading(true)
        } 
        props.getSummeryProcurementsAction(summeryProcurement,ongetSummerySuccess,ongetSummeryError)
        _customTile(summeryProcurement)
    }
    
  }

 const  _ExportToExcel=()=>{
        if(getsummeryprocurements.length>0){
          const dt = getsummeryprocurements.map((row:any,index:number)=> ({
          "N°":index+1,
          "STACK":row.stack,
          "AREA":row.area,
          "NBBAGS":row.nbBags,
          "Quantity(Kgs)":row.qte,
          "STDBAGS":row.stdBags.toFixed(1),
          "MOISTURE %":row.moisture.toFixed(0),
          "NUT CUT":row.nc.toFixed(0),
          "KOR (LB)":row.kor.toFixed(2),
        }))
        console.log(titleExcel)
        const worksheet = XLSX.utils.json_to_sheet(dt);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Summery");
        XLSX.writeFile(workbook,titleExcel+".xlsx");
      }
 }

  const _customTile=(summeryProcurement:SummeryProcurement)=>{
    let title:any,titleExc:any;
     if(!summeryProcurement.startdate && !summeryProcurement.enddate){
      title= "Procurement - " +moment(new Date()).format("YYYY")
      setTitleDate(title)
      titleExc="Procurement_"+moment(new Date()).format("YYYY")
      setTitleExcel(titleExc)
     }
     if(summeryProcurement.startdate && !summeryProcurement.enddate){
      title= "Procurement from start Date :" +moment(summeryProcurement.startdate).format("DD/MM/YYYY")
      setTitleDate(title)
      titleExc="Procurement_From_"+moment(summeryProcurement.startdate).format("DDMMYYYY")
      setTitleExcel(titleExc)
     }
     if(!summeryProcurement.startdate && summeryProcurement.enddate){
      title= "Procurement from end Date :" +moment(summeryProcurement.enddate).format("DD/MM/YYYY")
      setTitleDate(title)
      titleExc="Procurement_EndDate_"+moment(summeryProcurement.enddate).format("DDMMYYYY")
      setTitleExcel(titleExc)
     }
     if(summeryProcurement.startdate && summeryProcurement.enddate){
      title= "Procurement from " +moment(summeryProcurement.startdate).format("DD/MM/YYYY")+ " to "+moment(summeryProcurement.enddate).format("DD/MM/YYYY")
      setTitleDate(title)
      titleExc="Procurement_From"+moment(summeryProcurement.startdate).format("DDMMYYYY")+"_To_"+moment(summeryProcurement.enddate).format("DDMMYYYY")
      setTitleExcel(titleExc)
     }
  }
  
  useEffect(() => {
      _getSummeryProcurement()
  },[]);

  

  return (
    
      <Modal
        open={props.openModal}
        onClose={closeModal}
      >
         <Container fixed maxWidth="lg">
         <Card>
            <CardHeader  subheader="" title= {titleDate}/>
            <Divider/>
              <EnhancedSearchTwoDate
                searchByStartDate={_searchByStartDate}
                searchByEndDate={_searchByEndDate}
                resetFilter={_ResetFilter}
                exportToExcel={_ExportToExcel}
              />
              {myloading?
                <div className="col-12">
                    <div className={classes.root}>
                          <Paper className={classes.paper}>
                            <SummeryTableProcurement summeryprocurements={props.getsummeryprocurements}/>
                          </Paper>
                  </div>
                </div>
                :
                <MyLoadingPinner/>
              }

                
          </Card>
        </Container>
      </Modal>
     
    
  );
}



 interface StateProps {
   procurements: {getsummeryprocurements: any; };
}

const mapStateToProps = (state:StateProps) => {
  const { getsummeryprocurements } = state.procurements;

  return {
    getsummeryprocurements
  }
}
const mapDispatchToProps =(dispatch:any) => {
    return {
      getSummeryProcurementsAction: (dateValues:SummeryProcurement,onSuccess:any,onError:any)=> dispatch(C5_getSummeryProcurementsAction(dateValues,onSuccess,onError)),
      }
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalSummeryProcurement);


