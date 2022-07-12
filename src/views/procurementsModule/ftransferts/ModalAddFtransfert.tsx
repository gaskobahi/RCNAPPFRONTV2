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
  FormControlLabel,
  Switch,
  Input,
  Button,
  IconButton,
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
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
//import {C5_CreateFtransfertAction} from '../../redux/actions/Ftransferts/FtransfertsActions';
//import {C5_EditFtransfertAction} from '../../redux/actions/Ftransferts/FtransfertsActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { emailRegExp, phoneRegExp, regexCoords } from "../../../Helpers/helpMenuTree";
import { C5_CreateFtransfertAction, C5_getFtransfertsAction, C5_UpdateFtransfertAction } from "../../../redux/actions/ProcurementsModule/ftransferts";
import CAN from "../../../Ability/can";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import ModalAddSupplier from "../suppliers/ModalAddSupplier";
import ModalAddVehicle from "../vehicles/ModalAddVehicle";
import ModalAddCarrier from "../carriers/ModalAddCarrier";
import ModalAddTrailer from "../trailers/ModalAddTrailer";
import ModalAddDriver from "../drivers/ModalAddDriver";
import { FILETRANSFERTTYPER } from "../../../Helpers/custom/myparameters";
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



  interface ModalAddFtransfertProps {
    openFtransfertModal: boolean;
    closeAddModal: () => void;
    ftransfert: any;
    getsuppliers:any;
    gettrailers:any;
    getvehicles:any;
    getcarriers:any;
    getdrivers:any;
    isAddMode: boolean;
    createFtransfertAction:(data:FormData,res:any,res1:any)=>void;
    updateFtransfertAction:(id:string,data:any,res:any,res1:any)=>void;
    getFtransfertsAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddFtransfert = (props:ModalAddFtransfertProps) => {
  const classes = useStyles();
  


 const [openAddSupplierModal, setopenAddSupplierModal]=useState(false);
 const [openAddTrailerModal, setopenAddTrailerModal]=useState(false);
 const [openAddVehicleModal, setopenAddVehicleModal]=useState(false);
 const [openAddCarrierModal, setopenAddCarrierModal]=useState(false);
 const [openAddDriverModal, setopenAddDriverModal]=useState(false);


  const ftransfert:any = props?.ftransfert;
  const prevFtransfert:any =usePrevious(ftransfert);

  const isAddMode=props?.isAddMode;

  

    
  const formSchema = Yup.object().shape({
      date:Yup.string().required('Date is mandatory'),
      code: Yup.string().trim()
      .min(2, 'File Transfert number must be at 2 char short')
      .required('File Transfert number is File Transfert')
      .max(20, 'File Transfert number must be at 20 char long'),
      stickerno: Yup.string().trim()
      .min(2, 'Sticker number must be at 2 char short')
      .required('Sticker number is File Transfert')
      .max(20, 'Sticker number must be at 20 char long'),
      type: Yup.string().trim()
      .required('File Transfert Type is mandatory'),
      supplierId: Yup.string()
      .required('Supplier is mandatory'),
      /*vehicleId: Yup.string()
      .required('Vehicle is mandatory'),*/
      vehicleId: Yup.string()
      .transform(x => x === null ? '' : x)
        .when('type', {
          is: (type:any) => type == FILETRANSFERTTYPER.FDT,
          then: Yup.string()
            .required('Vehicle is mandatory')            
        }),
      trailerId: Yup.string()
      .transform(x => x === null ? '' : x)
      .when('type', {
        is: (type:any) => type == FILETRANSFERTTYPER.FDT,
        then: Yup.string()
          .required('Trailer is mandatory')            
      }),
      carrierId: Yup.string()
      .transform(x => x === null ? '' : x)
      .when('type', {
        is: (type:any) => type == FILETRANSFERTTYPER.FDT,
        then: Yup.string()
          .required('Carrier is mandatory')            
      }),
      driverId: Yup.string()
      .transform(x => x === null ? '' : x)
      .when('type', {
        is: (type:any) => type == FILETRANSFERTTYPER.FDT,
        then: Yup.string()
          .required('Driver is mandatory')            
      }),
      photo: Yup.mixed()
      .transform(x => x === '' ? null : x)
      .concat(isAddMode ? Yup.mixed().required('File Transfert file is mandatory'):Yup.mixed())
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createFtransfert=(data:any)=> {
      const onCreateFtransfertSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getFtransfertsAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateFtransfertError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }

      let formData = new FormData();
      formData.append('photo',data.photo);
      formData.append('date',data.date);
      formData.append('code',data.code);
      formData.append('stickerno',data.stickerno);
      formData.append('type',data.type)
      formData.append('supplierId',data.supplierId);
      formData.append('trailerId',data.trailerId);
      formData.append('vehicleId',data.vehicleId);
      formData.append('carrierId',data.carrierId);
      formData.append('driverId',data.driverId);
      props.createFtransfertAction(formData,onCreateFtransfertSuccess,onCreateFtransfertError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditFtransfert=(data:any)=> {
   const onUpdateFtransfertSuccess=(res:any)=>{
      reset();
      setIsLoading(false)
      toast.success(data.code+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getFtransfertsAction(onSuccesGet,onErrorGet)
      props.closeAddModal()   
    }
  
    const onUpdateFtransfertError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)
    }
    let formData = new FormData();
      if(data.photo){formData.append('photo',data.photo)}
      formData.append('date',data.date);
      formData.append('code',data.code);
      formData.append('stickerno',data.stickerno);
      formData.append('type',data.type)
      formData.append('supplierId',data.supplierId);
      formData.append('trailerId',data.trailerId);
      formData.append('vehicleId',data.vehicleId);
      formData.append('carrierId',data.carrierId);
      formData.append('driverId',data.driverId);
  
      if (data.supplierId==''){data.supplierId=null}
      if (data.trailerId==''){data.trailerId=null}
      if (data.vehicleId==''){data.vehicleId=null}
      if (data.carrierId==''){data.carrierId=null}
      if (data.driverId==''){data.driverId=null}

        if(!data.photo==undefined || moment(prevFtransfert.date).format("YYYY-MM-DDTHH:mm")!=moment(data.date).format("YYYY-MM-DDTHH:mm") ||
            prevFtransfert.code!=data.code || prevFtransfert.stickerno!=data.stickerno || prevFtransfert.type!=data.type ||
            prevFtransfert.supplierId!=data.supplierId || prevFtransfert.trailerId!=data.trailerId || prevFtransfert.vehicleId!=data.vehicleId ||
            prevFtransfert.carrierId!=data.carrierId || prevFtransfert.driverId!=data.driverId 
          ){
            props.updateFtransfertAction(data.id,formData,onUpdateFtransfertSuccess,onUpdateFtransfertError)
        }else{
         setIsLoading(false);
         props.closeAddModal();
         }
  }


  const _showAddSupplierModal=()=>{
    setopenAddSupplierModal(true)
  }
  
  const _showAddTrailerModal=()=>{
    setopenAddTrailerModal(true)
  }
  const _showAddVehicleModal=()=>{
    setopenAddVehicleModal(true)
  }

  const _showAddCarrierModal=()=>{
    setopenAddCarrierModal(true)
  }

  const _showAddDriverModal=()=>{
    setopenAddDriverModal(true)
  }
  
  
  const onSubmit = (data:any,e:any) =>{
    e.preventDefault();
      return isAddMode ? createFtransfert(data):EditFtransfert(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddSupplierModal=()=>setopenAddSupplierModal(false)
  const _closeAddTrailerModal=()=>setopenAddTrailerModal(false)
  const _closeAddVehicleModal=()=>setopenAddVehicleModal(false)
  const _closeAddCarrierModal=()=>setopenAddCarrierModal(false)
  const _closeAddDriverModal=()=>setopenAddDriverModal(false)

  
  

   const onInputChange=(e:any)=>{
     setValue('photo',e.target.files[0])

   }
  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', ftransfert.id)
      setValue('date', moment(ftransfert.date).format("YYYY-MM-DDTHH:mm"))
      setValue('code', ftransfert.code)
      setValue('stickerno', ftransfert.stickerno)
      setValue('type', ftransfert.type)
      setValue('supplierId', ftransfert.supplierId)
      setValue('trailerId', ftransfert.trailerId)
      setValue('vehicleId', ftransfert.vehicleId)
      setValue('carrierId', ftransfert.carrierId)
      setValue('driverId', ftransfert.driverId)
     // setValue('stickerno', ftransfert.stickerno?ftransfert.stickerno:'')
     }else{
      setValue('date', moment(ftransfert.date).format("YYYY-MM-DDTHH:mm"))
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openFtransfertModal}>
        <Container maxWidth="md">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add File Transfert":"Edit File Transfert : "+props.ftransfert.code}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={4} >
                        <TextField autoFocus 
                          inputProps={{inputformat:"YYYY-MM-DDTHH:mm"}} 
                          label="Date *"
                          type="datetime-local"
                          size="small"
                          variant="outlined"
                           {...register("date")}
                          helperText={errors.date?.message}
                          error={errors.date?true :false} />
                      </Grid>
                      <Grid item md={4} xs={4} >
                        <TextField fullWidth label="File Transfert N° *" variant="outlined"
                            placeholder='Enter File Transfert N°'{...register("code")}
                            size="small"
                            helperText={errors.code?.message}
                            error={errors.code?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={3} >
                        <TextField fullWidth label="Sticker N° *" variant="outlined"
                            placeholder='Enter Sticker N° '{...register("stickerno")}
                            size="small"
                            helperText={errors.stickerno?.message}
                            error={errors.stickerno?true :false}/>
                      </Grid>
                      <Grid item md={6} xs={6}>
                        <TextField
                            select
                            label="Select File Transfert Type  *"
                            {...register("type")}
                            SelectProps={{
                              native: true,
                            }}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.type?.message}
                            error={errors.type?true :false}
                          >
                              <option value=""></option>
                              <option value={FILETRANSFERTTYPER.FDT}>FDT</option>
                              <option value={FILETRANSFERTTYPER.FDP} >FDP(PRODUCTEUR)</option>
                         </TextField>
                      </Grid>
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Supplier *"
                            {...register("supplierId")}
                            SelectProps={{
                              native: true,
                            }}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.supplierId?.message}
                            error={errors.supplierId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getsuppliers && props.getsuppliers.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.fullname+' - '+ data.code+' ('+data.type+')'}</option>
                                ))
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={1}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.SUPPLIERS) && (
                            <Tooltip title="Add Supplier" aria-label="add" onClick={_showAddSupplierModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                      
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Trailer Registration *"
                            {...register("trailerId")}
                            SelectProps={{
                              native: true,
                            }}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.trailerId?.message}
                            error={errors.trailerId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.gettrailers && props.gettrailers.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.vehiclebrand?data.registnumber+' ('+data.vehiclebrand+')':data.registnumber}</option>
                                ))
                              }
                         </TextField>
                      </Grid>
                       <Grid item md={1} xs={1}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.TRAILERS) && (
                            <Tooltip title="Add Trailers" aria-label="add" onClick={_showAddTrailerModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Vehicle Registration *"
                            {...register("vehicleId")}
                            SelectProps={{
                              native: true,
                            }}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.vehicleId?.message}
                            error={errors.vehicleId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getvehicles && props.getvehicles.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.registnumber+' ('+data.vehiclebrand+')'}</option>
                                ))
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={1}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.VEHICLES) && (
                            <Tooltip title="Add Vehicle" aria-label="add" onClick={_showAddVehicleModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Carrier *"
                            {...register("carrierId")}
                            SelectProps={{native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.carrierId?.message}
                            error={errors.carrierId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getcarriers && props.getcarriers.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.fullname+' ('+data.phone+')'}</option>
                                ))
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={1}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.CARRIERS) && (
                            <Tooltip title="Add Carrier" aria-label="add" onClick={_showAddCarrierModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Driver *"
                            {...register("driverId")}
                            SelectProps={{native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.driverId?.message}
                            error={errors.driverId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getdrivers && props.getdrivers.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.fullname+' ('+data.driverlicence+')'}</option>
                                ))
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={1}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.DRIVERS) && (
                            <Tooltip title="Add Driver" aria-label="add" onClick={_showAddDriverModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                     
                       <Grid item md={6} xs={6}>
                            <label htmlFor="files">
                              <Button variant="contained"  color="secondary" component="label"  >
                                Upload File
                              <input  id="files"  type='file' onChange={onInputChange} accept="application/pdf"  style={{ display: 'none' }}/>
                              </Button>
                            </label>
                              {errors.photo? 
                                  <p style={{color:'red'}}>{errors.photo?.message}</p>:''
                                }
                       </Grid>
                    </Grid>
                  
                    
                    <Divider/>
                    <Grid container item md={12} xs={12}  justifyContent='flex-end' style={{marginTop:10}}>  
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
      {openAddSupplierModal?
      <ModalAddSupplier openSupplierModal={openAddSupplierModal} closeAddModal={_closeAddSupplierModal} supplier={''} isAddMode={true}/>
            :''}
      {openAddTrailerModal?
                  <ModalAddTrailer openTrailerModal={openAddTrailerModal} closeAddModal={_closeAddTrailerModal} trailer={''} isAddMode={true}/>
                        :''}
      {openAddVehicleModal?
            <ModalAddVehicle openVehicleModal={openAddVehicleModal} closeAddModal={_closeAddVehicleModal} vehicle={''} isAddMode={true}/>
                  :''}
      {openAddCarrierModal?
            <ModalAddCarrier openCarrierModal={openAddCarrierModal} closeAddModal={_closeAddCarrierModal} carrier={''} isAddMode={true}/>
                  :''}
      {openAddDriverModal?
            <ModalAddDriver openDriverModal={openAddDriverModal} closeAddModal={_closeAddDriverModal} driver={''} isAddMode={true}/>
                  :''}

    </>
  );
};


const mapStateToProps = (state:any) => {
  const { getsuppliers } = state.suppliers;
  const { gettrailers } = state.trailers;
  const { getvehicles } = state.vehicles;
  const { getcarriers } = state.carriers;
  const { getdrivers } = state.drivers;

  return {getsuppliers,gettrailers,getvehicles,getcarriers,getdrivers}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createFtransfertAction: (data:FormData,onSuccess:any,onError:any)=> dispatch(C5_CreateFtransfertAction(data,onSuccess,onError)),
    updateFtransfertAction: (id:string,data:FormData,onSuccess:any,onError:any)=> dispatch(C5_UpdateFtransfertAction(id,data,onSuccess,onError)),
    getFtransfertsAction: (onSuccess:any,onError:any)=> dispatch(C5_getFtransfertsAction(onSuccess,onError)),


    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddFtransfert);