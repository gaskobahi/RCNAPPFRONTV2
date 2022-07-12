import {
  Container,
  makeStyles,
  Modal,
  Card,
  Grid,
  Divider,
  CardContent,
  CardHeader,
  TextField,
  Tooltip,
  Fab,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import IconButton from '@mui/material/IconButton';

import { Add as AddIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";

import { connect } from 'react-redux';
import {toast } from 'react-toastify';
import Paper from "@mui/material/Paper";

//import {C5_CreateSupplierAction} from '../../redux/actions/Suppliers/SuppliersActions';
//import {C5_EditSupplierAction} from '../../redux/actions/Suppliers/SuppliersActions';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';



import { C5_CreateSupplierAction, C5_getSuppliersAction, C5_UpdateSupplierAction } from "../../../redux/actions/ProcurementsModule/suppliers";
import CAN from "../../../Ability/can";
import { EntityUSERMODAbilty, UserAction, USERROLES } from "../../../Ability/Actions";

import { C5_AffectManagertoSupplierAction, C5_DeleteSuppliersbyManagerAction, C5_getAllSuppliersbyManagerAction } from "../../../redux/actions/ProcurementsModule/supmanagers";
import { NotFound } from "../../../Helpers/custom";
import MyLoadingPinner from "../../../components/Loading";
import { TYPESUPPLIER } from "../../../Helpers/helpMenuTree";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    width: 400,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));



  interface ModalAddSupplierProps {
    openSupmanagerModal: boolean;
    closeSupmanagerModal: () => void;
    supmanager: any;
    getsuppliers: any;
    getsuppliersbymanager:any;
    getuserprofile:any;
    createSupplierAction:(data:any,res:any,res1:any)=>void;
    updateSupplierAction:(id:string,data:any,res:any,res1:any)=>void;
    getSuppliersAction:(res:any,res1:any)=>void;   
    getAllSuppliersbyManager:(supmanagerId:string,res:any,res1:any)=>void;  
    deleteSuppliersbyManager:(managerTosupId:string,res:any,res1:any)=>void;  
    affectManagertoSupplier:(data:any,res:any,res1:any)=>void;  

    
    
  }
  



