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
import IconButton from '@mui/material/IconButton';
import { Box, Fab, TextField} from "@material-ui/core";
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
import { connect } from 'react-redux';
import { C5_getSearchUsersAction, C5_getUsersAction } from '../../../redux/actions/UsersModule/users';
import ModalAddUser from './ModalAddUser';
import { IsActive, IsNotActive } from '../../../Helpers/helpMenuTree';
import ModalResetUserPassword from './ModalResetUserPassword';
import ModalSettingsUser from './ModalSettingsUser';
import ModalDeleteUser from './ModalDeleteUser'
import { MyLoading, NotFound } from '../../../Helpers/custom';

interface Data {
  id: string;
  serial: number;
  code: string;
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

/*
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return { name, calories, fat, carbs, protein };
}*/

/*
const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];*/

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
  { id: 'code', numeric: false, disablePadding: false, label: 'Code' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'lastname', numeric: false, disablePadding: false, label: 'Lastname' },
  { id: 'firstname', numeric: false, disablePadding: false, label: 'Firstname' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'department', numeric: false, disablePadding: false, label: 'Department' },

  { id: 'isactive', numeric: false, disablePadding: false, label: 'isActive' },
  { id: 'isupusername', numeric: false, disablePadding: false, label: 'isUpUsername' },
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
               {headCell.label}
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
  searchUserValue:any;
  showModal:()=>void

}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,searchUserValue } = props;


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
                <TextField fullWidth label="Search Users"  onKeyUp={searchUserValue} variant="outlined" placeholder="Search Users" size='small' />
            </li>
            {/* user profile */}
          
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {CAN(UserAction.Create,EntityUSERMODAbilty.USERS) && (
                          <Tooltip title="Add User" aria-label="add" onClick={()=>props.showModal()}>
                              <Fab color="primary" size='medium'> 
                                <AddIcon />
                              </Fab>
                        </Tooltip>
               )}
            </li>
         
            <li className="nav-item">
              <a className="nav-link"   role="button">
                <FilterListIcon/>
              </a>
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

const  UsersView =(props:any)=>{
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('username');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openResetUserPasswordModal, setopenResetUserPasswordModal] = React.useState(false);
  const [openSettingsUserModal, setopenSettingsUserModal] = React.useState(false);
  const [openDeleteUserModal, setopenDeleteUserModal] = React.useState(false);
const [isLoading,setIsLoading]=React.useState(false)


  const [isAddMode, setisAddMode] = React.useState(true);
  const [userToedit, setUserToedit]= React.useState('')

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.getusers.map((n:any) => n.id);
      
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.getusers.length - page * rowsPerPage);

  
  const _closeAddModal=()=>setopenAddModal(false)
  const _closeResetPasswordModal=()=>setopenResetUserPasswordModal(false)
  const _closeSettingsUserModal=()=>setopenSettingsUserModal(false)
  const _closeDeleteUserModal=()=>setopenDeleteUserModal(false)

  
  
  const _showAddUserModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }

  const _showEditUserModal=(user:any)=>()=>{
    setUserToedit(user)
    setisAddMode(false)
    setopenAddModal(true)
}

const _showResetUserPasswordModal=(user:any)=>()=>{
  setUserToedit(user)
  setopenResetUserPasswordModal(true)
}

const _showSettingsUserModal=(user:any)=>()=>{
  setUserToedit(user)
  setopenSettingsUserModal(true)
}

const _showDeleteUserModal=(user:any)=>()=>{
  setUserToedit(user)
  setopenDeleteUserModal(true)
}

//searchUsersAction
const _searchUserValue=(e:any)=>{
  let value=e.target.value.trim();
  //setIsLoading(true)

  const onSearchSuccess=()=>{
    //setIsLoading(false)
  }
  props.searchUsersAction(value,onSearchSuccess);
}

const authUser=props?.getuserprofile;
  /////end my custom function /////////////
    return (
         <>
            <div className="row">
                  <div className="col-12">
                      <div className={classes.root}>
                          <Paper className={classes.paper}>
                            <EnhancedTableToolbar
                             numSelected={selected.length} 
                             searchUserValue={_searchUserValue} 
                             showModal={_showAddUserModal()}
                            />
                            {props.getusers && props.getusers.length?
                            <>
                                  <TableContainer sx={{ maxHeight: 625 }}>
                                    <Table
                                      className={classes.table}
                                      aria-labelledby="tableTitle"
                                      size={dense ? 'small' : 'medium'}
                                      aria-label="enhanced table"
                                      stickyHeader 
                                    >
                                      <EnhancedTableHead
                                        classes={classes}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={props.getusers.length}
                                      />
                                      <TableBody>
                                        {stableSort(props.getusers, getComparator(order, orderBy))
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
                                                <TableCell align="left" >{row.serial && row.serial}</TableCell>
                                                <TableCell align="left" >{row.code && row.code}</TableCell>
                                                <TableCell align="left">{row.username && row.username}</TableCell>
                                                <TableCell align="left">{row.lastname && row.lastname}</TableCell>
                                                <TableCell align="left">{row.firstname && row.firstname}</TableCell>
                                                <TableCell align="left">{row.phone && row.phone}</TableCell>
                                                <TableCell align="left">{row.email && row.email}</TableCell>
                                                <TableCell align="left">{row.role && row.role.name}</TableCell>
                                                <TableCell align="left">{row.department?row.department.name:"-"}</TableCell>

                                                
                                                <TableCell align="left">{row.isActive?IsActive():IsNotActive()}</TableCell>
                                                <TableCell align="left">{row.caneditusrname?IsActive():IsNotActive()}</TableCell>

                                                <TableCell align="left">
                                                    {
                                                      authUser.id==row.id?""    
                                                      :
                                                      <>
                                                      {CAN(UserAction.Update,EntityUSERMODAbilty.USERS) && (
                                                        <Tooltip title={"Edit "+row.username}><IconButton onClick={_showEditUserModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                                      )}
                                                        {CAN(UserAction.ResetPassword,EntityUSERMODAbilty.USERS) && (
                                                                <>
                                                                {row.role.name==USERROLES.SUPERADMIN? "" :
                                                                <Tooltip title={"Reset "+row.username+' Password'}><IconButton onClick={_showResetUserPasswordModal(row)} color="warning"> <LockResetIcon/></IconButton></Tooltip>
                                                                }
                                                                </>
                                                            )}
                                                        {CAN(UserAction.SettingsUser,EntityUSERMODAbilty.USERS) && (
                                                          <>
                                                          {row.role.name==USERROLES.SUPERADMIN? "" :
                                                            <Tooltip title={row.username+" 's Settings "}><IconButton onClick={_showSettingsUserModal(row)} color="secondary"> <SettingsIcon/></IconButton></Tooltip>
                                                            }
                                                          </>
                                                        )}
                                                        {CAN(UserAction.Delete,EntityUSERMODAbilty.USERS) && (
                                                        <Tooltip title={"Delete "+row.username}><IconButton onClick={_showDeleteUserModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
                                                        )}
                                                        </>
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
                                      rowsPerPageOptions={[5,10,15,20,25]}
                                      component="div"
                                      count={props.getusers.length}
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
              <ModalAddUser openModal={openAddModal} closeAddModal={_closeAddModal} user={isAddMode ? '' : userToedit} isAddMode={isAddMode} />
            :''}

            {openResetUserPasswordModal?
              <ModalResetUserPassword openModal={openResetUserPasswordModal} closeResetPasswordModal={_closeResetPasswordModal} user={userToedit}/>
            :''}
            {openSettingsUserModal?
              <ModalSettingsUser openModal={openSettingsUserModal} closeSettingsUserModal={_closeSettingsUserModal} user={userToedit}/>
            :''}

            {openDeleteUserModal?
              <ModalDeleteUser openModal={openDeleteUserModal} closeDeleteUserModal={_closeDeleteUserModal} user={userToedit}/>
            :''}
         </>
    )
    
    
}



    interface StateProps {
        users: any;
        auth: any

    }
  
    const mapStateToProps = (state:StateProps) => {
        const { getusers } = state.users;
        const { getuserprofile } = state.auth;

        return { getusers,getuserprofile}
    };
    const mapDispatchToProps = (dispatch:any)=>{
        return {
            //getUsersAction: (onSuccess:any,onError:any)=> dispatch(C5_getUsersAction(onSuccess,onError)),
            searchUsersAction:(value:string,onSuccess:any,onError:any)=> dispatch(C5_getSearchUsersAction(value,onSuccess,onError))
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(UsersView);