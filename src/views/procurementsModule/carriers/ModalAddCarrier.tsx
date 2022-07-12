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
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import LoadingButton from '@mui/lab/LoadingButton';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
//import { useAlert } from 'react-alert'
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toast } from 'react-toastify';

//import {C5_CreateCarrierAction} from '../../redux/actions/Carriers/CarriersActions';
//import {C5_EditCarrierAction} from '../../redux/actions/Carriers/CarriersActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreateCarrierAction, C5_getCarriersAction, C5_UpdateCarrierAction } from "../../../redux/actions/ProcurementsModule/carriers";
import CAN from "../../../Ability/can";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import ModalAddPlace from "../../locationsModule/places/ModalAddPlace";
import { C5_getPlacesAction } from "../../../redux/actions/LocationsModule/places";
import { emailRegExp, phoneRegExp, regexCoords } from "../../../Helpers/helpMenuTree";
import { usePrevious } from "../../../Helpers/custom";

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



  interface ModalAddCarrierProps {
    openCarrierModal: boolean;
    closeAddModal: () => void;
    carrier: any;
    isAddMode: boolean;
    createCarrierAction:(data:any,res:any,res1:any)=>void;
    updateCarrierAction:(id:string,data:any,res:any,res1:any)=>void;
    getCarriersAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddCarrier = (props:ModalAddCarrierProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
 
 const [onClose, setonClose] = useState(false);
 const [openAddPlaceModal, setopenAddPlaceModal] =useState(false);


  const carrier:any = props?.carrier;
  const isAddMode=props?.isAddMode;
  const prevCarrier:any = usePrevious(carrier);

       
  const formSchema = Yup.object().shape({
      fullname: Yup.string().trim()
      .min(2, 'Fullname must be at 2 char short')
      .required('Fullname is mandatory')
      .max(35, 'Fullname must be at 35 char long'),
      phone: Yup.string().required('Phone is mandatory').matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Phone must be at 10 char short')
      .max(15, 'Phone must be at 15 char long'),
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createCarrier=(data:any)=> {
      const onCreateCarrierSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(res.fullname+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getCarriersAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateCarrierError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createCarrierAction(data,onCreateCarrierSuccess,onCreateCarrierError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditCarrier=(data:any)=> {
   const onUpdateCarrierSuccess=(res:any)=>{
      reset();
      setIsLoading(false)
      toast.success(" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getCarriersAction(onSuccesGet,onErrorGet)
      props.closeAddModal()   
    }
  
    const onUpdateCarrierError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }
    if(prevCarrier.fullname!=data.fullname || prevCarrier.phone!=data.phone){
      props.updateCarrierAction(data.id,data,onUpdateCarrierSuccess,onUpdateCarrierError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
      

  }





  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createCarrier(data):EditCarrier(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddPlaceModal=()=>setopenAddPlaceModal(false)

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', carrier.id)
      setValue('fullname', carrier.fullname)
      setValue('phone', carrier.phone)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openCarrierModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Carrier":"Edit Carrier : "+props.carrier.serial}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={8} xs={8} >
                          <TextField fullWidth label="Fullname *" variant="outlined" defaultValue=''
                              placeholder='Enter Fullname' autoFocus
                              {...register("fullname")}
                              size="small"
                              helperText={errors.fullname?.message}
                              error={errors.fullname?true :false}/>
                      </Grid>
                      <Grid item md={4} xs={4} >
                          <TextField fullWidth label="Phone *" variant="outlined" 
                              placeholder='Enter Phone' 
                              {...register("phone")}
                              size="small"
                              helperText={errors.phone?.message}
                              error={errors.phone?true :false}
                            />
                      </Grid>
                      <Grid item md={12} xs={12}> </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container item md={12} xs={12}  justifyContent='flex-end' style={{marginTop:10}}>  
                      <br/>
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                        <LoadingButton  type="submit" variant="contained" color="success"    loadingPosition="start" startIcon={<SaveIcon />}
                          loading={isloading}>
                              Save  
                        </LoadingButton>
                    </Grid>
                 </CardContent>
              </Card>
              </form>
        
        </Container>
      </Modal>
      {openAddPlaceModal?
              <ModalAddPlace openPlaceModal={openAddPlaceModal} closeAddModal={_closeAddPlaceModal} place={''} isAddMode={true}/>
                    :''}
    </>
  );
};


const mapStateToProps = (state:any) => {

  return { }
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createCarrierAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateCarrierAction(data,onSuccess,onError)),
    updateCarrierAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateCarrierAction(id,data,onSuccess,onError)),
    getCarriersAction: (onSuccess:any,onError:any)=> dispatch(C5_getCarriersAction(onSuccess,onError)),
             

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddCarrier);