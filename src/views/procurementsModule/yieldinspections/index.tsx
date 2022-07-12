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
import { isEmptyObj, MyLoading, NotFound, openInNewTab } from '../../../Helpers/custom';
import MyLoadingPinner from '../../../components/Loading';
import ModalAddYieldinspection from './ModalAddYieldinspection';
import { C5_getSearchYieldinspectionsAction, C5_getYieldinspectionsAction, C5_UpdateYieldinspectionStatusAction, C5_getYieldinspectionPhotoAction, C5_DeleteYieldinspectionAction, C5_getYieldinspectionsv2Action } from '../../../redux/actions/ProcurementsModule/yieldinspections';
import { toast } from 'react-toastify';
import GetAppIcon from '@material-ui/icons/GetApp';
import { btoa } from 'buffer';
import { SearchYieldinspection } from '../../../Helpers/Dto/procurementModule';
import moment from 'moment';
import { Button, Grid } from '@mui/material';
import { IsAccepted, IsActive, IsNotAccepted, IsNotActive } from '../../../Helpers/helpMenuTree';
import MyConfirmModal from '../../../components/confirmModal';
import { SETINTERVALREFRESHDATAVALUE } from '../../../Helpers/custom/myparameters';

interface Data {
  id: string;
  serial: number;
  date: string;
  code: string;
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
  { id: 'code', numeric: true, disablePadding: false, label: 'Code' },
  { id: 'photo', numeric: true, disablePadding: false, label: 'File' },
  { id: 'ftransfert', numeric: true, disablePadding: false, label: 'File Transfert N°' },
  { id: 'inProcurement', numeric: true, disablePadding: false, label: 'In Procurement?' },
  { id: 'user_createdAt', numeric: true, disablePadding: false, label: 'Created At' },
  { id: 'user_updatedAt', numeric: true, disablePadding: false, label: 'Updated At' },
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
  searchYieldinspectionValue:any;
  searchYieldinspectionStartDate:any;
  searchYieldinspectionEndDate:any;
  resetFilter:any;
  showModal:()=>void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,searchYieldinspectionStartDate,searchYieldinspectionEndDate,searchYieldinspectionValue,showModal,resetFilter } = props;
  const [searchStartdate,setSearchStartdate]=useState("");
  const [searchEnddate,setSearchEnddate]=useState("");
  const [searchValue,setSearchValue]=useState("");


  const _searchStartDate =(e:any) => {
    setSearchStartdate(e.target.value);
    searchYieldinspectionStartDate(e.target.value);
   };

   const _searchEndDate =(e:any) => {
    setSearchEnddate(e.target.value);
    searchYieldinspectionEndDate(e.target.value);
   };
   const _searchValue =(e:any) => {
     console.log(e.target.value)
     let value=e.target.value.trim();

     setSearchValue(value);
    searchYieldinspectionValue(e.target.value.trim());
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
                    {CAN(UserAction.Create,EntityUSERMODAbilty.YIELDINSPECTIONS) && (
                      <Tooltip title="Add Yield Inspection"  aria-label="add" onClick={()=>showModal()}>
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

let sYieldinspection:SearchYieldinspection={startdate:'',enddate:'',value:''};


const  YieldinspectionsView =(props:any)=>{
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openDeleteYieldinspectionModal, setopenDeleteYieldinspectionModal] = React.useState(false);
  const [myloading, setMyLoading] = React.useState(true);
  const authUser=props?.getuserprofile;
  const {role}=props?.getuserprofile;
  const rowss=props?.getyieldinspections

  const [isAddMode, setisAddMode] = React.useState(true);
  const [yieldinspection, setYieldinspection]= React.useState({id:'',serial:'',code:''})
  const [childrenDelete, setChildrenDelete]= React.useState('')
  const [buttonLoading, setButtonLoading] = React.useState(false);

  //const [sYieldinspection, setSearchYieldinspection]= React.useState(srchs)


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
  const _closeDeleteYieldinspectionModal=()=>setopenDeleteYieldinspectionModal(false)

  
  
  const _showAddYieldinspectionModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }



const _showEditYieldinspectionModal=(user:any)=>()=>{
  setYieldinspection(user)
  setisAddMode(false)
  setopenAddModal(true)
}




const _searchYieldinspectionStartDate=(datevalue:any)=>{
 if(datevalue){
    sYieldinspection={...sYieldinspection,startdate:moment(datevalue).format("YYYY-MM-DD")}
  }else{
    sYieldinspection={...sYieldinspection,startdate:''}
  }
  const onSuccess=(res:any)=>{
    console.log(res)
    setMyLoading(true)
  }
  const onError=(res:any)=>{
    console.log(res)
    }
  setMyLoading(false)
  props.searchYieldinspectionsAction(sYieldinspection,onSuccess,onError);
}

const _searchYieldinspectionEndDate=(datevalue:any)=>{
  if(datevalue){
     sYieldinspection={...sYieldinspection,enddate:moment(datevalue).format("YYYY-MM-DD")}
   }else{
     sYieldinspection={...sYieldinspection,enddate:''}
   }
   const onSuccess=(res:any)=>{
     console.log(res)
     setMyLoading(true)
   }
   const onError=(res:any)=>{
     console.log(res)
    }
   setMyLoading(false)
   props.searchYieldinspectionsAction(sYieldinspection,onSuccess,onError);
 }

const _searchYieldinspectionValue=(value:any)=>{
  if(value){
    sYieldinspection={...sYieldinspection,value:value} 
  }else{
    sYieldinspection={...sYieldinspection,value:''} 
  }
  const onSuccess=(res:any)=>{console.log(res)
    setMyLoading(true)
  }
  const onError=(res:any)=>{console.log(res)
    }
  console.log(sYieldinspection)
  setMyLoading(false)
  props.searchYieldinspectionsAction(sYieldinspection,onSuccess,onError);
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

const _resetFilter=()=>{
  if(!isEmptyObj(sYieldinspection)){
    sYieldinspection={...sYieldinspection,enddate:'',startdate:'',value:''}
   const onSuccess=(res:any)=>{ console.log(res);      setMyLoading(true) }
    const onError=(res:any)=>{console.log(res); }
    setMyLoading(false)
     props.searchYieldinspectionsAction(sYieldinspection,onSuccess,onError);
  }
}

console.log(role)
const _showDeleteYieldinspectionModal=(yieldinspection:any)=>()=>{
  setYieldinspection(yieldinspection)
  let childDelete= "Warning!! This Yield Inspection "+ yieldinspection.code + " will be definitevely deleted";
  setChildrenDelete(childDelete)
  setopenDeleteYieldinspectionModal(true)
}


const  _handledeleteYieldinspection=()=> {
  let {id,serial,code}=yieldinspection;
  const onDeleteYieldinspectionSuccess=(res:any)=>{
      const onSuccesGet=(res:any)=>{
        setButtonLoading(false)
        setopenDeleteYieldinspectionModal(false)
      }
      const onErrorGet=(res:any)=>{console.log(res)}
      let message=code+" deleted successfully";
      toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
      props.getYieldinspectionsAction(onSuccesGet,onErrorGet)
      props.getYieldinspectionsv2Action(onSuccesGet,onErrorGet)

    }
  const onDeleteYieldinspectionError=(res:any)=>{
    let message409="Relation conflict"
    res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    setButtonLoading(false)
    // props.closeDeleteYieldinspectionModal(); 
  }
  setButtonLoading(true)
   props.deleteYieldinspectionAction(id,onDeleteYieldinspectionSuccess,onDeleteYieldinspectionError)

}


const onSuccess=(res:any)=>{console.log(res)}
const onError=(res:any)=>{console.log(res)}

useEffect(() => {
  sYieldinspection={...sYieldinspection,enddate:'',startdate:'',value:''}
  const updateInfo = setInterval(() => {
    props.searchYieldinspectionsAction(sYieldinspection,onSuccess,onError)
    props.getYieldinspectionsv2Action(onSuccess,onError)
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
                             searchYieldinspectionStartDate={_searchYieldinspectionStartDate}
                             searchYieldinspectionEndDate={_searchYieldinspectionEndDate}
                             searchYieldinspectionValue={_searchYieldinspectionValue}
                             resetFilter={_resetFilter}
                              showModal={_showAddYieldinspectionModal()}
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
                                              showModal={_showAddYieldinspectionModal()}
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
                                                      role="checkbox"
                                                      aria-checked={isItemSelected}
                                                      tabIndex={-1}
                                                      key={row.id}
                                                      selected={isItemSelected}
                                                    >
                                                      <TableCell align="center" > {row.serial && row.serial}</TableCell>
                                                      <TableCell align="center">{row.date && moment(row.date).format("DD/MM/YYYY HH:mm")}</TableCell>
                                                      <TableCell align="center">{row.code && row.code}</TableCell>
                                                      <TableCell align="center">
                                                          <IconButton color="secondary" onClick={_dowloadPhoto(row)} aria-label="dowload document" component="span">
                                                                <GetAppIcon />
                                                          </IconButton>
                                                      </TableCell>
                                                      <TableCell align="center">{row.ftranfertIsaccepted?IsAccepted(row.ftransfertCode):IsNotAccepted(row.ftransfertCode) }</TableCell>
                                                      <TableCell align="center">{row.isExistInProcurement?IsActive():IsNotActive() }</TableCell>
                                                      <TableCell align="center">{row.createdAt?row.createdAt && moment(row.createdAt).format("DD/MM/YYYY HH:mm"):'-'}</TableCell>
                                                      <TableCell align="center">{row.updatedAt?row.updatedAt && moment(row.updatedAt).format("DD/MM/YYYY HH:mm"):'-'}</TableCell>
                                                       
                                                      <TableCell align="right" width={200}>
                                                          {!row.isExistInProcurement || role.name==USERROLES.SUPERADMIN?
                                                             <>
                                                               { CAN(UserAction.Update,EntityUSERMODAbilty.YIELDINSPECTIONS) && (
                                                                  row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                                    <Tooltip title={"Edit "+row.code}><IconButton onClick={_showEditYieldinspectionModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                                                    :'-'
                                                                    )}
                                                                    {CAN(UserAction.Delete,EntityUSERMODAbilty.YIELDINSPECTIONS) && (
                                                                          row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                                          <Tooltip title={"Delete "+row.code}><IconButton onClick={_showDeleteYieldinspectionModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
                                                                          :'-'
                                                                     )}
                                                            </>
                                                             :''}
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
              <ModalAddYieldinspection openYieldinspectionModal={openAddModal} closeAddModal={_closeAddModal} yieldinspection={isAddMode ? '':yieldinspection} isAddMode={isAddMode}/>
            :''}
            {openDeleteYieldinspectionModal?
                <MyConfirmModal  title="Delete Yield Inspection?"  open={openDeleteYieldinspectionModal}  setOpen={setopenDeleteYieldinspectionModal} 
                 onConfirm={_handledeleteYieldinspection} buttonLoading={buttonLoading}>
                   {childrenDelete}
                </MyConfirmModal>   
              :''}
         </>
    )
    
    
}



    interface StateProps {
        yieldinspections: { getyieldinspections: any; };
        auth: { getuserprofile: any; };
    }
  
    const mapStateToProps = (state:StateProps) => {
      const  {getuserprofile}=state.auth;
        const { getyieldinspections } = state.yieldinspections;
        return { getyieldinspections,getuserprofile}
    };

    const mapDispatchToProps = (dispatch:any)=>{
        return {
            searchYieldinspectionsAction:(data:SearchYieldinspection,onSuccess:any,onError:any)=> dispatch(C5_getSearchYieldinspectionsAction(data,onSuccess,onError)),
            updateYieldinspectionStatusAction:(id:string,data:any,onSuccess:any,onError:any)=> dispatch(C5_UpdateYieldinspectionStatusAction(id,data,onSuccess,onError)),
            getYieldinspectionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getYieldinspectionsAction(onSuccess,onError)),
            getYieldinspectionsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getYieldinspectionsv2Action(onSuccess,onError)),
            getPhotoAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_getYieldinspectionPhotoAction(id,onSuccess,onError)),
            deleteYieldinspectionAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteYieldinspectionAction(id,onSuccess,onError)),

        }
    }
  

    export default connect(mapStateToProps,mapDispatchToProps)(YieldinspectionsView);