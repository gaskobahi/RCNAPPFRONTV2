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



import { C5_CreateSupplierAction, C5_getAllManagersbySupplierAction, C5_getSuppliersAction, C5_UpdateSupplierAction } from "../../../redux/actions/ProcurementsModule/suppliers";
import CAN from "../../../Ability/can";
import { EntityUSERMODAbilty, UserAction, USERROLES } from "../../../Ability/Actions";

import { NotFound } from "../../../Helpers/custom";
import MyLoadingPinner from "../../../components/Loading";

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
    openShowManagBySupplierModal: boolean;
    closeShowManagBySupplierModal: () => void;
    supplier: any;
    getmanagersbysupplier:any;
    getuserprofile:any;
    getAllManagersbySupplier:(supplierId:string,res:any,res1:any)=>void;  
  }
  



const ModalShowManagerBySupplier = (props:ModalAddSupplierProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
 const [onClose, setonClose] = useState(false);
 const [supplierId,setsupplierId]=useState('')
 const [isloading,setIsLoading]=useState(false)
 const [myloading, setMyLoading] = useState(true);

  const supplier:any = props?.supplier;
  const authUser=props?.getuserprofile;
  const {role}=props?.getuserprofile;


  let suppliersbymanagerArrayCode: Array<string> =[];


 


  const  closeModal=()=> {
    setMyLoading(false)
    props.closeShowManagBySupplierModal()   
  }
  

  const onSuccesGet=(res:any)=>{
    setTimeout(()=>{ setMyLoading(true)},500)
   
  }
  const onErrorGet=(res:any)=>{console.log(res)}

  const _getAllManagersbySupplier=()=>{
    setMyLoading(false)
    props.getAllManagersbySupplier(supplier.id,onSuccesGet,onErrorGet)

  }

  
  useEffect(() => {
    _getAllManagersbySupplier()
  }, []);


 
 props.getmanagersbysupplier &&  props.getmanagersbysupplier.map((sbym:any)=>suppliersbymanagerArrayCode.push(sbym.supplierId))

  return (
    <>
      <Modal
       open= {props.openShowManagBySupplierModal}
       onClose={closeModal}
       >
        <Container maxWidth="md">
              <form className={classes.form} autoComplete="off">
              <Card>
                <CardHeader
                    subheader="" title={"Show "+supplier.code +" - "+supplier.fullname+" 's Managers"}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                 
                    <Grid item md={12} xs={12}>
                      {myloading?
                      props.getmanagersbysupplier &&props.getmanagersbysupplier.length>0? 
                        <TableContainer component={Paper} className="table">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell className="tableCell">#</TableCell>
                              <TableCell className="tableCell">Date</TableCell>
                              <TableCell className="tableCell">Fullname</TableCell>
                              <TableCell className="tableCell">Phone</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                               {props.getmanagersbysupplier && props.getmanagersbysupplier.map((row:any, index:any) => {
                                  row.serial= index + 1;
                                return (
                                <TableRow key={index}> 
                                  <TableCell className="tableCell">{row.serial}</TableCell>
                                  <TableCell className="tableCell">{moment(row.date).format("DD/MM/YYYY HH:mm")}</TableCell>
                                  <TableCell className="tableCell">{row.fullname}</TableCell>
                                  <TableCell className="tableCell">{row.phone}</TableCell>
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
  const {getuserprofile}=state.auth;
  const { getmanagersbysupplier } = state.suppliers;

  
  return {getmanagersbysupplier,getuserprofile}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createSupplierAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateSupplierAction(data,onSuccess,onError)),
    updateSupplierAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateSupplierAction(id,data,onSuccess,onError)),
    getSuppliersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSuppliersAction(onSuccess,onError)),

       /////////managertosuplier //////
       getAllManagersbySupplier: (supplierId:string,onSuccess:any,onError:any)=> dispatch(C5_getAllManagersbySupplierAction(supplierId,onSuccess,onError)),

    
    

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalShowManagerBySupplier);