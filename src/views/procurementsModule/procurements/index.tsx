import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { Divider, Grid} from "@material-ui/core";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@mui/material/IconButton';
import { Fab, TextField} from "@material-ui/core";
import { Add as AddIcon} from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CAN from "../../../Ability/can";
import {UserAction, EntityUSERMODAbilty, USERROLES} from '../../../Ability/Actions';
import { connect } from 'react-redux';
import ModalSummeryProcurement from './ModalSummeryProcurement';
import { isEmptyObj, MyLoading, NotFound } from '../../../Helpers/custom';
import ModalAddProcurement from './ModalAddProcurement';
import {C5_getProcurementsAction, C5_UpdateProcurementStatusAction, C5_getSearchProcurementsAction, C5_DeleteProcurementAction, C5_getProcurementsv2Action, C5_ConfirmProcurementAction, C5_getProcurementDetailAction, C5_getStatsProcurementsAction, C5_getExportToExcelProcurementsAction } from '../../../redux/actions/ProcurementsModule/procurements';
import { toast } from 'react-toastify';
import { SearchProcurement } from '../../../Helpers/Dto/procurementModule';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import moment from 'moment';
import { MySmallBox, MySmallBox2 } from '../../../components/MyCards';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { styled } from '@mui/material/styles';
import ModalDetailProcurement from './ModalDetailProcurement';
import MyLoadingPinner from '../../../components/Loading';
import MyConfirmModal from '../../../components/confirmModal'
import MyConfirmExportExcelModal from '../../../components/exportExportModal'


import { Button } from '@mui/material';
import { IsConfirmed } from '../../../Helpers/helpMenuTree';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import {FILETRANSFERTTYPER, SETINTERVALREFRESHDATAVALUE} from '../../../Helpers/custom/myparameters';

import * as XLSX from 'xlsx';

interface Data {
  id: string;
  serial: number;
  date: string;
  stack:string;
  bags:string;
  recnetwt:string;
  cumulbags:string;
  moisture: string;
  nc: string;
  browns: string;
  voids: string;
  immature:string;
  imkernels:string;
  spotted:string;
  sptkernels:string;
  halfmmspot:string;
  gk:string;
  outturn:string
  isconfirmed:string;
  tdno: string;
  fdtno:string;
  fdttype:string;
  actions:string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'serial', numeric: false, disablePadding: false, label: '#' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'tdno', numeric: false, disablePadding: false, label: 'Ticket N°' },
  { id: 'fdtno', numeric: false, disablePadding: false, label: 'FDT N°' },
  { id: 'fdttype', numeric: false, disablePadding: false, label: 'FDT Type' },
  { id: 'stack', numeric: false, disablePadding: false, label: 'Stack' },
  { id: 'bags', numeric: false, disablePadding: false, label: 'Bags' },
  { id: 'recnetwt', numeric: false, disablePadding: false, label: 'N. Weight' },
  { id: 'cumulbags', numeric: false, disablePadding: false, label: 'Cum Bags' },
  
  { id: 'moisture', numeric: false, disablePadding: false, label: 'Moisture(%)' },
  { id: 'nc', numeric: false, disablePadding: false, label: 'NC' },
  { id: 'browns', numeric: false, disablePadding: false, label: 'Browns(%)' },
  { id: 'voids', numeric: false, disablePadding: false, label: 'Voids(%)' },
  { id: 'immature', numeric: false, disablePadding: false, label: 'Immature(%)'},
  { id: 'imkernels', numeric: false, disablePadding: false, label: 'Im Kernels(g)'},
  { id: 'spotted', numeric: false, disablePadding: false, label: 'Spotted(%)'},
  { id: 'sptkernels', numeric: false, disablePadding: false, label: 'Spt Kernels(g)'},
 
  { id: 'isconfirmed', numeric: false, disablePadding: false, label: 'Status'},
  {id: 'actions',numeric: true, disablePadding:true,label: 'Actions' }
];

 {/* id: 'halfmmspot', numeric: false, disablePadding: false, label: 'Imm+Spott(g)'},
  { id: 'gk', numeric: false, disablePadding: false, label: 'GK(g)'},
{ id: 'outturn', numeric: false, disablePadding: false, label: 'Outturn(LBS)'*/}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  showModal:()=>void
}


function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
       <TableRow>
              <TableCell align="center" colSpan={4}>
              </TableCell>
              <TableCell align="center" colSpan={3} style={{backgroundColor:"gray"}}>
                RECEIVED  DETAILS 
              </TableCell>
              <TableCell align="center" colSpan={4}>
                 CUTTING TEST QLTY REPORT
              </TableCell>
              <TableCell align="center" colSpan={2} style={{backgroundColor:"yellow"}}>
                  IMMATURE 
              </TableCell>
              <TableCell align="center" colSpan={3} style={{backgroundColor:"green"}}>
                  SPOTTED 
              </TableCell>
              <TableCell align="center" colSpan={2} style={{backgroundColor:"blue"}}>
                   
              </TableCell>
            </TableRow>
            <TableRow>
        </TableRow>
      <TableRow>
         {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}

            padding={headCell.disablePadding ? 'normal' : 'normal'}
            sortDirection={ orderBy === headCell.id? order : false}
          >
            {
                    headCell.label
                  }
            {/*
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              //onClick={createSortHandler(headCell.id)}
            >

                {
                    headCell.label
                  }
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
              */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
    marginTopDataCard: {
      flex: '1 1 100%',
      marginTop:10
    },
    marginTopDataTabToolbar: {
      flex: '1 1 100%',
      marginTop:10,
      marginBottom:10
    },
    marginDataTabSearchToolbar: {
      flex: '1 1 100%',
      marginTop:10,
      marginBottom:10
    },
    marginDataStatToolbar: {
      flex: '1 1 100%',
      marginTop:5,
      marginBottom:10
    },
    
    textFieldMR:{
      marginRight: 10,
    }
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  searchProcurementStartDate:any;
  searchProcurementEndDate:any;
  searchProcurementStackCode:any;
  searchProcurementTdechargmentCode:any,
  searchProcurementTFtransfertType:any;
  searchProcurementFtransfertCode:any,
  searchProcurementIsConfirmCode:any,
  resetFilter:any
  getstacks:any;
  gettdechargments:any;
  getftransferts:any,
  getyieldinspections:any,
  showModal:()=>void;
  showSummeryModal:()=>void;
  showExportModal:()=>void;
  getprocurements:any;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,
    searchProcurementStartDate,
    searchProcurementEndDate,
    searchProcurementStackCode,
    searchProcurementTdechargmentCode,
    searchProcurementTFtransfertType,
    searchProcurementFtransfertCode,
    searchProcurementIsConfirmCode,
    resetFilter,
    getstacks,
    gettdechargments,
    getftransferts,
    showModal,
    showSummeryModal,
    showExportModal,
    getprocurements,
   } = props;
  const [searchStartdate,setSearchStartdate]=useState("");
  const [searchEnddate,setSearchEnddate]=useState("");
  const [stackValue,setStackValue]=useState('')
  const [tdechargmentValue,setTdechargmentValue]=useState('');
  const [ftransfertType,setftransfertTypeValue]=useState('')

  const [ftransfertValue,setFtransfertValue]=useState('')
  const [confirmedValue,setConfirmedValue]=useState('')

  

  const _searchStartDate =(e:any) => {
    setSearchStartdate(e.target.value);
    searchProcurementStartDate(e.target.value);
   };

  const _searchEndDate =(e:any) => {
    setSearchEnddate(e.target.value);
    searchProcurementEndDate(e.target.value);
   };

  const _searchStackCode =(e:any) => {
    setStackValue(e.target.value)
  searchProcurementStackCode(e.target.value);
  };

  const _searchTdechargmentCode =(e:any) => {
    setTdechargmentValue(e.target.value)
    searchProcurementTdechargmentCode(e.target.value);
  };

  const _searchFtransfertType =(e:any) => {
    setftransfertTypeValue(e.target.value)
    searchProcurementTFtransfertType(e.target.value);
  };

  const _searchProcurementFtransfertCode =(e:any) => {
    setFtransfertValue(e.target.value)
    searchProcurementFtransfertCode(e.target.value);
  };

  const _searchProcurementIsConfirmCode =(e:any) => {
    setConfirmedValue(e.target.value)
    searchProcurementIsConfirmCode(e.target.value);
  };

  

  const _ResetFilter =(e:any) => {
    setSearchStartdate('')
    setSearchEnddate('')
    setStackValue('')
    setTdechargmentValue('')
    setftransfertTypeValue('')
    setFtransfertValue('')
    setConfirmedValue('')
    resetFilter();
  };

 
 
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography className={classes.marginDataTabSearchToolbar}  component="div">
          <Grid container spacing={1}>
            <Grid container item md={8} spacing={1}>
                <Grid item md={2} xs={6}>
                    <TextField fullWidth autoFocus inputProps={{inputformat:"YYYY-MM-DDTHH:mm"}} className={classes.textFieldMR} onChange={_searchStartDate} 
                          size='small' type="date" name="date"label="Start Date" value={searchStartdate} />
                </Grid>       
                <Grid item md={2} xs={6}>           
                    <TextField fullWidth  inputProps={{inputformat:"YYYY-MM-DDTHH:mm"}} className={classes.textFieldMR} onChange={_searchEndDate} 
                          size='small' type="date" name="date"label="End Date" value={searchEnddate} />
                </Grid> 
                <Grid item md={2} xs={6}>           
                    <TextField
                      select label="Stack " SelectProps={{native: true,}}
                      value={stackValue}
                      onChange={_searchStackCode} size="small" fullWidth >
                          <option value=""></option>
                          { getstacks && getstacks.map((data:any,index:any) =>{
                            return <option value={data.code} key={index}>{data.code}</option>
                          })  }
                      </TextField>
                </Grid> 
               
                <Grid item md={1} xs={6}>           
                    <TextField
                      select label="Ticket d." SelectProps={{native: true,}}
                      value={tdechargmentValue}
                      onChange={_searchTdechargmentCode} size="small" fullWidth >
                          <option value=""></option>
                          { gettdechargments && gettdechargments.map((data:any,index:any) =>{
                            if(data.isExistInProcurement){
                              return <option value={data.code} key={index}>{data.code}</option>
                            }
                          })
                          }
                      </TextField>
                </Grid>      
                <Grid item md={1} xs={6}>           
                    <TextField
                      select label="Ftransfert." SelectProps={{native: true,}}
                      value={ftransfertValue}
                      onChange={_searchProcurementFtransfertCode} size="small" fullWidth 
                      >
                          <option value=""></option>
                          { getftransferts && getftransferts.map((data:any,index:any) =>{
                            if(data.isaccepted && data.procurementCode){
                              return <option value={data.code} key={index}>{data.code}</option>
                            }
                          })
                          }
                      </TextField>
                </Grid>   
                <Grid item md={1} xs={6}>           
                    <TextField
                      select label="Type FDT" SelectProps={{native: true,}}
                      value={ftransfertType}
                      onChange={_searchFtransfertType} size="small" fullWidth >
                              <option value=""></option>
                              <option value={FILETRANSFERTTYPER.FDT}>FDT</option>
                              <option value={FILETRANSFERTTYPER.FDP} >FDP(PRODUCTEUR)</option>
                      </TextField>
                </Grid>   
                <Grid item md={1} xs={6}>           
                    <TextField
                      select label="ByStatus." SelectProps={{native: true,}}
                      value={confirmedValue}
                      onChange={_searchProcurementIsConfirmCode} size="small" fullWidth >
                          <option value="">All</option>
                          <option value="1">Approved</option>
                          <option value="0">Pending</option>
                      </TextField>
                </Grid>   
                <Grid item md={2} xs={6}>           
                <Button  size="small" color="secondary" onClick={_ResetFilter}>
                         Reset Filter
                  </Button>
                </Grid>    
              
            </Grid> 
              <Grid container item  md={4} xs={12}  spacing={1} alignContent='center' justifyContent='flex-end' style={{marginTop:5}}>
              <Grid item md={1} xs={2}>           
                    {CAN(UserAction.ReadStatistic,EntityUSERMODAbilty.PROCUREMENTS) && (
                      <Tooltip title="Show summery"  aria-label="add" onClick={()=>showSummeryModal()}>
                          <Fab color="secondary" size='small'> 
                            <SummarizeIcon />
                          </Fab>
                      </Tooltip>
                    )}
                </Grid>
                <Grid item md={1} xs={2}>           
                    {CAN(UserAction.ExportFile,EntityUSERMODAbilty.PROCUREMENTS) && (
                      <Tooltip title="Export To Excel "  aria-label="Export To Excel"  onClick={()=>showExportModal()}>
                          <Fab color='inherit' size='small'> 
                            <ImportExportIcon />
                          </Fab>
                      </Tooltip>
                    )}
                </Grid>
                          
                <Grid item md={1} xs={2}>           
                    {CAN(UserAction.Create,EntityUSERMODAbilty.PROCUREMENTS) && (
                      <Tooltip title="Add Procurement"  aria-label="add" onClick={()=>showModal()}>
                          <Fab color="primary" size='medium'> 
                            <AddIcon />
                          </Fab>
                      </Tooltip>
                    )}
                </Grid> 
           
                
              </Grid> 
          </Grid>
      </Typography>
    </Toolbar>
  );
};

interface EnhancedDataToolbarProps {
  numSelected: number;
  getprocurements:any;
}

const EnhancedDataToolbar = (props: EnhancedDataToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected} = props;
  const procurements:any=props.getprocurements.filter((prmt:any) => prmt.isConfirmed===true);

  const sumrecnetwt = procurements.reduce((accumulator:any, object:any) => {
    return accumulator + object.recnetwt;}, 0).toFixed(2);
    //sumprod RECNETWT+MOISTURE
  const sumProdRecntwtMoisture = procurements.reduce((accumulator:any, object:any) => {
  return accumulator +object.recnetwt*object.moisture;}, 0);
  //sumprodRECNETWT+NC
  const sumProdRecntwtNc = procurements.reduce((accumulator:any, object:any) => {
    return accumulator +object.recnetwt*object.nc;}, 0);
  //sumprodRECNETWT+BROWNS
  const sumProdRecntwBrowns = procurements.reduce((accumulator:any, object:any) => {
    return accumulator +object.recnetwt*object.browns;}, 0);
 //sumprodRECNETWT+VOIDS
 const sumProdRecntwVoids = procurements.reduce((accumulator:any, object:any) => {
  return accumulator +object.recnetwt*object.voids;}, 0);

 //sumprodRECNETWT+IMMATURE
 const sumProdRecntwImmature = procurements.reduce((accumulator:any, object:any) => {
  return accumulator +object.recnetwt*object.immature;}, 0);

//sumprodRECNETWT+IMMATUREKERNEL
  const sumProdRecntwImkernels = procurements.reduce((accumulator:any, object:any) => {
    return accumulator +object.recnetwt*object.imkernels;}, 0);
  
//sumprodRECNETWT+SPOTTED
const sumProdRecntwSpotted = procurements.reduce((accumulator:any, object:any) => {
  return accumulator +object.recnetwt*object.spotted;},0);


//sumprodRECNETWT+SPOTTED
const sumProdRecntwkernSpotted = procurements.reduce((accumulator:any, object:any) => {
  return accumulator +object.recnetwt*object.sptkernels;},0);

//sumprodRECNETWT+HALPHMMSPOT
const sumProdRecntwHalfmmspot = procurements.reduce((accumulator:any, object:any) => {
  return accumulator +object.recnetwt*object.halfmmspot;},0);

//sumprodRECNETWT+GK
const sumProdRecntwgk = procurements.reduce((accumulator:any, object:any) => {
  return accumulator +object.recnetwt*object.gk;},0);

//sumprodRECNETWT+GK
const sumProdRecntwoutturn = procurements.reduce((accumulator:any, object:any) => {
  return accumulator +object.recnetwt*object.outturn;},0);

  const percentMoisture=(sumProdRecntwtMoisture/sumrecnetwt).toFixed(0);
  const percentBrowns=(sumProdRecntwBrowns/sumrecnetwt).toFixed(0);
  const percentVoids=(sumProdRecntwVoids/sumrecnetwt).toFixed(0);
  const percentImmature=(sumProdRecntwImmature/sumrecnetwt).toFixed(0);
  const percentImkernels=(sumProdRecntwImkernels/sumrecnetwt).toFixed(0);
  const percentSpotted=(sumProdRecntwSpotted/sumrecnetwt).toFixed(0);
  const percentSpTKernel=(sumProdRecntwkernSpotted/sumrecnetwt).toFixed(0);
  const percentHalfmmspot=(sumProdRecntwHalfmmspot/sumrecnetwt).toFixed(0);
  const percentgk=(sumProdRecntwgk/sumrecnetwt).toFixed(0);
  const percentOutturn=(sumProdRecntwoutturn/sumrecnetwt).toFixed(1);

  

  const percentNc=(sumProdRecntwtNc/sumrecnetwt).toFixed(0);
  const stdbags=(sumrecnetwt/80).toFixed(1);


  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography className={classes.marginTopDataTabToolbar} id="tableTitle" component="div">
      <Grid container  /*className={classes.marginDataStatToolbar}*/ spacing={1}>
          <Grid container  item spacing={1}  md={10}>
                  <MySmallBox mytitle="STD. BAGS" myvalue={stdbags}/>
                  <MySmallBox mytitle="CUM.NET.WEIGHT" myvalue={sumrecnetwt}/>
                  <MySmallBox mytitle="MOISTURE(%)" myvalue={percentMoisture}/>
                  <MySmallBox mytitle="NC" myvalue={percentNc}/>
                  <MySmallBox mytitle="BROWNS(%)" myvalue={percentBrowns}/>
                  <MySmallBox mytitle="VOIDS(%)" myvalue={percentVoids}/>
                  <MySmallBox mytitle="IMMATURE(%)" myvalue={percentImmature}/>
                  <MySmallBox mytitle="IM KERNELS(g)" myvalue={percentImkernels}/>
                  <MySmallBox mytitle="SPOTTED(%)" myvalue={percentSpotted}/>
                  <MySmallBox mytitle="SPT KERNELS(g))" myvalue={percentSpTKernel}/>
                  <MySmallBox mytitle="1/2IMM+SPOT(g)" myvalue={percentHalfmmspot}/>
                  <MySmallBox mytitle="GK(g)" myvalue={percentgk}/>
            </Grid>
            <Grid container item  md={2} alignItems="center">
                 <MySmallBox2 mytitle="KOR (LBS)" myvalue={percentOutturn?percentOutturn:0}/>
            </Grid>
      </Grid>
      </Typography>
    </Toolbar>
  );
};
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

let sProcurement:SearchProcurement={startdate:'',enddate:'',stackCode:'',tdechargmentCode:'',ftransfertType:'',ftransfertCode:'',isConfirmed:''};



const  ProcurementsView =(props:any)=>{
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openDeleteProcurementModal, setopenDeleteProcurementModal] = React.useState(false);
  const [openConfirmProcurementModal, setopenConfirmProcurementModal] = React.useState(false);
  const [openDetailProcurementModal, setopenDetailProcurementModal] = React.useState(false);
  const [openSummeryProcurementModal, setopenSummeryProcurementModal] = React.useState(false);

  const [openExporttoExcelModal,setopenExporttoExcelModal] = React.useState(false);

  
  const [procurementToDetail, setProcurementToDetail]= React.useState('')
  const [myloading, setMyLoading] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [exportbuttonLoading, setExportbuttonLoading] = React.useState(false);

  

  //const [searchValues,setsearchValues]=useState(searchs)
  const authUser=props?.getuserprofile;
  const {role}=props?.getuserprofile;

  const rowss=props?.getprocurements;
  const exportExcelrowss=props?.getexportprocurements;

  
 
  const [isAddMode, setisAddMode] = React.useState(true);
  const [procurement, setProcurement]= React.useState({id:'',serial:''})
  const [childrenDelete, setChildrenDelete]= React.useState('')
  const [childrenExportExcel, setChildrenExportExcel]= React.useState('')

  const [childrenConfirm, setChildrenConfirm]= React.useState('')

  
  const [confirmIcon, setconfirmIcon]= React.useState()
  //const [sProcurement, setSearchProcurement]= React.useState(srchs)


  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    //setOrder(isAsc ? 'desc' : 'asc');
    setOrder('desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rowss.map((n:any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (code: string) => selected.indexOf(code) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowss.length - page * rowsPerPage);

  
  const _closeAddModal=()=>setopenAddModal(false)
  const _closeDetailProcurementModal=()=>setopenDetailProcurementModal(false)
  const _closeSummeryProcurementModal=()=>setopenSummeryProcurementModal(false)

  

  const _showDetailProcurementModal=(id:any)=>()=>{
    setProcurementToDetail(id)
    setopenDetailProcurementModal(true)
  }
  
  

  const _showAddProcurementModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }

  const _showEditProcurementModal=(user:any)=>()=>{
    setProcurement(user)
    setisAddMode(false)
    setopenAddModal(true)
  }


  const _showDeleteProcurementModal=(procurement:any)=>()=>{
    setProcurement(procurement)
    let childDelete= "Warning!! This Procurement "+ procurement.serial + " will be definitevely deleted";
    setChildrenDelete(childDelete)
    setopenDeleteProcurementModal(true)
  }

  const _showExportToExcelModal=()=>{
    let option:string='';
    let params:string='';
    if(!sProcurement.startdate && !sProcurement.enddate ){
      params='Year  = '+ moment(new Date()).format("YYYY")
       !option?option=params:option+=' ;'+params
    }
    if(sProcurement.startdate){
      params='Start Date = '+sProcurement.startdate 
       !option?option=params:option+=' ;'+params
    }
    if(sProcurement.enddate){
      params='End Date = '+sProcurement.enddate 
       !option?option=params:option+=' ; '+params
    }
    if(sProcurement.stackCode){
      params='Stack = '+sProcurement.stackCode 
       !option?option=params:option+=' ; '+params
    }
    if(sProcurement.tdechargmentCode){
      params='Ticket N° = '+sProcurement.tdechargmentCode 
       !option?option=params:option+=' ; '+params
    }
    if(sProcurement.ftransfertCode){
      params='File Transert N° = '+sProcurement.ftransfertCode 
       !option?option=params:option+=' ; '+params
    }
    if(sProcurement.ftransfertType){
      params='File Transert Type  = '+sProcurement.ftransfertType 
       !option?option=params:option+=' ; '+params
    }
    if(sProcurement.isConfirmed){
      if(sProcurement.isConfirmed=='1'){
        params='Status = '+'Approved'
        !option?option=params:option+=' ; '+params
      }else {
        params='Status = '+'Pending'
        !option?option=params:option+=' ; '+params
      }
    }
   
      setChildrenExportExcel(option)
      setopenExporttoExcelModal(true) 
  
  }

  const _exportExcelProcmtSetting=(data:any)=>{
      
  const dt = data.map((row:any,index:number)=> ({
    "N°":index+1,
    "Date":moment(row.date).format("DD/MM/YYYY HH:mm"),
    "TD N°":row.tdechargmentCode,
    "FDT N°":row.ftransfertCode,
    "FDT Type":row.ftransfertType,
    "RCF N°":row.rcncontrolCode,
    "YIR N°":row.yieldinspectionCode,
    "Supplier":row.supplier,
    "Supplier Type":row.supplierType,
    "Region":row.regionName,
    "Place":row.placeName,
    "Stack N°":row.stack_code,
    "Bags":row.bags,
    "REC NT WT":row.recnetwt.toFixed(1),
    "CUMUL BAGS":row.cumulbags.toFixed(0),
    "Moisture":row.moisture.toFixed(1),
    "NC":row.nc,
    "Browns":row.browns.toFixed(1),
    "Voids":row.voids.toFixed(1),
    "Immature":row.immature.toFixed(1),
    "Immature Kernels":row.imkernels.toFixed(1),
    "Spotted":row.spotted.toFixed(1),
    "Spotted Kernels":row.sptkernels.toFixed(0),
    "1/2IMM+SPOT":row.halfmmspot.toFixed(1),
    "GK":row.gk.toFixed(0),
    "Outturn":row.outturn.toFixed(2),
    "Status":row.isConfirmed===true?'Approved':"Pending"
  }))
  
  const worksheet = XLSX.utils.json_to_sheet(dt);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Procurement");
  XLSX.writeFile(workbook, "Procurement.xlsx");
  
  }

  const  _handleExportProcurementToExcel=()=> {

    const onExportSuccess=(res:any)=>{
        setTimeout(()=>{
          setExportbuttonLoading(false)
          if(res.length>0){
            _exportExcelProcmtSetting(res)
            setopenExporttoExcelModal(false) 
          }else{
            setExportbuttonLoading(false)
            toast.warn("There is nothing to Export !",{position:toast.POSITION.TOP_CENTER});
          }
        },1000)

      }
    const onExportError=(res:any)=>{
      setTimeout(()=>{
        setExportbuttonLoading(false)
        toast.warn("Technical issue ; call developers!",{position:toast.POSITION.TOP_CENTER}); },1000)
    }
    setExportbuttonLoading(true)
    props.getExportToExcelProcurementsAction(sProcurement,onExportSuccess,onExportError);

  }


  const _showConfirmProcurementModal=(procurement:any)=>()=>{
    setProcurement(procurement)
    let childConfirm= "Warning!! Once procurement "+ procurement.serial + " is confirmed, you could no longer modify or delete it ";
    setChildrenConfirm(childConfirm)
    setopenConfirmProcurementModal(true)
  }
  

  const _showSummeryProcurementModal=()=>()=>{
    setopenSummeryProcurementModal(true)
  }


 
  const  _handledeleteProcurement=()=> {
    let {id,serial}=procurement;
    const onDeleteProcurementSuccess=(res:any)=>{
        const onSuccesGet=(res:any)=>{
          setButtonLoading(false)
          setopenDeleteProcurementModal(false)
        }
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=serial+" deleted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getProcurementsAction(onSuccesGet,onErrorGet)
        props.getProcurementsv2Action(onSuccesGet,onErrorGet)

      }
    const onDeleteProcurementError=(res:any)=>{
      let message409="Relation conflict"
      res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setButtonLoading(false)
      // props.closeDeleteProcurementModal(); 
    }
    setButtonLoading(true)
     props.deleteProcurementAction(id,onDeleteProcurementSuccess,onDeleteProcurementError)

  }

  

  const  _handleConfirmProcurement=()=> {
    let data:any={isConfirmed:true};
    let {id,serial}=procurement;
    const onConfirmProcurementSuccess=(res:any)=>{
        const onSuccesGet=(res:any)=>{
          setButtonLoading(false)
          setopenConfirmProcurementModal(false)
        }
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=serial+" confirmed successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getProcurementsAction(onSuccesGet,onErrorGet)
        props.getProcurementsv2Action(onSuccesGet,onErrorGet)

      }
    const onConfirmProcurementError=(res:any)=>{
      let message409="Relation conflict"
      //res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setButtonLoading(false)
      // props.closeDeleteProcurementModal(); 
    }
    setButtonLoading(true)
    
     props.confirmProcurementAction(id,data,onConfirmProcurementSuccess,onConfirmProcurementError)

  }

  

const _searchProcurementStartDate=(datevalue:any)=>{
 datevalue?sProcurement={...sProcurement,startdate:moment(datevalue).format("YYYY-MM-DD")}:sProcurement={...sProcurement,startdate:''}
  const onSuccess=(res:any)=>{  setMyLoading(true)}
  const onError=(res:any)=>{ console.log(res) ; setMyLoading(true) }
  console.log(sProcurement)
  setMyLoading(false)
  props.searchProcurementsAction(sProcurement,onSuccess,onError);
}

const _searchProcurementEndDate=(datevalue:any)=>{
  datevalue?sProcurement={...sProcurement,enddate:moment(datevalue).format("YYYY-MM-DD")}:sProcurement={...sProcurement,enddate:''}
   const onSuccess=(res:any)=>{setMyLoading(true)}
   const onError=(res:any)=>{ console.log(res); setMyLoading(true)}
   console.log(sProcurement)
   setMyLoading(false)  
   props.searchProcurementsAction(sProcurement,onSuccess,onError);
 }

 const _searchProcurementStackCode=(datevalue:any)=>{
  datevalue?sProcurement={...sProcurement,stackCode:datevalue}:sProcurement={...sProcurement,stackCode:''}
   const onSuccess=(res:any)=>{console.log(res); setMyLoading(true)}
   const onError=(res:any)=>{console.log(res); setMyLoading(true)}
   console.log(sProcurement)
   setMyLoading(false)
   props.searchProcurementsAction(sProcurement,onSuccess,onError);
 }

 const _searchProcurementTdechargmentCode=(datevalue:any)=>{
  datevalue?sProcurement={...sProcurement,tdechargmentCode:datevalue}:sProcurement={...sProcurement,tdechargmentCode:''}
  const onSuccess=(res:any)=>{console.log(res); setMyLoading(true)}
  const onError=(res:any)=>{console.log(res); setMyLoading(true)}
   console.log(sProcurement)
   setMyLoading(false)
   props.searchProcurementsAction(sProcurement,onSuccess,onError);
 }

 const _searchProcurementFtransfertType=(datevalue:any)=>{
  datevalue?sProcurement={...sProcurement,ftransfertType:datevalue}:sProcurement={...sProcurement,ftransfertType:''}
  const onSuccess=(res:any)=>{console.log(res); setMyLoading(true)}
  const onError=(res:any)=>{console.log(res); setMyLoading(true)}
   setMyLoading(false)
   props.searchProcurementsAction(sProcurement,onSuccess,onError);
 }

 const _searchProcurementFtransfertCode=(datevalue:any)=>{
  datevalue?sProcurement={...sProcurement,ftransfertCode:datevalue}:sProcurement={...sProcurement,ftransfertCode:''}
   
  const onSuccess=(res:any)=>{console.log(res); setMyLoading(true)}
  const onError=(res:any)=>{console.log(res); setMyLoading(true)}
   console.log(sProcurement)
   setMyLoading(false)
   props.searchProcurementsAction(sProcurement,onSuccess,onError);
 }

 const _searchProcurementIsConfirmCode=(datevalue:any)=>{
  datevalue?sProcurement={...sProcurement,isConfirmed:datevalue}:sProcurement={...sProcurement,isConfirmed:''}
   
  const onSuccess=(res:any)=>{console.log(res); setMyLoading(true)}
  const onError=(res:any)=>{console.log(res); setMyLoading(true)}
   console.log(sProcurement)
   setMyLoading(false)
   props.searchProcurementsAction(sProcurement,onSuccess,onError);
 }


 const _resetFilter=()=>{
   if(!isEmptyObj(sProcurement)){
    sProcurement={...sProcurement,enddate:'',startdate:'',stackCode:'',ftransfertCode:'',ftransfertType:'',tdechargmentCode:'',isConfirmed:''}
    console.log(sProcurement)
    const onSuccess=(res:any)=>{console.log(res); setMyLoading(true)}
    const onError=(res:any)=>{console.log(res); setMyLoading(true)}
     setMyLoading(false)
      props.searchProcurementsAction(sProcurement,onSuccess,onError);
   }
  
 }
 
 const onSuccess=(res:any)=>{console.log(res);}
 const onError=(res:any)=>{console.log(res); }
   

 useEffect(() => {
  sProcurement={...sProcurement,enddate:'',startdate:'',stackCode:'',ftransfertCode:'',ftransfertType:'',tdechargmentCode:'',isConfirmed:''}
  const updateInfo = setInterval(() => {
    props.searchProcurementsAction(sProcurement,onSuccess,onError)
    props.getProcurementsv2Action(onSuccess,onError)
    props.getStatsProcurementsAction(onSuccess,onError)
    }, SETINTERVALREFRESHDATAVALUE);
   return () => clearInterval(updateInfo);
 }, []);



  /////end my custom function /////////////
    return (
         <>
     
            <div className="row">
                  <div className="col-12">
                      <div className={classes.root}>
                          <Paper className={classes.paper}>
                            {rowss &&rowss.filter((prmt:any) => prmt.isConfirmed===true).length?
                                CAN(UserAction.ReadStatistic,EntityUSERMODAbilty.PROCUREMENTS) && ( 
                                    <>
                                      <EnhancedDataToolbar numSelected={selected.length} getprocurements={rowss}/>
                                      <Divider/>
                                    </>
                                )
                             :''}
                            <EnhancedTableToolbar numSelected={selected.length}
                             searchProcurementStartDate={_searchProcurementStartDate}
                             searchProcurementEndDate={_searchProcurementEndDate}
                             searchProcurementStackCode={_searchProcurementStackCode}
                             searchProcurementTdechargmentCode={_searchProcurementTdechargmentCode}
                             searchProcurementTFtransfertType={_searchProcurementFtransfertType}

                             
                             searchProcurementFtransfertCode={_searchProcurementFtransfertCode}
                             searchProcurementIsConfirmCode={_searchProcurementIsConfirmCode}
                             resetFilter={_resetFilter}
                             getstacks={props.getstacks}
                             gettdechargments={props.gettdechargments}
                             getftransferts={props.getftransferts}
                             getyieldinspections={props.getyieldinspections}
                             showExportModal={_showExportToExcelModal}
                             showModal={_showAddProcurementModal()}
                             showSummeryModal={_showSummeryProcurementModal()}
                             getprocurements={rowss}
                             />
                             <Divider />
                            {myloading?
                            
                                 rowss && rowss.length?
                                  <>
                                      <TableContainer sx={{ maxHeight:600/*650*/ }}>
                                        <Table
                                          className={classes.table}
                                          aria-labelledby="tableTitle"
                                          size={dense ? 'small' : 'medium'}
                                          aria-label="enhanced table"
                                          stickyHeader >
                                          <EnhancedTableHead
                                            classes={classes}
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={rowss.length}
                                            showModal={_showAddProcurementModal()}
                                          />
                                          <TableBody>
                                            {stableSort(rowss, getComparator(order, orderBy))
                                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                              .map((row:any, index:any) => {
                                                row.serial= index + 1;
                                                const isItemSelected = isSelected(row.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                  <TableRow
                                                    hover
                                                    onDoubleClick={_showDetailProcurementModal(row.id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    selected={isItemSelected}>
                                                    <TableCell align="center" > {row.serial && row.serial}</TableCell>
                                                    <TableCell align="center">{row.date && moment(row.date).format("DD/MM/YYYY")}</TableCell>
                                                    <TableCell align="center">{row.tdechargmentCode && row.tdechargmentCode}</TableCell>
                                                    <TableCell align="center">{row.ftransfertCode && row.ftransfertCode}</TableCell>
                                                    <TableCell align="center">{row.ftransfertType && row.ftransfertType}</TableCell>
                                                    <TableCell align="center">{row.stack_code && row.stack_code}</TableCell>
                                                    <TableCell align="center">{row.bags && row.bags}</TableCell>
                                                    <TableCell align="center">{row.recnetwt && row.recnetwt.toFixed(1)}</TableCell>
                                                    <TableCell align="center">{row.cumulbags && row.cumulbags}</TableCell>
                                                    <TableCell align="center">{row.moisture && row.moisture.toFixed(1)}</TableCell>
                                                    <TableCell align="center">{row.nc && row.nc}</TableCell>
                                                    <TableCell align="center">{row.browns && row.browns.toFixed(1)}</TableCell>
                                                    <TableCell align="center">{row.voids && row.voids.toFixed(1)}</TableCell>
                                                    <TableCell align="center">{row.immature && row.immature.toFixed(1)}</TableCell>
                                                    <TableCell align="center">{row.imkernels && row.imkernels.toFixed(0)}</TableCell>
                                                    <TableCell align="center">{row.spotted && row.spotted.toFixed(1)}</TableCell>
                                                    <TableCell align="center">{row.sptkernels && row.sptkernels}</TableCell>
                                                   {/* <TableCell align="center">{row.halfmmspot && row.halfmmspot.toFixed(0)}</TableCell>
                                                    <TableCell align="center">{row.gk && row.gk}</TableCell>
                                                <TableCell align="center">{row.outturn && row.outturn.toFixed(2)}</TableCell>*/}
                                                    <TableCell align="center">{IsConfirmed(row.isConfirmed)}</TableCell>

                                                    <TableCell align="right" >
                                                          {!row.isConfirmed || role?.name==USERROLES.SUPERADMIN?
                                                          <>
                                                             { 
                                                              CAN(UserAction.Update,EntityUSERMODAbilty.PROCUREMENTS) && (
                                                                row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                                  <Tooltip title={"Edit "+row.serial}><IconButton onClick={_showEditProcurementModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                                               :''
                                                             )}
                                                              {
                                                              CAN(UserAction.Confirm,EntityUSERMODAbilty.PROCUREMENTS) && (
                                                                  row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                                 <Tooltip title={"Confirm "+row.serial}><IconButton onClick={_showConfirmProcurementModal(row)} color="secondary"><ConfirmationNumberIcon/></IconButton></Tooltip>    
                                                                 :''
                                                                 )}
                                                              
                                                               {CAN(UserAction.Delete,EntityUSERMODAbilty.PROCUREMENTS) && (
                                                                  row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                                      <Tooltip title={"Delete "+row.serial}><IconButton onClick={_showDeleteProcurementModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
                                                                  :'-'
                                                                )}
                                                          </> 
                                                          :"-" }
                                                      </TableCell>

                                                  </TableRow>
                                              );
                                              })}
                                            {emptyRows > 0 && (
                                              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                <TableCell colSpan={6} />
                                              </TableRow>
                                            )}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                      <TablePagination
                                        rowsPerPageOptions={[5,10,15,20]}
                                        component="div"
                                        count={rowss.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                      />
                                  </>
                                  :<NotFound/>

                            :<MyLoadingPinner/>
                            }
                          </Paper>
                          
                      </div>
                </div>
            </div>
            {openAddModal?
              <ModalAddProcurement sProcurement={sProcurement} openProcurementModal={openAddModal} closeAddModal={_closeAddModal} procurement={isAddMode ? '':procurement} isAddMode={isAddMode}/>
            :''}

          {openDetailProcurementModal?
               <ModalDetailProcurement openModal={openDetailProcurementModal} _closeDetailProcurementModal={_closeDetailProcurementModal} prmId={procurementToDetail}/>
           :''}

             {openDeleteProcurementModal?
                <MyConfirmModal  title="Delete Procurement?"  open={openDeleteProcurementModal}  setOpen={setopenDeleteProcurementModal} 
                 onConfirm={_handledeleteProcurement} buttonLoading={buttonLoading}>
                   {childrenDelete}
                </MyConfirmModal>   
              :''}

          {openExporttoExcelModal?
                          <MyConfirmExportExcelModal  title="Export Procurement in Excel"  open={openExporttoExcelModal}  
                           setOpen={setopenExporttoExcelModal} 
                            submitExport={_handleExportProcurementToExcel}
                            exportbuttonLoading={exportbuttonLoading}>
                            {childrenExportExcel}
                          </MyConfirmExportExcelModal>   
                        :''}


            {openConfirmProcurementModal?
                            <MyConfirmModal  title="Confirm Procurement?"  open={openConfirmProcurementModal}  setOpen={setopenConfirmProcurementModal} 
                              onConfirm={_handleConfirmProcurement} buttonLoading={buttonLoading}>
                              {childrenConfirm}
                            </MyConfirmModal>   
                          :''}

            {openSummeryProcurementModal?
                <ModalSummeryProcurement openModal={openSummeryProcurementModal} _closeSummeryProcurementModal={_closeSummeryProcurementModal}/>
              :''}

         </>
    )
    
    
}



    interface StateProps {
        auth:{getuserprofile:any};
        procurements: {getprocurements: any;getexportprocurements:any };
        stacks: {getstacks:any };
        tdechargments: {gettdechargments:any };
        ftransferts: {getftransferts:any };
        yieldinspections: {getyieldinspections:any };

    }
  
    const mapStateToProps = (state:StateProps) => {
        const  {getuserprofile}=state.auth;
        const { getprocurements,getexportprocurements } = state.procurements;
        const { getstacks } = state.stacks;
        const { gettdechargments } = state.tdechargments;
        const { getftransferts } = state.ftransferts;
        const { getyieldinspections } = state.yieldinspections;
        return { getuserprofile,getprocurements,getstacks,gettdechargments,getftransferts,getyieldinspections,getexportprocurements}
    };

    const mapDispatchToProps = (dispatch:any)=>{
        return {
            searchProcurementsAction:(data:SearchProcurement,onSuccess:any,onError:any)=> dispatch(C5_getSearchProcurementsAction(data,onSuccess,onError)),
            getExportToExcelProcurementsAction:(data:SearchProcurement,onSuccess:any,onError:any)=> dispatch(C5_getExportToExcelProcurementsAction(data,onSuccess,onError)),

            updateProcurementStatusAction:(id:string,data:any,onSuccess:any,onError:any)=> dispatch(C5_UpdateProcurementStatusAction(id,data,onSuccess,onError)),
            getProcurementsAction: (onSuccess:any,onError:any)=> dispatch(C5_getProcurementsAction(onSuccess,onError)),
            getProcurementsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getProcurementsv2Action(onSuccess,onError)),
            deleteProcurementAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteProcurementAction(id,onSuccess,onError)),
            confirmProcurementAction: (id:string,data:any,onSuccess:any,onError:any)=> dispatch(C5_ConfirmProcurementAction(id,data,onSuccess,onError)),
            
            getStatsProcurementsAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatsProcurementsAction(onSuccess,onError)),


        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(ProcurementsView);