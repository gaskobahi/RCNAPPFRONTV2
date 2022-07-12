import React from 'react';
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
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Fab, TextField} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import LockResetIcon from '@mui/icons-material/LockReset';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CAN from "../../../Ability/can";
import {UserAction, EntityUSERMODAbilty, USERROLES} from '../../../Ability/Actions'
import SearchIcon from '@mui/icons-material/Search';
import { connect } from 'react-redux';
import ModalDeleteOperator from './ModalDeleteOperator'
import { MyLoading, NotFound } from '../../../Helpers/custom';
import ModalAddOperator from './ModalAddOperator';
import { C5_getOperatorsAction, C5_UpdateOperartorStatusAction,C5_getsearchOperatorsAction } from '../../../redux/actions/UsersModule/operators';
import { toast } from 'react-toastify';

interface Data {
  id: string;
  serial: number;
  username: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  role: string;
  department:string;
  isactive:boolean,
  isupusername:boolean
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
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'lastname', numeric: false, disablePadding: false, label: 'Lastname' },
  { id: 'firstname', numeric: false, disablePadding: false, label: 'Firstname' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'department', numeric: false, disablePadding: false, label: 'Department' },

  { id: 'isactive', numeric: false, disablePadding: false, label: 'isActive' },
   {id: 'actions',numeric: false, disablePadding: false,label: 'Actions' }
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
            align={headCell.numeric ? 'right' : 'left'}
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
  searchOperatorValue:any;
  showModal:()=>void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,searchOperatorValue,showModal } = props;


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
                <TextField fullWidth label="Search Operators"  onKeyUp={searchOperatorValue} variant="outlined" placeholder="Search Operators" size='small' />
            </li>
            {/* user profile */}
          
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {CAN(UserAction.Create,EntityUSERMODAbilty.OPERATORS) && (
                          <Tooltip title="Add Operator" aria-label="add" onClick={()=>showModal()}>
                              <Fab color="primary" size='medium'> 
                                <AddIcon />
                              </Fab>
                        </Tooltip>
               )}
            </li>
         
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

const  OperatorsView =(props:any)=>{
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('username');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openDeleteOperatorModal, setopenDeleteOperatorModal] = React.useState(false);
  
  const authUser=props?.getuserprofile;
  const rowss=props?.getoperators

  const {role}=props?.getuserprofile;




  const [isAddMode, setisAddMode] = React.useState(true);
  const [operator, setOperator]= React.useState('')

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
  const _closeDeleteOperatorModal=()=>setopenDeleteOperatorModal(false)

  
  
  const _showAddOperatorModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }



const _showEditOperatorModal=(user:any)=>()=>{
  setOperator(user)
  setisAddMode(false)
  setopenAddModal(true)
}


const _showDeleteOperatorModal=(operator:any)=>()=>{
  setOperator(operator)
  setopenDeleteOperatorModal(true)
}

//searchOperatorsAction
const _searchOperatorValue=(e:any)=>{
  let value=e.target.value.trim();
  const onSuccess=(res:any)=>{
    console.log(res)
  }
  const onError=(res:any)=>{
    console.log(res)
  }
  props.searchOperatorsAction(value,onSuccess,onError);
}

const  _handleChangestatus=(operator:any)=>()=> {
  let data:any={};
  if(operator.isActive){data.isActive=false;}else{data.isActive=true;}
  const onChangestatusSuccess=(res:any)=>{
      /*setIsLoading(false)*/
      const onSuccesGet=(res:any)=>{console.log(res)}
      const onErrorGet=(res:any)=>{console.log(res)}
      let message=operator.username+" :status changed successfully";
      toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
      props.getOperatorsAction(onSuccesGet,onErrorGet)

    }
  const onChangestatusError=(res:any)=>{
    toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
     //setIsLoading(false)
  }
   props.updateOperartorStatusAction(operator.id,data,onChangestatusSuccess,onChangestatusError)
}



  /////end my custom function /////////////
    return (
         <>
            <div className="row">
                  <div className="col-12">
                      <div className={classes.root}>
                          <Paper className={classes.paper}>
                            <EnhancedTableToolbar numSelected={selected.length}
                             searchOperatorValue={_searchOperatorValue}
                              showModal={_showAddOperatorModal()}/>
                            {rowss && rowss.length?
                            <>
                                <TableContainer sx={{ maxHeight: 625 }}>
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
                                      showModal={_showAddOperatorModal()}
                                    />
                                    <TableBody>
                                      {stableSort(rowss, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row:any, index:any) => {
                                          console.log(row.isActive)
                                          console.log(row.role)

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
                                              <TableCell align="left" > {row.serial && row.serial}</TableCell>
                                              <TableCell align="left">{row.username && row.username}</TableCell>
                                              <TableCell align="left">{row.lastname && row.lastname}</TableCell>
                                              <TableCell align="left">{row.firstname && row.firstname}</TableCell>
                                              <TableCell align="left">{row.phone && row.phone}</TableCell>
                                              <TableCell align="left">{row.department?row.department.name:"-"}</TableCell>
                                              <TableCell align="left">
                                                 {CAN(UserAction.Update,EntityUSERMODAbilty.OPERATORS)? (
                                                <Switch checked={row.isActive}  color="primary" onChange={_handleChangestatus(row)} inputProps={{ 'aria-label': 'controlled' }}/>
                                                ):'-'}
                                                </TableCell>

                                              <TableCell align="left">
                                                      {CAN(UserAction.Update,EntityUSERMODAbilty.OPERATORS)? (
                                                         row.createdBy==authUser.id || role.name==USERROLES.SUPERADMIN?
                                                      <Tooltip title={"Edit "+row.username}><IconButton onClick={_showEditOperatorModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                                      :''):'-'}
                                                      {CAN(UserAction.Delete,EntityUSERMODAbilty.OPERATORS)? (
                                                          row.createdBy==authUser.id || role.name==USERROLES.SUPERADMIN?
                                                      <Tooltip title={"Delete "+row.username}><IconButton onClick={_showDeleteOperatorModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
                                                      :''):'-'}
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
                                  rowsPerPageOptions={[5,10,15,20,25]}
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
                           
                      </div>
                </div>
            </div>
            {openAddModal?
              <ModalAddOperator openModal={openAddModal} closeAddModal={_closeAddModal} operator={isAddMode ? '':operator} isAddMode={isAddMode}/>
            :''}

            {openDeleteOperatorModal?
              <ModalDeleteOperator openModal={openDeleteOperatorModal} closeDeleteOperatorModal={_closeDeleteOperatorModal} operator={operator}/>
            :''}
         </>
    )
    
    
}



    interface StateProps {
        operators: { getoperators: any; };
        auth : {getuserprofile:any};

    }
  
    const mapStateToProps = (state:StateProps) => {
      const  {getuserprofile}=state.auth;

        const { getoperators } = state.operators;
        return { getoperators,getuserprofile}
    };
    const mapDispatchToProps = (dispatch:any)=>{
        return {
            searchOperatorsAction:(value:string,onSuccess:any,onError:any)=> dispatch(C5_getsearchOperatorsAction(value,onSuccess,onError)),
            updateOperartorStatusAction:(id:string,data:any,onSuccess:any,onError:any)=> dispatch(C5_UpdateOperartorStatusAction(id,data,onSuccess,onError)),
            getOperatorsAction: (onSuccess:any,onError:any)=> dispatch(C5_getOperatorsAction(onSuccess,onError)),

        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(OperatorsView);