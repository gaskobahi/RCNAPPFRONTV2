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

//import {C5_CreateSupplierAction} from '../../redux/actions/Suppliers/SuppliersActions';
//import {C5_EditSupplierAction} from '../../redux/actions/Suppliers/SuppliersActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreateSupplierAction, C5_getSuppliersAction, C5_UpdateSupplierAction } from "../../../redux/actions/ProcurementsModule/suppliers";
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



  interface ModalAddSupplierProps {
    openSupplierModal: boolean;
    closeAddModal: () => void;
    supplier: any;
    getplaces: any;
    isAddMode: boolean;
    createSupplierAction:(data:any,res:any,res1:any)=>void;
    updateSupplierAction:(id:string,data:any,res:any,res1:any)=>void;
    getSuppliersAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddSupplier = (props:ModalAddSupplierProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);
 const [openAddPlaceModal, setopenAddPlaceModal] =useState(false);


  const supplier:any = props?.supplier;
  const isAddMode=props?.isAddMode;
  const prevSupplier:any = usePrevious(supplier);

  const handleClose = (event:any, reason:any) => {
    if (reason === "clickaway") {
      return;
    }
  };

    
  const formSchema = Yup.object().shape({
      code: Yup.string()
      .required('Code is mandatory')
      .min(5, 'Code must be at 5 char short')
      .max(20, 'Code must be at 20 char long'),
      fullname: Yup.string().trim()
      .min(2, 'Name must be at 2 char short')
      .required('Name is mandatory')
      .max(35, 'Name must be at 35 char long'),
      identitycard: Yup.string().required('CNI is mandatory')
      .min(5, 'CNI must be at 5 char short')
      .max(20, 'CNI must be at 20 char long'),
      type: Yup.string().trim()
      .required('Type is mandatory'),
      phone: Yup.string().required('Phone is mandatory').matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Phone must be at 10 char short')
      .max(15, 'Phone must be at 15 char long'),
      placeId: Yup.string().required('Place is mandatory'),
      email: Yup.lazy((value) => (value === '' ? Yup.string().required('Email is mandatory'): Yup.string().matches(emailRegExp, 'Email is not valid').trim())),
      gps: Yup.lazy((value) => (value === '' ? Yup.string(): Yup.string().matches(regexCoords, 'Gps coords are not valid').trim())),

      
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createSupplier=(data:any)=> {
      const onCreateSupplierSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(res.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getSuppliersAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateSupplierError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createSupplierAction(data,onCreateSupplierSuccess,onCreateSupplierError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditSupplier=(data:any)=> {
   const onUpdateSupplierSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(data.code+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getSuppliersAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateSupplierError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }
    
    if(prevSupplier.code!=data.code || prevSupplier.fullname!=data.fullname || prevSupplier.type!=data.type || 
       prevSupplier.identitycard!=data.identitycard ||prevSupplier.phone!=data.phone
       || prevSupplier.email!=data.email || prevSupplier.placeId!=data.placeId || prevSupplier.gps!=data.gps){
        props.updateSupplierAction(data.id,data,onUpdateSupplierSuccess,onUpdateSupplierError)
    }else{
        setIsLoading(false);
        props.closeAddModal();
    }
   
  }

  const _showAddPlaceModal=()=>{
    setopenAddPlaceModal(true)
  }




  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createSupplier(data):EditSupplier(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddPlaceModal=()=>setopenAddPlaceModal(false)

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', supplier.id)
      setValue('code', supplier.code)
      setValue('fullname', supplier.fullname)
      setValue('type', supplier.type)
      setValue('identitycard', supplier.identitycard)
      setValue('phone', supplier.phone)
      setValue('email', supplier.email)
      setValue('placeId', supplier.placeId)
      setValue('gps', supplier.gps)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openSupplierModal}>
        <Container maxWidth="md">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Supplier":"Edit Supplier : "+props.supplier.code}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={4} >
                            <TextField fullWidth label="Code *" variant="outlined" defaultValue=''
                                placeholder='Enter Code' autoFocus
                                {...register("code")}
                                size="small"
                                helperText={errors.code?.message}
                                error={errors.code?true :false}/>
                      </Grid>
                      <Grid item md={8} xs={8} >
                          <TextField fullWidth label="Name *" variant="outlined" defaultValue=''
                              placeholder='Enter Name' autoFocus
                              {...register("fullname")}
                              size="small"
                              helperText={errors.fullname?.message}
                              error={errors.fullname?true :false}/>
                      </Grid>
                      <Grid item md={5} xs={5} >
                          <TextField fullWidth label="Phone *" variant="outlined" 
                              placeholder='Enter Phone' 
                              {...register("phone")}
                              size="small"
                              helperText={errors.phone?.message}
                              error={errors.phone?true :false}
                            />
                      </Grid>
                      <Grid item md={7} xs={7} >
                        <TextField fullWidth label="CNI Number *" variant="outlined"
                            placeholder='Enter CNI Number'{...register("identitycard")}
                            size="small"
                            helperText={errors.identitycard?.message}
                            error={errors.identitycard?true :false}/>
                      </Grid>
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Type *"
                            {...register("type")}
                            SelectProps={{ native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.type?.message}
                            error={errors.type?true :false}
                          >
                              <option value=""></option>
                              <option value="COOPERATIVE">COOPERATIVE</option>
                              <option value="INDIVIDUAL">INDIVIDUAL</option>

                          </TextField>
                      </Grid>
                      <Grid item md={7} xs={7} >
                          <TextField fullWidth label="Email *" variant="outlined" 
                              placeholder='Enter Email' 
                              {...register("email")}
                              size="small"
                              helperText={errors.email?.message}
                              error={errors.email?true :false}
                            />
                      </Grid>
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Place *"
                            {...register("placeId")}
                            SelectProps={{ native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.placeId?.message}
                            error={errors.placeId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getplaces && props.getplaces.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.name}</option>
                                ))
                              }
                          </TextField>
                      </Grid>
                      <Grid item md={2} xs={2}>
                        {CAN(UserAction.Create,EntityUSERMODAbilty.PLACES) && (
                              <Tooltip title="Add Place" aria-label="add" onClick={_showAddPlaceModal}>
                                  <Fab color="secondary" size='small'> 
                                    <AddIcon />
                                  </Fab>
                            </Tooltip>
                          )}
                      </Grid>
                      <Grid item md={5} xs={5} >
                          <TextField fullWidth label="Gps Coords" variant="outlined" 
                              placeholder='Ex:  00xxxx,-55xxxx' 
                              {...register("gps")}
                              size="small"
                              helperText={errors.gps?.message}
                              error={errors.gps?true :false}
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
  const { getplaces } = state.places;

  return { getplaces}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createSupplierAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateSupplierAction(data,onSuccess,onError)),
    updateSupplierAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateSupplierAction(id,data,onSuccess,onError)),
    getSuppliersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSuppliersAction(onSuccess,onError)),


    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddSupplier);