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

//import {C5_CreateTrailerAction} from '../../redux/actions/Trailers/TrailersActions';
//import {C5_EditTrailerAction} from '../../redux/actions/Trailers/TrailersActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreateTrailerAction, C5_getTrailersAction, C5_UpdateTrailerAction } from "../../../redux/actions/ProcurementsModule/trailers";
import ModalAddVehiclebrand from "../vehiclebrands/ModalAddVehiclebrand";
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



  interface ModalAddTrailerProps {
    openTrailerModal: boolean;
    closeAddModal: () => void;
    trailer: any;
    getvehiclebrands:any;
    isAddMode: boolean;
    createTrailerAction:(data:any,res:any,res1:any)=>void;
    updateTrailerAction:(id:string,data:any,res:any,res1:any)=>void;
    getTrailersAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddTrailer = (props:ModalAddTrailerProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
 
 const [openAddVehiclebrandModal, setopenAddVehiclebrandModal] =useState(false);


  const trailer:any = props?.trailer;
  const isAddMode=props?.isAddMode;
  const prevTrailer:any =usePrevious(trailer);


    
  const formSchema = Yup.object().shape({
       registnumber: Yup.string().trim()
      .min(2, 'Registration Number must be at 2 char short')
      .required('Registration Number is mandatory')
      .max(35, 'Registration Number must be at 35 char long'),
      vehiclebrandId: Yup.string()    
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createTrailer=(data:any)=> {
      const onCreateTrailerSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(res.name+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getTrailersAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateTrailerError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createTrailerAction(data,onCreateTrailerSuccess,onCreateTrailerError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditTrailer=(data:any)=> {
   const onUpdateTrailerSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getTrailersAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateTrailerError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }
    if(prevTrailer.registnumber!=data.registnumber || prevTrailer.vehiclebrandId!=data.vehiclebrandId){
      props.updateTrailerAction(data.id,data,onUpdateTrailerSuccess,onUpdateTrailerError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
  }

  



  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createTrailer(data):EditTrailer(data)
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
      setValue('id', trailer.id)
      setValue('registnumber', trailer.registnumber)
      setValue('vehiclebrandId', trailer.vehiclebrandId)

     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openTrailerModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Trailer ":"Edit Trailer "+props.trailer.registnumber}/>
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
                            label="Select Trailer Brand"
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
                        {CAN(UserAction.Create,EntityUSERMODAbilty.TRAILERS) && (
                              <Tooltip title="Add Trailer Brand" aria-label="add" onClick={_showAddVehiclebrandModal}>
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
    createTrailerAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateTrailerAction(data,onSuccess,onError)),
    updateTrailerAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateTrailerAction(id,data,onSuccess,onError)),
    getTrailersAction: (onSuccess:any,onError:any)=> dispatch(C5_getTrailersAction(onSuccess,onError)),
             

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddTrailer);