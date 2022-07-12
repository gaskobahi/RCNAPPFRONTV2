import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@mui/material/IconButton';
import { Button, Fab, Grid, TextField} from "@material-ui/core";
import { Add as AddIcon, PhotoCamera } from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CAN from "../../../Ability/can";
import {UserAction, EntityUSERMODAbilty, USERROLES} from '../../../Ability/Actions'
import { connect } from 'react-redux';
import { isEmptyObj, MyLoading, NotFound } from '../../../Helpers/custom';
import ModalAddFtransfert from './ModalAddFtransfert';
import { C5_getSearchFtransfertsAction, C5_getFtransfertsAction,C5_DeleteFtransfertAction, C5_UpdateFtransfertStatusAction, C5_getPhotoAction } from '../../../redux/actions/ProcurementsModule/ftransferts';
import { toast } from 'react-toastify';
import GetAppIcon from '@material-ui/icons/GetApp';
import { btoa } from 'buffer';
import { SearchFtransfert } from '../../../Helpers/Dto/procurementModule';
import moment from 'moment';
import { IsAccepted, IsActive, IsNotAccepted, IsNotActive } from '../../../Helpers/helpMenuTree';
import MyConfirmModal from '../../../components/confirmModal';
import { SETINTERVALREFRESHDATAVALUE } from '../../../Helpers/custom/myparameters';
import ModalDetailFtransfert from './ModalDetailFtransfert';

interface Data {
  id: string;
  serial: number;
  date: string;
  code: string;
  stickerno:string;
  type:string;
  photo:string,
  supplier: string;

  tdechargmentCode:string,
  inprocurement:string,
  isaccepted: string;
  user_createdBy: string;
  user_updatedBy:string;
  actions:string;
}


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
  { id: 'code', numeric: false, disablePadding: false, label: 'N°' },
  { id: 'stickerno', numeric: false, disablePadding: false, label: 'Sticker N°' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'photo', numeric: false, disablePadding: false, label: 'File' },
  { id: 'supplier', numeric: false, disablePadding: false, label: 'Supplier' },

  { id: 'tdechargmentCode', numeric: false, disablePadding: false, label: 'Ticket N°' },
  { id: 'inprocurement', numeric: false, disablePadding: false, label: 'In Proc?' },
  { id: 'isaccepted', numeric: false, disablePadding: false, label: 'Is Accepted'},

  {id: 'actions',numeric: true, disablePadding: false,label: 'Actions' }
];

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
         {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={ orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
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
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

/*
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
    textFieldMR:{
      marginRight: 10,
    }
  }),
);*/

interface EnhancedTableToolbarProps {
  numSelected: number;
  searchFtransfertValue:any;
  resetFilter:any;
  searchFtransfertStartDate:any;
  searchFtransfertEndDate:any;
  showModal:()=>void;
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
    textFieldMR:{
      marginRight: 10,
    },
    marginDataTabSearchToolbar: {
      flex: '1 1 100%',
      marginTop:10,
      marginLeft:5,
      marginBottom:20
    },
  }),
);

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,searchFtransfertStartDate,searchFtransfertEndDate,searchFtransfertValue,showModal,resetFilter } = props;
  const [searchStartdate,setSearchStartdate]=useState("");
  const [searchEnddate,setSearchEnddate]=useState("");
  const [searchValue,setSearchValue]=useState("");


  const _searchStartDate =(e:any) => {
    setSearchStartdate(e.target.value);
    searchFtransfertStartDate(e.target.value);
   };

   const _searchEndDate =(e:any) => {
    setSearchEnddate(e.target.value);
    searchFtransfertEndDate(e.target.value);
   };
   const _searchValue =(e:any) => {
     console.log(e.target.value)
     let value=e.target.value.trim();

     setSearchValue(value);
    searchFtransfertValue(e.target.value.trim());
   };
  
   const _ResetFilter =(e:any) => {
    setSearchStartdate('');
    setSearchEnddate('');
    setSearchValue('');
    resetFilter();
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography className={classes.marginDataTabSearchToolbar} component="div">
      <Grid container spacing={2}>
            <Grid container item md={9} spacing={2}>
                <Grid item md={2} xs={6}>
                    <TextField fullWidth autoFocus inputProps={{inputformat:"YYYY-MM-DDTHH:mm"}} className={classes.textFieldMR} value={searchStartdate} onChange={_searchStartDate} 
                          size='small' type="date" name="date"label="Start Date" />
                </Grid>       
                <Grid item md={2} xs={6}>           
                    <TextField fullWidth  inputProps={{inputformat:"YYYY-MM-DDTHH:mm"}} className={classes.textFieldMR} value={searchEnddate} onChange={_searchEndDate} 
                          size='small' type="date" name="enddate"label="End Date" />
                </Grid> 
                <Grid item md={2} xs={6}>             
                <TextField fullWidth label="Search value"  type="text" className={classes.textFieldMR}   onChange={_searchValue} value={searchValue} placeholder="Search " size='small' />
                </Grid>  
                <Grid item md={2} xs={6}>           
                <Button  size="small" color="secondary"  onClick={_ResetFilter}>
                         Reset Filter
                  </Button>
                </Grid> 
              </Grid> 
              
              <Grid container item md={3} xs={12} spacing={1} alignContent='center' justifyContent='flex-end' style={{marginTop:5}}>

                <Grid item md={2} xs={2}>           
                    {CAN(UserAction.Create,EntityUSERMODAbilty.FTRANSFERTS) && (
                      <Tooltip title="Add File Transfert"  aria-label="add" onClick={()=>showModal()}>
                          <Fab color="primary" size='large'> 
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

let sFtransfert:SearchFtransfert={startdate:'',enddate:'',value:''};


const  FtransfertsView =(props:any)=>{
  const classes = useStyles();
  const mounted = useRef(true);
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openDeleteFtransfertModal, setopenDeleteFtransfertModal] = React.useState(false);
  const [ftransfertToDetail, setFtransfertToDetail]= React.useState('')
  const [openDetailFtransfertModal, setopenDetailFtransfertModal] = React.useState(false);

  //const [searchValues,setsearchValues]=useState(searchs)
  const authUser=props?.getuserprofile;
  const {role}=props?.getuserprofile;
  const rowss=props?.getftransferts

  const [isAddMode, setisAddMode] = React.useState(true);
  const [ftransfert, setFtransfert]= React.useState({id:'',serial:'',code:''})
  //const [sFtransfert, setSearchFtransfert]= React.useState(srchs)
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [childrenDelete, setChildrenDelete]= React.useState('')
  const [myloading, setMyLoading] = React.useState(true);
  

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
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
  const _closeDetailFtransfertModal=()=>setopenDetailFtransfertModal(false)

const _searchFtransfertEndDate=(datevalue:any)=>{
  if(datevalue){
     sFtransfert={...sFtransfert,enddate:moment(datevalue).format("YYYY-MM-DD")}
   }else{
     sFtransfert={...sFtransfert,enddate:''}
   }
   const onSuccess=(res:any)=>{
     console.log(res)
     setMyLoading(true)
   }
   const onError=(res:any)=>{
     console.log(res)
    }
   setMyLoading(false)
   props.searchFtransfertsAction(sFtransfert,onSuccess,onError);
 }

const _searchFtransfertStartDate=(datevalue:any)=>{
  if(datevalue){
    sFtransfert={...sFtransfert,startdate:moment(datevalue).format("YYYY-MM-DD")}
  }else{
    sFtransfert={...sFtransfert,startdate:''}
  }
  const onSuccess=(res:any)=>{
    console.log(res)
    setMyLoading(true)
  }
  const onError=(res:any)=>{
    console.log(res)
    }
  setMyLoading(false)
  props.searchFtransfertsAction(sFtransfert,onSuccess,onError);
}

  
  const _showAddFtransfertModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }



const _showEditFtransfertModal=(user:any)=>()=>{
  setFtransfert(user)
  setisAddMode(false)
  setopenAddModal(true)
}
const _showDeleteFtransfertModal=(ftransfert:any)=>()=>{
  setFtransfert(ftransfert)
  let childDelete= "Warning!! This Ftransfert "+ ftransfert.code + " will be definitevely deleted";
  setChildrenDelete(childDelete)
  setopenDeleteFtransfertModal(true)
}



const  _handleIsAccepted=(ftransfert:any)=>()=> {
  let data:any={};
  if(ftransfert.isaccepted){data.isaccepted=false;}else{data.isaccepted=true;}
  const onChangestatusSuccess=(res:any)=>{
      /*setIsLoading(false)*/
      const onSuccesGet=(res:any)=>{console.log(res)}
      const onErrorGet=(res:any)=>{console.log(res)}
      let message=ftransfert.code+" :status changed successfully";
      toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
      props.getFtransfertsAction(onSuccesGet,onErrorGet)

    }
  const onChangestatusError=(res:any)=>{
    toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
     //setIsLoading(false)
  }
  if(!ftransfert.tdechargmentCode && !ftransfert.procurementCode){
    console.log(ftransfert.tdechargmentCode)
    console.log(ftransfert.procurementCode)

    props.updateFtransfertStatusAction(ftransfert.id,data,onChangestatusSuccess,onChangestatusError)
  }
}

 const openInNewTab = (data:number,id?:string): void => {
  const link = document.createElement('a');
  let blob = new Blob([new Uint8Array(data)],{type:'application/pdf'})
  const url = window.URL.createObjectURL(blob);
  //link.setAttribute('download',id+`FTransfert.png`);
  //link.href = url;
  window.open(url);
  //link.click();

    //link.setAttribute('download',code+`FTransfert.png`);
    // Append to html link element page
    //document.body.appendChild(link);
    // S
    // Clean up and remove the link
   // link? link.parentNode.removeChild(link&& link):"";
}

const  _dowloadPhoto=(data:any)=>()=> {
let {id,code}=data;
  const ongetPhotoSuccess=(res:any)=>{
    openInNewTab(res.data)
    }
  const ongetPhotoError=(res:any)=>{
    toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
  }
   props.getPhotoAction(id,ongetPhotoSuccess,ongetPhotoError)
}


const  _handledeleteFtransfert=()=> {
  let {id,serial,code}=ftransfert;
  const onDeleteFtransfertSuccess=(res:any)=>{
      const onSuccesGet=(res:any)=>{
        setButtonLoading(false)
        setopenDeleteFtransfertModal(false)
      }
      const onErrorGet=(res:any)=>{console.log(res)}
      let message=code+" deleted successfully";
      toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getFtransfertsAction(onSuccesGet,onErrorGet)
        props.getFtransfertsv2Action(onSuccesGet,onErrorGet)
    }
  const onDeleteFtransfertError=(res:any)=>{
    let message409="Relation conflict :With YieldInspection or Rcncontrol || You May be not a owner"
    res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    setButtonLoading(false)
    // props.closeDeleteFtransfertModal(); 
  }
  setButtonLoading(true)
   props.deleteFtransfertAction(id,onDeleteFtransfertSuccess,onDeleteFtransfertError)

}

const onSuccess=(res:any)=>{console.log(res)
  }
const onError=(res:any)=>{console.log(res)
  }

const _searchFtransfertValue=(value:any)=>{
  if(value){
    sFtransfert={...sFtransfert,value:value} 
  }else{
    sFtransfert={...sFtransfert,value:''} 
  }
  const onSuccess=(res:any)=>{console.log(res)
    setMyLoading(true)
  }
  const onError=(res:any)=>{console.log(res)
    }
  console.log(sFtransfert)
  setMyLoading(false)
  props.searchFtransfertsAction(sFtransfert,onSuccess,onError);
}



const _resetFilter=()=>{
  if(!isEmptyObj(sFtransfert)){
    sFtransfert={...sFtransfert,enddate:'',startdate:'',value:''}
   const onSuccess=(res:any)=>{ console.log(res);      setMyLoading(true)   }
    const onError=(res:any)=>{console.log(res); }
    setMyLoading(false)
     props.searchFtransfertsAction(sFtransfert,onSuccess,onError);
  }
}

const _showDetailFtransfertModal=(id:any)=>()=>{
  setFtransfertToDetail(id)
  setopenDetailFtransfertModal(true)
}




 useEffect(() => {
  sFtransfert={...sFtransfert,enddate:'',startdate:'',value:''}
  const updateInfo = setInterval(() => {
    props.searchFtransfertsAction(sFtransfert,onSuccess,onError)
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
                            <EnhancedTableToolbar
                              numSelected={selected.length}
                              searchFtransfertStartDate={_searchFtransfertStartDate}
                              searchFtransfertEndDate={_searchFtransfertEndDate}
                              searchFtransfertValue={_searchFtransfertValue}
                              resetFilter={_resetFilter}
                              showModal={_showAddFtransfertModal()}
                             />
                            {rowss && rowss.length?
                            <>
                                <TableContainer sx={{ maxHeight: 600 }}>
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
                                      showModal={_showAddFtransfertModal()}
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
                                              //onClick={(event) => handleClick(event, row.id)}
                                              onDoubleClick={_showDetailFtransfertModal(row.id)}
                                              role="checkbox"
                                              aria-checked={isItemSelected}
                                              tabIndex={-1}
                                              key={row.id}
                                              selected={isItemSelected}
                                            >
                                              <TableCell align="center" > {row.serial && row.serial}</TableCell>
                                              <TableCell align="center">{row.date && moment(row.date).format("DD/MM/YYYY HH:mm")}</TableCell>
                                              <TableCell align="center">{row.code && row.code}</TableCell>
                                              <TableCell align="center">{row.stickerno && row.stickerno}</TableCell>
                                              <TableCell align="center">{row.type && row.type}</TableCell>
                                              <TableCell align="center">
                                                  <IconButton color="secondary" onClick={_dowloadPhoto(row)} aria-label="dowload document" component="span">
                                                        <GetAppIcon />
                                                  </IconButton>
                                              </TableCell>
                                              <TableCell align="center">{row.supplier && row.supplier}</TableCell>
                                              <TableCell align="center">{ row.tdechargmentCode && row.tdechargmentCode?IsAccepted(row.tdechargmentCode):'-' }</TableCell>
                                              <TableCell align="center">{ row.procurementCode && row.procurementCode?IsActive():IsNotActive()}</TableCell>
                                             
                                              
                                              <TableCell align="center">
                                                 {CAN(UserAction.Update,EntityUSERMODAbilty.FTRANSFERTS)? (
                                                   row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                    <Switch checked={row.isaccepted && row.isaccepted}  color="primary" onChange={_handleIsAccepted(row)} inputProps={{ 'aria-label': 'controlled' }}/>
                                                   :'' ):'-'}
                                                </TableCell>
                                                <TableCell align="right" width={200}>   
                                                 {!row.tdechargmentCode  || role?.name==USERROLES.SUPERADMIN?
                                                  <>
                                                    {CAN(UserAction.Update,EntityUSERMODAbilty.FTRANSFERTS) && (
                                                      row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                        <Tooltip title={"Edit "+row.code}><IconButton onClick={_showEditFtransfertModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                                        :''
                                                     )} 
                                                          {CAN(UserAction.Delete,EntityUSERMODAbilty.FTRANSFERTS) && (
                                                              row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                              <Tooltip title={"Delete "+row.code}><IconButton onClick={_showDeleteFtransfertModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
                                                              :''
                                                           )}
                                                        
                                                      </>
                                                  :'-'
                                                 }
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
                                  rowsPerPageOptions={[5,10,15]}
                                  component="div"
                                  count={rowss.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                             </>
                              :<NotFound/>}
                          </Paper>
                           {/*<FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                          />*/}
                      </div>
                </div>
            </div>
            {openAddModal?
              <ModalAddFtransfert openFtransfertModal={openAddModal} closeAddModal={_closeAddModal} ftransfert={isAddMode ? '':ftransfert} isAddMode={isAddMode}/>
            :''}

            {openDetailFtransfertModal?
                          <ModalDetailFtransfert openModal={openDetailFtransfertModal} _closeDetailFtransfertModal={_closeDetailFtransfertModal} ftrId={ftransfertToDetail}/>
                      :''}
        
            {openDeleteFtransfertModal?
                <MyConfirmModal  title="Delete Ftransfert?"  open={openDeleteFtransfertModal}  setOpen={setopenDeleteFtransfertModal} 
                 onConfirm={_handledeleteFtransfert} buttonLoading={buttonLoading}>
                   {childrenDelete}
                </MyConfirmModal>   
              :''}
         </>
    )
    
    
}



    interface StateProps {
        ftransferts: { getftransferts: any; };
        auth: { getuserprofile: any; };
    }
  
    const mapStateToProps = (state:StateProps) => {
        const  {getuserprofile}=state.auth;
        const { getftransferts } = state.ftransferts;
        return { getuserprofile,getftransferts}
    };
    const mapDispatchToProps = (dispatch:any)=>{
        return {
            searchFtransfertsAction:(data:SearchFtransfert,onSuccess:any,onError:any)=> dispatch(C5_getSearchFtransfertsAction(data,onSuccess,onError)),
            updateFtransfertStatusAction:(id:string,data:any,onSuccess:any,onError:any)=> dispatch(C5_UpdateFtransfertStatusAction(id,data,onSuccess,onError)),
            getFtransfertsAction: (onSuccess:any,onError:any)=> dispatch(C5_getFtransfertsAction(onSuccess,onError)),
            getPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getPhotoAction(id,onSuccess,onError)),
            deleteFtransfertAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteFtransfertAction(id,onSuccess,onError)),

              


        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(FtransfertsView);