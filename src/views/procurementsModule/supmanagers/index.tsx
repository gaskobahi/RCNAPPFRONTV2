import React, { useEffect } from 'react';
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
import { Add as AddIcon } from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CAN from "../../../Ability/can";
import {UserAction,EntityUSERMODAbilty, USERROLES} from '../../../Ability/Actions'
import { connect } from 'react-redux';
import { MyLoading, NotFound } from '../../../Helpers/custom';
import ModalAddSupmanager from './ModalAddSupmanager';
import ModalAddManagerToSupplier from './ModalAddManagerToSupplier';


import { C5_DeleteSupmanagerAction, C5_getSearchSupmanagersAction, C5_getStatsSupmanagersAction, C5_getSupmanagersAction } from '../../../redux/actions/ProcurementsModule/supmanagers';
import { toast } from 'react-toastify';
import { SearchSupmanager } from '../../../Helpers/Dto/procurementModule';
import MyLoadingPinner from '../../../components/Loading';
import moment from 'moment';
import { SETINTERVALREFRESHDATAVALUE } from '../../../Helpers/custom/myparameters';
import MyConfirmModal from '../../../components/confirmModal';
import AddCardIcon from '@mui/icons-material/AddCard';
interface Data {
  id: string;
  serial: string;
  fullname: string;
  phone: string;
  user_createdBy:string;
  user_createdAt:string;
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
  { id: 'serial', numeric: false, disablePadding: false, label: '#' },
  { id: 'fullname', numeric: false, disablePadding: false, label: 'FullName' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'user_createdAt', numeric: false, disablePadding: false, label: 'Created At' },
  { id: 'user_updatedAt', numeric: false, disablePadding: false, label: 'Updated At' },
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
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  searchSupmanagerValue:any;
  showModal:()=>void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,searchSupmanagerValue,showModal } = props;


  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
      <nav className="navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav ml">
            {/*<!-- Navbar Search -->*/}
            <li className="nav-item">
                <TextField fullWidth label="Search"  onKeyUp={searchSupmanagerValue}  placeholder="Search Supmanagers" size='small' />
            </li>
            {/* user profile */}
          
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {CAN(UserAction.Create,EntityUSERMODAbilty.SUPMANAGERS) && (
                          <Tooltip title="Add Supmanager" aria-label="add" onClick={()=>showModal()}>
                              <Fab color="primary" size='medium'> 
                                <AddIcon />
                              </Fab>
                        </Tooltip>
               )}
            </li>
           {/*
            <li className="nav-item">
              <a className="nav-link"   role="button">
                <FilterListIcon/>
              </a>
              </li>*/}
          </ul>
     </nav>

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
    },
  }),
);

let sSupmanager:SearchSupmanager={value:''};
const  SupmanagersView =(props:any)=>{
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('user_createdAt');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openDeleteSupmanagerModal, setopenDeleteSupmanagerModal] = React.useState(false);
  const [openAddSupmanagerToSuplierModal, setopenAddSupmanagerToSuplierModal] = React.useState(false);

  const [myloading, setMyLoading] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [childrenDelete, setChildrenDelete]= React.useState('')

  const authUser=props?.getuserprofile;
  const rowss=props?.getsupmanagers
  const {role}=props?.getuserprofile;


  const [isAddMode, setisAddMode] = React.useState(true);
  const [supmanager, setSupmanager]= React.useState({id:'',serial:'',fullname:'',phone:''})

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
  const _closeAddSupmanagerToSuplierModal=()=>setopenAddSupmanagerToSuplierModal(false)

  const _closeDeleteSupmanagerModal=()=>setopenDeleteSupmanagerModal(false)

  
  
  const _showAddSupmanagerModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }

const _showEditSupmanagerModal=(user:any)=>()=>{
  setSupmanager(user)
  setisAddMode(false)
  setopenAddModal(true)
}

const _showAddSupmanagerToSupplierModal=(user:any)=>()=>{
  setSupmanager(user)
  setopenAddSupmanagerToSuplierModal(true)
}

//searchSupmanagersAction
const _searchSupmanagerValue=(e:any)=>{
  let value=e.target.value.trim();
  sSupmanager={...sSupmanager,value:value}
  const onSuccess=(res:any)=>{
    console.log(res)
    setMyLoading(true)
  }
  const onError=(res:any)=>{
    console.log(res)
  }
  setMyLoading(false)
  props.searchSupmanagersAction(sSupmanager,onSuccess,onError);
}

const _showDeleteSupmanagerModal=(supmanager:any)=>()=>{
  setSupmanager(supmanager)
  let childDelete= "Warning!! This Supplier manager "+ supmanager.fullname + " will be definitevely deleted";
  setChildrenDelete(childDelete)
  setopenDeleteSupmanagerModal(true)
}


const  _handledeleteSupmanager=()=> {
  let {id,serial,fullname}=supmanager;
  const onDeleteSupmanagerSuccess=(res:any)=>{
      const onSuccesGet=(res:any)=>{
        setButtonLoading(false)
        setopenDeleteSupmanagerModal(false)
      }
      const onErrorGet=(res:any)=>{console.log(res)}
      let message=fullname+" deleted successfully";
      toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getSupmanagerAction(onSuccesGet,onErrorGet)

    }
  const onDeleteSupmanagerError=(res:any)=>{
    let message409="Relation conflict"
    res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    setButtonLoading(false)
    // props.closeDeleteSupmanagerModal(); 
  }
  setButtonLoading(true)
   props.deleteSupmanagerAction(id,onDeleteSupmanagerSuccess,onDeleteSupmanagerError)

}




const onSuccess=(res:any)=>{console.log(res)}
const onError=(res:any)=>{console.log(res)}

useEffect(() => {
  sSupmanager={...sSupmanager,value:""}
  const updateInfo = setInterval(() => {
    props.searchSupmanagersAction(sSupmanager,onSuccess,onError)
    
   // props.getStatsSupmanagersAction(onSuccess,onError)
    
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
                             searchSupmanagerValue={_searchSupmanagerValue}
                              showModal={_showAddSupmanagerModal()}/>

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
                                        showModal={_showAddSupmanagerModal()}
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
                                                <TableCell align="center">{row.fullname && row.fullname}</TableCell>
                                                <TableCell align="center">{row.phone && row.phone}</TableCell>
                                                <TableCell align="center">{row.createdAt?row.createdAt && moment(row.createdAt).format("DD/MM/YYYY HH:mm"):'-'}</TableCell>
                                                <TableCell align="center">{row.updatedAt?row.updatedAt && moment(row.updatedAt).format("DD/MM/YYYY HH:mm"):'-'}</TableCell>
                                                
                                                <TableCell align="right" width={200}>
                                                {CAN(UserAction.Update,EntityUSERMODAbilty.SUPMANAGERS) && (
                                                     row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                     <Tooltip title={"Affect "+row.fullname+" To "+"Supplier"}><IconButton onClick={_showAddSupmanagerToSupplierModal(row)} color="success"><AddCardIcon/></IconButton></Tooltip>    
                                                    :''
                                                  )} 
                                                {CAN(UserAction.Update,EntityUSERMODAbilty.SUPMANAGERS) && (
                                                     row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                     <Tooltip title={"Edit "+row.code}><IconButton onClick={_showEditSupmanagerModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                                    :''
                                                  )} 
                                                {CAN(UserAction.Delete,EntityUSERMODAbilty.SUPMANAGERS) && (
                                                   row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                    <Tooltip title={"Delete "+row.code}><IconButton onClick={_showDeleteSupmanagerModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
                                                   :'-'
                                                  )}
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
                          
                      </div>
                </div>
            </div>
            {openAddModal?
              <ModalAddSupmanager openSupmanagerModal={openAddModal} closeAddModal={_closeAddModal} supmanager={isAddMode ? '':supmanager} isAddMode={isAddMode}/>
            :''}

             {openDeleteSupmanagerModal?
                <MyConfirmModal  title="Delete Supmanager?"  open={openDeleteSupmanagerModal}  setOpen={setopenDeleteSupmanagerModal} 
                 onConfirm={_handledeleteSupmanager} buttonLoading={buttonLoading}>
                   {childrenDelete}
                </MyConfirmModal>   
              :''}

              {openAddSupmanagerToSuplierModal?
             <ModalAddManagerToSupplier openSupmanagerModal={openAddSupmanagerToSuplierModal} closeSupmanagerModal={_closeAddSupmanagerToSuplierModal} supmanager={supmanager} />
              :''}

           
         </>
    )
    
    
}



    interface StateProps {
        auth:{getuserprofile:any};
        supmanagers: { getsupmanagers: any; };
    }
  
    const mapStateToProps = (state:StateProps) => {
        const  {getuserprofile}=state.auth;
        const { getsupmanagers } = state.supmanagers;
        return { getsupmanagers,getuserprofile}
    };
    const mapDispatchToProps = (dispatch:any)=>{
        return {
            getSupmanagerAction: (onSuccess:any,onError:any)=> dispatch(C5_getSupmanagersAction(onSuccess,onError)),
            searchSupmanagersAction:(value:SearchSupmanager,onSuccess:any,onError:any)=> dispatch(C5_getSearchSupmanagersAction(value,onSuccess,onError)),
            deleteSupmanagerAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteSupmanagerAction(id,onSuccess,onError)),

            getStatsSupmanagersAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatsSupmanagersAction(onSuccess,onError)),

        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(SupmanagersView);