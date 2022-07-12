import React, { useEffect, useState } from 'react';
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
import { Fab, TextField} from "@material-ui/core";
import { Add as AddIcon} from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CAN from "../../../Ability/can";
import {UserAction, EntityUSERMODAbilty, USERROLES} from '../../../Ability/Actions'
import { connect } from 'react-redux';
import { isEmptyObj, NotFound, openInNewTab } from '../../../Helpers/custom';
import MyLoadingPinner from '../../../components/Loading';
import ModalAddTdechargment from './ModalAddTdechargment';
import { C5_getSearchTdechargmentsAction, C5_getTdechargmentsAction, C5_UpdateTdechargmentStatusAction, C5_getTdechargmentsPhotoAction, C5_DeleteTdechargmentAction, C5_getTdechargmentsv2Action } from '../../../redux/actions/ProcurementsModule/tdechargments';
import { toast } from 'react-toastify';
import GetAppIcon from '@material-ui/icons/GetApp';
import { SearchTdechargment } from '../../../Helpers/Dto/procurementModule';
import moment from 'moment';
import { Button, Grid } from '@mui/material';
import { IsAccepted, IsActive, IsNotAccepted, IsNotActive } from '../../../Helpers/helpMenuTree';
import MyConfirmModal from '../../../components/confirmModal';
import { SETINTERVALREFRESHDATAVALUE } from '../../../Helpers/custom/myparameters';
import ModalDetailTdechargment from './ModalDetailTdechargment';

interface Data {
  id: string;
  serial: number;
  date: string;
  code: string;
  bags: string;
  recnetwt:string;
  grosswt:string;
  ftransfert: string;
  inProcurement:string;
  photo:string,
  user_createdBy: string;
  user_createdAt: string;
  user_updatedBy:string;
  user_updatedAt:string;
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
  { id: 'serial', numeric: true, disablePadding: false, label: '#' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'code', numeric: true, disablePadding: false, label: 'Ticket N°' },
  { id: 'bags', numeric: true, disablePadding: false, label: 'Bags' },
  { id: 'recnetwt', numeric: true, disablePadding: false, label: 'Net Weight (kg)' },
  { id: 'grosswt', numeric: true, disablePadding: false, label: 'Gross Weight (kg)' },
  { id: 'photo', numeric: true, disablePadding: false, label: 'File' },
  { id: 'ftransfert', numeric: true, disablePadding: false, label: 'File Transfert N°' },
  { id: 'inProcurement', numeric: true, disablePadding: false, label: 'In Procurement?' },
  { id: 'actions',numeric: false, disablePadding: false,label: 'Actions' }
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
  const { classes, order, orderBy,onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
         {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'right'}
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

interface EnhancedTableToolbarProps {
  numSelected: number;
  searchTdechargmentValue:any;
  searchTdechargmentStartDate:any;
  searchTdechargmentEndDate:any;
  resetFilter:any;
  showModal:()=>void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,searchTdechargmentStartDate,searchTdechargmentEndDate,searchTdechargmentValue,showModal,resetFilter } = props;
  const [searchStartdate,setSearchStartdate]=useState("");
  const [searchEnddate,setSearchEnddate]=useState("");
  const [searchValue,setSearchValue]=useState("");


  const _searchStartDate =(e:any) => {
    setSearchStartdate(e.target.value);
    searchTdechargmentStartDate(e.target.value);
   };

   const _searchEndDate =(e:any) => {
    setSearchEnddate(e.target.value);
    searchTdechargmentEndDate(e.target.value);
   };
   const _searchValue =(e:any) => {
     console.log(e.target.value)
     let value=e.target.value.trim();

     setSearchValue(value);
    searchTdechargmentValue(e.target.value.trim());
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
            <Grid container item md={9} xs={8} spacing={2}>
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
              
              <Grid container item md={3} spacing={1} alignContent='end' justifyContent='flex-end' style={{marginTop:5}}>
                <Grid item md={2}>           
                    {CAN(UserAction.Create,EntityUSERMODAbilty.TDECHARGMENTS) && (
                      <Tooltip title="Add Ticket Dechargment"  aria-label="add" onClick={()=>showModal()}>
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

let sTdechargment:SearchTdechargment={startdate:'',enddate:'',value:''};


const  TdechargmentsView =(props:any)=>{
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openDeleteTdechargmentModal, setopenDeleteTdechargmentModal] = React.useState(false);
  const [myloading, setMyLoading] = React.useState(true);
  const authUser=props?.getuserprofile;
  const {role}=props?.getuserprofile;
  const rowss=props?.gettdechargments

  const [isAddMode, setisAddMode] = React.useState(true);
  const [tdechargment, setTdechargment]= React.useState({id:'',serial:'',code:''})
  const [childrenDelete, setChildrenDelete]= React.useState('')
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const [tdechargmentToDetail, setTdechargmentToDetail]= React.useState('')
  const [openDetailTdechargmentModal, setopenDetailTdechargmentModal] = React.useState(false);


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
/*
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
  };*/

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
  const _closeDetailTdechargmentModal=()=>setopenDetailTdechargmentModal(false)

  
  
  const _showAddTdechargmentModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }



const _showEditTdechargmentModal=(user:any)=>()=>{
  setTdechargment(user)
  setisAddMode(false)
  setopenAddModal(true)
}




const _searchTdechargmentStartDate=(datevalue:any)=>{
 if(datevalue){
    sTdechargment={...sTdechargment,startdate:moment(datevalue).format("YYYY-MM-DD")}
  }else{
    sTdechargment={...sTdechargment,startdate:''}
  }
  const onSuccess=(res:any)=>{
    console.log(res)
     setMyLoading(true)
    }
  const onError=(res:any)=>{
    console.log(res)
   // setMyLoading(true)
  }
  setMyLoading(false)
  props.searchTdechargmentsAction(sTdechargment,onSuccess,onError);
}

const _searchTdechargmentEndDate=(datevalue:any)=>{
  if(datevalue){
     sTdechargment={...sTdechargment,enddate:moment(datevalue).format("YYYY-MM-DD")}
   }else{
     sTdechargment={...sTdechargment,enddate:''}
   }
   const onSuccess=(res:any)=>{
     console.log(res)
     setMyLoading(true)
   }
   const onError=(res:any)=>{
     console.log(res)
    // setMyLoading(true)
    }
   setMyLoading(false)
   props.searchTdechargmentsAction(sTdechargment,onSuccess,onError);
 }

const _searchTdechargmentValue=(value:any)=>{
  if(value){
    sTdechargment={...sTdechargment,value:value} 
  }else{
    sTdechargment={...sTdechargment,value:''} 
  }
  const onSuccess=(res:any)=>{console.log(res)
    setMyLoading(true)
  }
  const onError=(res:any)=>{console.log(res)
    //setMyLoading(true)
  }
  console.log(sTdechargment)
  setMyLoading(false)
  props.searchTdechargmentsAction(sTdechargment,onSuccess,onError);
}

const  _dowloadPhoto=(data:any)=>()=> {
let {id}=data;
  const ongetPhotoSuccess=(res:any)=>{
    openInNewTab(res.data)


    }
  const ongetPhotoError=(res:any)=>{
    toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
  }
   props.getPhotoAction(id,ongetPhotoSuccess,ongetPhotoError)
   
}

const _resetFilter=()=>{
  if(!isEmptyObj(sTdechargment)){
    sTdechargment={...sTdechargment,enddate:'',startdate:'',value:''}
   const onSuccess=(res:any)=>{ console.log(res);     setMyLoading(true)}
    const onError=(res:any)=>{console.log(res);      }
    setMyLoading(false)
     props.searchTdechargmentsAction(sTdechargment,onSuccess,onError);
  }
}

const _showDeleteTdechargmentModal=(tdechargment:any)=>()=>{
  setTdechargment(tdechargment)
  let childDelete= "Warning!! This Ticket Dechargment "+ tdechargment.code + " will be definitevely deleted";
  setChildrenDelete(childDelete)
  setopenDeleteTdechargmentModal(true)
}

const _showDetailTdechargmentModal=(id:any)=>()=>{
  setTdechargmentToDetail(id)
  setopenDetailTdechargmentModal(true)
}

const  _handledeleteTdechargment=()=> {
  let {id,code}=tdechargment;
  const onDeleteTdechargmentSuccess=(res:any)=>{
      const onSuccesGet=(res:any)=>{
        setButtonLoading(false)
        setopenDeleteTdechargmentModal(false)
      }
      const onErrorGet=(res:any)=>{console.log(res)}
      let message=code+" deleted successfully";
      toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
      props.getTdechargmentsAction(onSuccesGet,onErrorGet)
      props.getTdechargmentsv2Action(onSuccesGet,onErrorGet)
     /* socket.emit("REQUEST_DELETE_TDECHARGEMENT",{value:true})
      socket.on("RESPONSE_DELETE_TDECHARGEMENT",data=>{
        console.log("connected20")
        console.log(data)
        if(data){
          alert('oui')
        }
        props.getTdechargmentsAction(onSuccesGet,onErrorGet)
        props.getTdechargmentsv2Action(onSuccesGet,onErrorGet)
      })*/
   

    }
  const onDeleteTdechargmentError=(res:any)=>{
    let message409="Relation conflict"
    res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    setButtonLoading(false)
    // props.closeDeleteTdechargmentModal(); 
  }
  setButtonLoading(true)
   props.deleteTdechargmentAction(id,onDeleteTdechargmentSuccess,onDeleteTdechargmentError)

}

const onSuccess=(res:any)=>{console.log(res)}
const onError=(res:any)=>{console.log(res)}

useEffect(() => {
  sTdechargment={...sTdechargment,enddate:'',startdate:'',value:''}
  const updateInfo = setInterval(() => {
    props.searchTdechargmentsAction(sTdechargment,onSuccess,onError)
    props.getTdechargmentsv2Action(onSuccess,onError)
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
                            <EnhancedTableToolbar numSelected={selected.length}
                             searchTdechargmentStartDate={_searchTdechargmentStartDate}
                             searchTdechargmentEndDate={_searchTdechargmentEndDate}
                             searchTdechargmentValue={_searchTdechargmentValue}
                             resetFilter={_resetFilter}
                             showModal={_showAddTdechargmentModal()}
                              />
                               {myloading?
                                  rowss && rowss.length?
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
                                              showModal={_showAddTdechargmentModal()}
                                            />
                                            <TableBody>
                                              {stableSort(rowss, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row:any, index:any) => {

                                                  row.serial= index + 1;
                                                  const isItemSelected = isSelected(row.id);
                                                  //const labelId = `enhanced-table-checkbox-${index}`;

                                                  return (
                                                    <TableRow
                                                      hover
                                                      //onClick={(event) => handleClick(event, row.id)}
                                                      onDoubleClick={_showDetailTdechargmentModal(row.id)}

                                                      role="checkbox"
                                                      aria-checked={isItemSelected}
                                                      tabIndex={-1}
                                                      key={row.id}
                                                      selected={isItemSelected}
                                                    >
                                                      <TableCell align="center" > {row.serial && row.serial}</TableCell>
                                                      <TableCell align="center">{row.date && moment(row.date).format("DD/MM/YYYY HH:mm")}</TableCell>
                                                      <TableCell align="center">{row.code && row.code}</TableCell>
                                                      <TableCell align="center">{row.bags && row.bags}</TableCell>
                                                      <TableCell align="center">{row.recnetwt && row.recnetwt}</TableCell>
                                                      <TableCell align="center">{row.grosswt && row.grosswt}</TableCell>
                                                      <TableCell align="center">
                                                          <IconButton color="secondary" onClick={_dowloadPhoto(row)} aria-label="dowload document" component="span">
                                                                <GetAppIcon />
                                                          </IconButton>
                                                      </TableCell>
                                                      <TableCell align="center">{row.ftranfertIsaccepted?IsAccepted(row.ftransfertCode):IsNotAccepted(row.ftransfertCode) }</TableCell>
                                                      <TableCell align="center">{row.isExistInProcurement?IsActive():IsNotActive()}</TableCell>
                                                      
                                                      <TableCell align="right" width={200}>
                                                          {!row.isExistInProcurement || role?.name===USERROLES.SUPERADMIN?
                                                             <>
                                                               { CAN(UserAction.Update,EntityUSERMODAbilty.TDECHARGMENTS) && (
                                                                  row.createdBy===authUser.id || role.name===USERROLES.PRMTADMIN || role.name===USERROLES.SUPERADMIN?
                                                                    <Tooltip title={"Edit "+row.code}><IconButton onClick={_showEditTdechargmentModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                                                    :''
                                                                    )}
                                                                    {CAN(UserAction.Delete,EntityUSERMODAbilty.TDECHARGMENTS) && (
                                                                          row.createdBy===authUser.id || role.name===USERROLES.PRMTADMIN || role.name===USERROLES.SUPERADMIN?
                                                                          <Tooltip title={"Delete "+row.code}><IconButton onClick={_showDeleteTdechargmentModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
                                                                          :''
                                                                     )}
                                                            </>
                                                             :'-'}
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
                                  :<NotFound/>
                              :
                              <MyLoadingPinner/>
                            }
                          </Paper>
                            {/*<FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                          />*/}
                      </div>
                </div>
            </div>
            {openAddModal?
              <ModalAddTdechargment openTdechargmentModal={openAddModal} closeAddModal={_closeAddModal} tdechargment={isAddMode ? '':tdechargment} isAddMode={isAddMode}/>
            :''}
            
            {openDetailTdechargmentModal?
                          <ModalDetailTdechargment openModal={openDetailTdechargmentModal} _closeDetailTdechargmentModal={_closeDetailTdechargmentModal} tdchm={tdechargmentToDetail}/>
                      :''}
            {openDeleteTdechargmentModal?
                <MyConfirmModal  title="Delete Ticket Dechargment?"  open={openDeleteTdechargmentModal}  setOpen={setopenDeleteTdechargmentModal} 
                 onConfirm={_handledeleteTdechargment} buttonLoading={buttonLoading}>
                   {childrenDelete}
                </MyConfirmModal>   
              :''}
         </>
    )
    
    
}



    interface StateProps {
        tdechargments: { gettdechargments: any; };
        auth: { getuserprofile: any; };
    }
  
    const mapStateToProps = (state:StateProps) => {
      const  {getuserprofile}=state.auth;
        const { gettdechargments } = state.tdechargments;
        return { gettdechargments,getuserprofile}
    };

    const mapDispatchToProps = (dispatch:any)=>{
        return {
            searchTdechargmentsAction:(data:SearchTdechargment,onSuccess:any,onError:any)=> dispatch(C5_getSearchTdechargmentsAction(data,onSuccess,onError)),
            updateTdechargmentStatusAction:(id:string,data:any,onSuccess:any,onError:any)=> dispatch(C5_UpdateTdechargmentStatusAction(id,data,onSuccess,onError)),
            getTdechargmentsAction: (onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentsAction(onSuccess,onError)),
            getTdechargmentsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentsv2Action(onSuccess,onError)),
            getPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentsPhotoAction(id,onSuccess,onError)),
            deleteTdechargmentAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteTdechargmentAction(id,onSuccess,onError)),

        }
    }
  

    export default connect(mapStateToProps,mapDispatchToProps)(TdechargmentsView);