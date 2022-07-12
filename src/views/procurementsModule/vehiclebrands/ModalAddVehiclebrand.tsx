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

//import {C5_CreateVehiclebrandAction} from '../../redux/actions/Vehiclebrands/VehiclebrandsActions';
//import {C5_EditVehiclebrandAction} from '../../redux/actions/Vehiclebrands/VehiclebrandsActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreateVehiclebrandAction, C5_getVehiclebrandsAction, C5_UpdateVehiclebrandAction } from "../../../redux/actions/ProcurementsModule/vehiclebrands";
import ModalAddPlace from "../../locationsModule/places/ModalAddPlace";
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



  interface ModalAddVehiclebrandProps {
    openVehiclebrandModal: boolean;
    closeAddModal: () => void;
    vehiclebrand: any;
    getplaces: any;
    isAddMode: boolean;
    createVehiclebrandAction:(data:any,res:any,res1:any)=>void;
    updateVehiclebrandAction:(id:string,data:any,res:any,res1:any)=>void;
    getVehiclebrandsAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddVehiclebrand = (props:ModalAddVehiclebrandProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
 
 const [onClose, setonClose] = useState(false);
 const [openAddPlaceModal, setopenAddPlaceModal] =useState(false);


  const vehiclebrand:any = props?.vehiclebrand;
  const isAddMode=props?.isAddMode;
  const prevVehiclebrand:any =usePrevious(vehiclebrand);


  
  const formSchema = Yup.object().shape({
       name: Yup.string().trim()
      .min(2, 'Name must be at 2 char short')
      .required('Name is mandatory')
      .max(35, 'Name must be at 35 char long'),
  
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createVehiclebrand=(data:any)=> {
      const onCreateVehiclebrandSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(res.name+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getVehiclebrandsAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateVehiclebrandError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createVehiclebrandAction(data,onCreateVehiclebrandSuccess,onCreateVehiclebrandError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditVehiclebrand=(data:any)=> {
   const onUpdateVehiclebrandSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getVehiclebrandsAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateVehiclebrandError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }
    if(prevVehiclebrand.name!=data.name){
      props.updateVehiclebrandAction(data.id,data,onUpdateVehiclebrandSuccess,onUpdateVehiclebrandError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
  }

  



  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createVehiclebrand(data):EditVehiclebrand(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddPlaceModal=()=>setopenAddPlaceModal(false)

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', vehiclebrand.id)
      setValue('name', vehiclebrand.name)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openVehiclebrandModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Vehicle Brand":"Edit Vehicle Brand "+props.vehiclebrand.name}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={12} xs={12} >
                          <TextField fullWidth label="Name *" variant="outlined" defaultValue=''
                              placeholder='Enter Name' autoFocus
                              {...register("name")}
                              size="small"
                              helperText={errors.name?.message}
                              error={errors.name?true :false}/>
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
  const { getplaces } = state.places;

  return { getplaces}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createVehiclebrandAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateVehiclebrandAction(data,onSuccess,onError)),
    updateVehiclebrandAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateVehiclebrandAction(id,data,onSuccess,onError)),
    getVehiclebrandsAction: (onSuccess:any,onError:any)=> dispatch(C5_getVehiclebrandsAction(onSuccess,onError)),
             

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddVehiclebrand);