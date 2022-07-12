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


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toast } from 'react-toastify';

//import {C5_CreateVehicleAction} from '../../redux/actions/Vehicles/VehiclesActions';
//import {C5_EditVehicleAction} from '../../redux/actions/Vehicles/VehiclesActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreateVehicleAction, C5_getVehiclesAction, C5_UpdateVehicleAction } from "../../../redux/actions/ProcurementsModule/vehicles";
import ModalAddVehiclebrand from "../../procurementsModule/vehiclebrands/ModalAddVehiclebrand";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import CAN from "../../../Ability/can";
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



  interface ModalAddVehicleProps {
    openVehicleModal: boolean;
    closeAddModal: () => void;
    vehicle: any;
    getvehiclebrands:any;
    isAddMode: boolean;
    createVehicleAction:(data:any,res:any,res1:any)=>void;
    updateVehicleAction:(id:string,data:any,res:any,res1:any)=>void;
    getVehiclesAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddVehicle = (props:ModalAddVehicleProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
 
 const [openAddVehiclebrandModal, setopenAddVehiclebrandModal] =useState(false);


  const vehicle:any = props?.vehicle;
  const isAddMode=props?.isAddMode;
  const prevVehicle:any =usePrevious(vehicle);

    
  const formSchema = Yup.object().shape({
       registnumber: Yup.string().trim()
      .min(2, 'Registration Number must be at 2 char short')
      .required('Registration Number is mandatory')
      .max(35, 'Registration Number must be at 35 char long'),
      vehiclebrandId: Yup.string()
      .required('Vehicle Brand is mandatory')
      
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createVehicle=(data:any)=> {
      const onCreateVehicleSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(res.name+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getVehiclesAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateVehicleError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createVehicleAction(data,onCreateVehicleSuccess,onCreateVehicleError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditVehicle=(data:any)=> {
   const onUpdateVehicleSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getVehiclesAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateVehicleError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }
    if(prevVehicle.registnumber!=data.registnumber || prevVehicle.vehiclebrandId!=data.vehiclebrandId){
      props.updateVehicleAction(data.id,data,onUpdateVehicleSuccess,onUpdateVehicleError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
      
  }

  



  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createVehicle(data):EditVehicle(data)
  }
  
  const _showAddVehiclebrandModal=()=>{
    setopenAddVehiclebrandModal(true)
  }

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddVehiclebrandModal=()=>setopenAddVehiclebrandModal(false)

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', vehicle.id)
      setValue('registnumber', vehicle.registnumber)
      setValue('vehiclebrandId', vehicle.vehiclebrandId)

     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openVehicleModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Vehicle ":"Edit Vehicle "+props.vehicle.registnumber}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={10} xs={10} >
                          <TextField fullWidth label="Registration N° *" variant="outlined" defaultValue=''
                              placeholder='Enter Name' autoFocus
                              {...register("registnumber")}
                              size="small"
                              helperText={errors.registnumber?.message}
                              error={errors.registnumber?true :false}/>
                      </Grid>
                      <Grid item md={10} xs={10}>
                        <TextField
                            select
                            label="Select Vehicle Brand *"
                            {...register("vehiclebrandId")}
                            SelectProps={{ native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.vehiclebrandId?.message}
                            error={errors.vehiclebrandId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getvehiclebrands && props.getvehiclebrands.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.name}</option>
                                ))
                              }
                          </TextField>
                      </Grid>
                      <Grid item md={2} xs={2}>
                        {CAN(UserAction.Create,EntityUSERMODAbilty.VEHICLES) && (
                              <Tooltip title="Add Vehicle Brand" aria-label="add" onClick={_showAddVehiclebrandModal}>
                                  <Fab color="secondary" size='small'> 
                                    <AddIcon />
                                  </Fab>
                            </Tooltip>
                          )}
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
      {openAddVehiclebrandModal?
              <ModalAddVehiclebrand openVehiclebrandModal={openAddVehiclebrandModal} closeAddModal={_closeAddVehiclebrandModal} vehiclebrand={''} isAddMode={true}/>
                    :''}
    </>
  );
};


const mapStateToProps = (state:any) => {
  const { getvehiclebrands } = state.vehiclebrands;

  return { getvehiclebrands}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createVehicleAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateVehicleAction(data,onSuccess,onError)),
    updateVehicleAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateVehicleAction(id,data,onSuccess,onError)),
    getVehiclesAction: (onSuccess:any,onError:any)=> dispatch(C5_getVehiclesAction(onSuccess,onError)),
             

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddVehicle);