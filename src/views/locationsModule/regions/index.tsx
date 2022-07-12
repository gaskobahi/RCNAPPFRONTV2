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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CAN from "../../../Ability/can";
import {UserAction,EntityUSERMODAbilty, USERROLES} from '../../../Ability/Actions'
import { connect } from 'react-redux';
import ModalDeleteRegion from './ModalDeleteRegion'
import { MyLoading, NotFound } from '../../../Helpers/custom';
import ModalAddRegion from './ModalAddRegion';
import { C5_DeleteRegionAction, C5_getSearchRegionsAction, C5_getRegionsAction } from '../../../redux/actions/LocationsModule/regions';
import { toast } from 'react-toastify';
import { SearchRegion } from '../../../Helpers/Dto/locationModule';
import MyLoadingPinner from '../../../components/Loading';
import moment from 'moment';
import { SETINTERVALREFRESHDATAVALUE } from '../../../Helpers/custom/myparameters';
import MyConfirmModal from '../../../components/confirmModal';
import { CountValue } from '../../../Helpers/helpMenuTree';

interface Data {
  id: string;
  serial: number;
  code: string;
  name: string;
  nbplace: string;
  description:string;
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
  { id: 'code', numeric: false, disablePadding: false, label: 'Code' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'nbplace', numeric: false, disablePadding: false, label: 'Place Number' },
  
  { id: 'user_createdBy', numeric: false, disablePadding: false, label: 'Created By' },
  { id: 'user_createdAt', numeric: false, disablePadding: false, label: 'Created At' },
  { id: 'user_updatedBy', numeric: false, disablePadding: false, label: 'Updated By' },
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
  searchRegionValue:any;
  showModal:()=>void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected,searchRegionValue,showModal } = props;


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
                <TextField fullWidth label="Search Regions"  onKeyUp={searchRegionValue}  placeholder="Search Regions" size='small' />
            </li>
            {/* user profile */}
          
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {CAN(UserAction.Create,EntityUSERMODAbilty.REGIONS) && (
                          <Tooltip title="Add Region" aria-label="add" onClick={()=>showModal()}>
                              <Fab color="primary" size='medium'> 
                                <AddIcon />
                              </Fab>
                        </Tooltip>
               )}
            </li>
         
            {/*<li className="nav-item">
              <a className="nav-link"   role="button">
                <FilterListIcon/>
              </a>
            </li>
              */}
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

let sRegion:SearchRegion={value:''};
const  RegionsView =(props:any)=>{
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('code');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openAddModal, setopenAddModal] = React.useState(false);
  const [openDeleteRegionModal, setopenDeleteRegionModal] = React.useState(false);
  const [myloading, setMyLoading] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [childrenDelete, setChildrenDelete]= React.useState('')

  const authUser=props?.getuserprofile;
  const rowss=props?.getregions
  const {role}=props?.getuserprofile;


  const [isAddMode, setisAddMode] = React.useState(true);
  const [region, setRegion]= React.useState({id:'',serial:'',code:''})

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
  const _closeDeleteRegionModal=()=>setopenDeleteRegionModal(false)

  
  
  const _showAddRegionModal=()=>()=>{
    setisAddMode(true)
    setopenAddModal(true)
  }



const _showEditRegionModal=(user:any)=>()=>{
  setRegion(user)
  setisAddMode(false)
  setopenAddModal(true)
}



//searchRegionsAction
const _searchRegionValue=(e:any)=>{
  let value=e.target.value.trim();
  sRegion={...sRegion,value:value}
  const onSuccess=(res:any)=>{
    //console.log(res)
    setMyLoading(true)
  }
  const onError=(res:any)=>{
    //console.log(res)
  }
  setMyLoading(false)
  props.searchRegionsAction(sRegion,onSuccess,onError);
}

const _showDeleteRegionModal=(region:any)=>()=>{
  setRegion(region)
  let childDelete= "Warning!! This Region "+ region.code + " will be definitevely deleted";
  setChildrenDelete(childDelete)
  setopenDeleteRegionModal(true)
}


const  _handledeleteRegion=()=> {
  let {id,serial,code}=region;
  const onDeleteRegionSuccess=(res:any)=>{
      const onSuccesGet=(res:any)=>{
        setButtonLoading(false)
        setopenDeleteRegionModal(false)
      }
      const onErrorGet=(res:any)=>{/*console.log(res)*/}
      let message=code+" deleted successfully";
      toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getRegionAction(onSuccesGet,onErrorGet)

    }
  const onDeleteRegionError=(res:any)=>{
    let message409="Relation conflict"
    res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    setButtonLoading(false)
    // props.closeDeleteRegionModal(); 
  }
  setButtonLoading(true)
   props.deleteRegionAction(id,onDeleteRegionSuccess,onDeleteRegionError)

}




const onSuccess=(res:any)=>{/*console.log(res)*/}
const onError=(res:any)=>{/*console.log(res)*/}

useEffect(() => {
  sRegion={...sRegion,value:""}
  const updateInfo = setInterval(() => {
    props.searchRegionsAction(sRegion,onSuccess,onError)
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
                             searchRegionValue={_searchRegionValue}
                              showModal={_showAddRegionModal()}/>

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
                                        showModal={_showAddRegionModal()}
                                      />
                                      <TableBody>
                                        {stableSort(rowss, getComparator(order, orderBy))
                                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                          .map((row:any, index:any) => {
                                            //console.log(row.isActive)
                                            //console.log(row.region)

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
                                                <TableCell align="center">{row.code && row.code}</TableCell>
                                                <TableCell align="center">{row.name && row.name}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                                <TableCell align="center">{CountValue(row.nbPlace)}</TableCell>
                                                <TableCell align="center">{row.user_createdBy?row.user_createdBy:'-' }</TableCell>
                                                <TableCell align="center">{row.createdAt?row.createdAt && moment(row.createdAt).format("DD/MM/YYYY HH:mm"):'-'}</TableCell>
                                                <TableCell align="center">{row.user_updatedBy?row.user_updatedBy:'-'}</TableCell>
                                                <TableCell align="center">{row.updatedAt?row.updatedAt && moment(row.updatedAt).format("DD/MM/YYYY HH:mm"):'-'}</TableCell>
                                                <TableCell align="right">
                                                  {CAN(UserAction.Update,EntityUSERMODAbilty.REGIONS) && (
                                                      row.createdBy==authUser.id || role.name==USERROLES.SUPERADMIN?
                                                      <Tooltip title={"Edit "+row.code}><IconButton onClick={_showEditRegionModal(row)} color="success"><EditIcon/></IconButton></Tooltip>    
                                                      :''
                                                    )} 
                                                  {CAN(UserAction.Delete,EntityUSERMODAbilty.REGIONS) && (
                                                    row.createdBy==authUser.id || role.name==USERROLES.SUPERADMIN?
                                                      <Tooltip title={"Delete "+row.code}><IconButton onClick={_showDeleteRegionModal(row)} color="error"> <DeleteIcon/></IconButton></Tooltip>
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
                            {/*<FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                          />*/}
                      </div>
                </div>
            </div>
            {openAddModal?
              <ModalAddRegion openRegionModal={openAddModal} closeAddModal={_closeAddModal} region={isAddMode ? '':region} isAddMode={isAddMode}/>
            :''}

             {openDeleteRegionModal?
                <MyConfirmModal  title="Delete Region?"  open={openDeleteRegionModal}  setOpen={setopenDeleteRegionModal} 
                 onConfirm={_handledeleteRegion} buttonLoading={buttonLoading}>
                   {childrenDelete}
                </MyConfirmModal>   
              :''}

           
         </>
    )
    
    
}



    interface StateProps {
        auth:{getuserprofile:any};
        regions: { getregions: any; };
    }
  
    const mapStateToProps = (state:StateProps) => {
        const  {getuserprofile}=state.auth;
        const { getregions } = state.regions;
        return { getregions,getuserprofile}
    };
    const mapDispatchToProps = (dispatch:any)=>{
        return {
            getRegionAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError)),
            searchRegionsAction:(value:SearchRegion,onSuccess:any,onError:any)=> dispatch(C5_getSearchRegionsAction(value,onSuccess,onError)),
            deleteRegionAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteRegionAction(id,onSuccess,onError)),
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(RegionsView);