const ModalAddManagerToSupplier = (props:ModalAddSupplierProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
 const [onClose, setonClose] = useState(false);
 const [supplierId,setsupplierId]=useState('')
 const [isloading,setIsLoading]=useState(false)
 const [myloading, setMyLoading] = useState(true);

  const supmanager:any = props?.supmanager;
  const authUser=props?.getuserprofile;
  const {role}=props?.getuserprofile;


  let suppliersbymanagerArrayCode: Array<string> =[];

 
  
  const _ondeleteSuppliersbyManager = (supToManage:any)=>()=>{
      const onSuccess=(res:any)=>{ 
        props.getAllSuppliersbyManager(supToManage.supmanagerId,onSuccesGet,onErrorGet)
      }
      const onError=(res:any)=>{ }
      props.deleteSuppliersbyManager(supToManage.id,onSuccess,onError)
   }

 const _affectManagertoSupplier =()=>{
  let data={supmanagerId:"",supplierId:""}
      if(supplierId!=''){
        data.supmanagerId=supmanager.id;
        data.supplierId=supplierId;
          const onSuccess=(res:any)=>{ 
            props.getAllSuppliersbyManager(supmanager.id,onSuccesGet,onErrorGet)
          }
          const onError=(res:any)=>{ }
          props.affectManagertoSupplier(data,onSuccess,onError)
      }
  }

   

  
  


  const  closeModal=()=> {
    setMyLoading(false)
    props.closeSupmanagerModal()   
  }
  

  const onSuccesGet=(res:any)=>{
    setTimeout(()=>{ setMyLoading(true)},500)
   
  }
  const onErrorGet=(res:any)=>{console.log(res)}

  const _getAllSuppliersbyManager=()=>{
    setMyLoading(false)
    props.getAllSuppliersbyManager(supmanager.id,onSuccesGet,onErrorGet)

  }

  
  useEffect(() => {
    _getAllSuppliersbyManager()
  }, []);


 
 props.getsuppliersbymanager &&  props.getsuppliersbymanager.map((sbym:any)=>suppliersbymanagerArrayCode.push(sbym.supplierId))

  return (
    <>
      <Modal
       open= {props.openSupmanagerModal}
       onClose={closeModal}
       >
        <Container maxWidth="md">
              <form className={classes.form} autoComplete="off">
              <Card>
                <CardHeader
                    subheader="" title={"Affect "+supmanager.phone +"-"+supmanager.fullname+" To Supplier"}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                    <Grid item md={10} xs={10}>
                        <TextField
                            select
                            label="Select Supplier *"
                            name="supplierId"
                            SelectProps={{ native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            onChange={(e:any)=>setsupplierId(e.target.value)}
                          >
                              <option value=""></option>
                              {
                                props.getsuppliers && props.getsuppliers.filter((dt:any)=>dt.type==TYPESUPPLIER.COOPERATIVE).map((data:any,index:any) =>{
                                  var td:boolean;
                                  td=suppliersbymanagerArrayCode.includes(data.id);
                                  if(!td){
                                    return <option value={data.id} key={index}>{data.phone+" - "+data.fullname}</option>
                                  }
                                })
                              }
                          </TextField>
                    </Grid>
                      <Grid item md={2} xs={2}>
                        {CAN(UserAction.Create,EntityUSERMODAbilty.SUPMANAGERS) && (
                              <Tooltip title="Affect Supplier" aria-label="add" onClick={_affectManagertoSupplier}>
                                  <Fab color="secondary" size='small'> 
                                    <AddIcon />
                                  </Fab>
                            </Tooltip>
                          )}
                      </Grid>
                      <Grid item md={12} xs={12}>
                      {myloading?
                      props.getsuppliersbymanager &&props.getsuppliersbymanager.length>0? 
                        <TableContainer component={Paper} className="table">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell className="tableCell">#</TableCell>
                              <TableCell className="tableCell">Date</TableCell>
                              <TableCell className="tableCell">Fullname</TableCell>
                              <TableCell className="tableCell">Phone</TableCell>
                              <TableCell className="tableCell">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                               {props.getsuppliersbymanager && props.getsuppliersbymanager.map((row:any, index:any) => {
                                  row.serial= index + 1;
                                return (
                                <TableRow key={index}> 
                                  <TableCell className="tableCell">{row.serial}</TableCell>
                                  <TableCell className="tableCell">{moment(row.date).format("DD/MM/YYYY HH:mm")}</TableCell>
                                  <TableCell className="tableCell">{row.fullname}</TableCell>
                                  <TableCell className="tableCell">{row.phone}</TableCell>
                                  <TableCell className="tableCell">
                                        {CAN(UserAction.Delete,EntityUSERMODAbilty.SUPMANAGERS) && (
                                                   row.createdBy==authUser.id || role.name==USERROLES.PRMTADMIN || role.name==USERROLES.SUPERADMIN?
                                                    <Tooltip title={"Delete "+row.serial}><IconButton  color="error" onClick={_ondeleteSuppliersbyManager(row)} > <DeleteIcon/></IconButton></Tooltip>
                                                   :'-'
                                                  )}
                                  </TableCell>
                                </TableRow>
                              )})}
                          </TableBody>
                        </Table>
                        </TableContainer>
                        :<NotFound/>
                      :<MyLoadingPinner/>
                        }
                      </Grid>
                    </Grid>
                 </CardContent>
              </Card>
              </form>
        
        </Container>
      </Modal>
     
    </>
  );
};


const mapStateToProps = (state:any) => {
  const {getsuppliers } = state.suppliers;
  const {getuserprofile}=state.auth;
  const { getsuppliersbymanager } = state.supmanagers;

  
  return {getsuppliers,getsuppliersbymanager,getuserprofile}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createSupplierAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateSupplierAction(data,onSuccess,onError)),
    updateSupplierAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateSupplierAction(id,data,onSuccess,onError)),
    getSuppliersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSuppliersAction(onSuccess,onError)),

       /////////managertosuplier //////
    getAllSuppliersbyManager: (supmanagerId:string,onSuccess:any,onError:any)=> dispatch(C5_getAllSuppliersbyManagerAction(supmanagerId,onSuccess,onError)),
    deleteSuppliersbyManager: (managerTosupId:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteSuppliersbyManagerAction(managerTosupId,onSuccess,onError)),
    affectManagertoSupplier: (data:any,onSuccess:any,onError:any)=> dispatch(C5_AffectManagertoSupplierAction(data,onSuccess,onError)),

    
    

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddManagerToSupplier);