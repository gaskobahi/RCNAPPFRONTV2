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
import { Fab, TextField} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CAN from "../../../Ability/can";
import {UserAction,EntityUSERMODAbilty, USERROLES} from '../../../Ability/Actions'
import { connect } from 'react-redux';
import ModalDeleteDepartment from './ModalDeleteDepartment'
import { MyLoading, NotFound } from '../../../Helpers/custom';
import ModalAddDepartment from './ModalAddDepartment';
import { C5_getSearchDepartmentsAction } from '../../../redux/actions/UsersModule/departments';
import { toast } from 'react-toastify';

interface Data {
  id: string;
  serial: number;
  code: string;
  name: string;
  description: string;
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
  { id: 'code', numeric: false, disablePadding: false, label: 'Code' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
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
  searchDepartmentValue:any;
  showModal:()=>void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,searchDepartmentValue,showModal } = props;


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
                <TextField fullWidth label="Search Departments"  onKeyUp={searchDepartmentValue} variant="outlined" placeholder="Search Departments" size='small' />
            </li>
            {/* user profile */}
          
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {CAN(UserAction.Create,EntityUSERMODAbilty.DEPARTMENTS) && (
                          <Tooltip title="Add Department" aria-label="add" onClick={()=>showModal()}>
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

const  DepartmentsView =(props:any)=>{
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('code');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openDeleteDepartmentModal, setopenDeleteDepartmentModal] = React.useState(false);
  
  const authUser=props?.getuserprofile;
  const rowss=props?.getdepartments
  const {role}=props?.getuserprofile;


  const [isAddMode, setisAddMode] = React.useState(true);
  const [department, setDepartment]= React.useState('')

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
  const _closeDeleteDepartmentModal=()=>setopenDeleteDepartmentModal(false)

  
  
  const _showAddDepartmentModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }



const _showEditDepartmentModal=(user:any)=>()=>{
  setDepartment(user)
  setisAddMode(false)
  setopenAddModal(true)
}


const _showDeleteDepartmentModal=(department:any)=>()=>{
  setDepartment(department)
  setopenDeleteDepartmentModal(true)
}

//searchDepartmentsAction
const _searchDepartmentValue=(e:any)=>{
  let value=e.target.value.trim();
  const onSuccess=(res:any)=>{
    console.log(res)
  }
  const onError=(res:any)=>{
    console.log(res)
  }
  props.searchDepartmentsAction(value,onSuccess,onError);
}

const  _handleChangestatus=(department:any)=>()=> {
  let data:any={};
  if(department.isActive){data.isActive=false;}else{data.isActive=true;}
  const onChangestatusSuccess=(res:any)=>{
      /*setIsLoading(false)*/
      const onSuccesGet=(res:any)=>{console.log(res)}
      const onErrorGet=(res:any)=>{console.log(res)}
      let message=department.username+" :status changed successfully";
      toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
      props.getDepartmentsAction(onSuccesGet,onErrorGet)

    }
  const onChangestatusError=(res:any)=>{
    toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
     //setIsLoading(false)
  }
   props.updateOperartorStatusAction(department.id,data,onChangestatusSuccess,onChangestatusError)
}



  /////end my custom function /////////////
    return (
         <>
            <div className="row">
                  <div className="col-12">
                      <div className={classes.root}>
                          <Paper className={classes.paper}>
                            <EnhancedTableToolbar numSelected={selected.length}
                             searchDepartmentValue={_searchDepartmentValue}
                              showModal={_showAddDepartmentModal()}/>
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
                                      showModal={_showAddDepartmentModal()}
                                    />
                                    <TableBody>
                                      {stableSort(rowss, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row:any, index:any) => {
                                          console.log(row.isActive)
                                          console.log(row.department)

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
                                              <TableCell align="left">{row.code && row.code}</TableCell>
                                              <TableCell align="left">{row.name && row.name}</TableCell>
                                              <TableCell align="left">{row.description && row.description}</TableCell>
                                              <TableCell align="left">
                                              {CAN(UserAction.Update,EntityUSERMODAbilty.DEPARTMENTS) && (
                                                 row.createdBy==authUser.id || role.name==USERROLES.SUPERADMIN?
                                                <Tooltip title={"Edit "+row.username}><IconButton onClick={_showEditDepartmentModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                              :''
                                              )} 
                                              {CAN(UserAction.Delete,EntityUSERMODAbilty.DEPARTMENTS) && (
                                              row.createdBy==authUser.id || role.name==USERROLES.SUPERADMIN?
                                                 <Tooltip title={"Delete "+row.username}><IconButton onClick={_showDeleteDepartmentModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
                                              :'')}
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
              <ModalAddDepartment openDepartmentModal={openAddModal} closeAddModal={_closeAddModal} department={isAddMode ? '':department} isAddMode={isAddMode}/>
            :''}

            {openDeleteDepartmentModal?
              <ModalDeleteDepartment openDepartmentModal={openDeleteDepartmentModal} closeDeleteDepartmentModal={_closeDeleteDepartmentModal} department={department}/>
            :''}
         </>
    )
    
    
}



    interface StateProps {
        departments: { getdepartments: any; };
        auth: { getuserprofile: any; };

    }
  
    const mapStateToProps = (state:StateProps) => {
        const { getdepartments } = state.departments;
        const  {getuserprofile}=state.auth;

        return { getdepartments,getuserprofile}
    };
    const mapDispatchToProps = (dispatch:any)=>{
        return {
            searchDepartmentsAction:(value:string,onSuccess:any,onError:any)=> dispatch(C5_getSearchDepartmentsAction(value,onSuccess,onError)),
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(DepartmentsView);