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

//import {C5_CreatePlaceAction} from '../../redux/actions/Places/PlacesActions';
//import {C5_EditPlaceAction} from '../../redux/actions/Places/PlacesActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreatePlaceAction, C5_getPlacesAction, C5_UpdatePlaceAction } from "../../../redux/actions/LocationsModule/places";
import ModalAddRegion from "../regions/ModalAddRegion";
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



  interface ModalAddPlaceProps {
    openPlaceModal: boolean;
    closeAddModal: () => void;
    place: any;
    getregions: any;
    isAddMode: boolean;
    createPlaceAction:(data:any,res:any,res1:any)=>void;
    updatePlaceAction:(id:string,data:any,res:any,res1:any)=>void;
    getPlacesAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddPlace = (props:ModalAddPlaceProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);
 const [openAddRegionModal, setopenAddRegionModal] =useState(false);


  const place = props?.place;
  const isAddMode=props?.isAddMode;
  const prevPlace:any =usePrevious(place);

  const handleClose = (event:any, reason:any) => {
    if (reason === "clickaway") {
      return;
    }
  };


    
  const formSchema = Yup.object().shape({
      code: Yup.string().trim()
      .min(2, 'Code must be at 2 char short')
      .required('Code is mandatory')
      .max(15, 'Code must be at 15 char long'),
      name: Yup.string().trim()
      .min(2, 'Name must be at 2 char short')
      .required('Name is mandatory')
      .max(20, 'Name must be at 20 char long'),
      regionId: Yup.string().required('Region is mandatory')
      .required('Region is mandatory'),
      description: Yup.string()
      .max(40, 'Description must be at 40 char long'),
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createPlace=(data:any)=> {
      const onCreatePlaceSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{/*console.log(res)*/}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getPlacesAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreatePlaceError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createPlaceAction(data,onCreatePlaceSuccess,onCreatePlaceError)
  }

const onSuccesGet=(res:any)=>{/*console.log(res)*/}
  const onErrorGet=(res:any)=>{/*console.log(res)*/}

  const  EditPlace=(data:any)=> {
   const onUpdatePlaceSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(data.code+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getPlacesAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdatePlaceError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }

    if(prevPlace.code!=data.code || prevPlace.name!=data.name || prevPlace.regionId!=data.regionId || prevPlace.description!=data.description){
      props.updatePlaceAction(data.id,data,onUpdatePlaceSuccess,onUpdatePlaceError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }

  }


  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createPlace(data):EditPlace(data)
  }
  
  const _closeAddRegionModal=()=>setopenAddRegionModal(false)

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _showAddRegionModal=()=>{
    setopenAddRegionModal(true)
  }
  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', place.id)
      setValue('code', place.code)
      setValue('name', place.name)
      setValue('regionId', place.regionId)
      setValue('description', place.description)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openPlaceModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Place":"Edit Place : "+props.place.code}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={6} >
                        <TextField fullWidth label="Code *" variant="outlined"
                            placeholder='Enter Code'{...register("code")}
                            size="small"
                            helperText={errors.code?.message}
                            error={errors.code?true :false}/>
                      </Grid>
                      <Grid item md={6} xs={6} >
                          <TextField fullWidth label="Name *" variant="outlined" defaultValue=''
                              placeholder='Enter Name' autoFocus
                              {...register("name")}
                              size="small"
                              helperText={errors.name?.message}
                              error={errors.name?true :false}/>
                      </Grid>
                      <Grid item md={10} xs={10}>
                        <TextField
                            select
                            label="Select Region *"
                            {...register("regionId")}
                            SelectProps={{
                              native: true,
                            }}
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.regionId?.message}
                            error={errors.regionId?true :false}
                            autoComplete="on"
                          >
                              <option value=""></option>
                              {
                                props.getregions && props.getregions.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.name}</option>
                                ))
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={2} xs={2}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.REGIONS) && (
                            <Tooltip title="Add Region" aria-label="add" onClick={_showAddRegionModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                       </Grid>
                      <Grid item md={12} xs={12} >
                          <TextField fullWidth label="Description *" variant="outlined" 
                              placeholder='Enter Description' 
                             {...register("description")}
                             size="small"
                             helperText={errors.description?.message}
                             error={errors.description?true :false}
                            />
                      </Grid>
                      
                      <Grid item md={12} xs={12}> </Grid>  
                    </Grid>
                    <Divider/>
                    <Grid container item md={12} xs={12}  justifyContent='flex-end' style={{marginTop:10}}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                          <LoadingButton  type="submit" variant="contained" color="success"    loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading?true:false}>
                                Save 
                          </LoadingButton>
                      </Grid>
                 </CardContent>
              </Card>
              </form>
        
        </Container>
      </Modal>
      {openAddRegionModal?
              <ModalAddRegion openRegionModal={openAddRegionModal} closeAddModal={_closeAddRegionModal} region={''} isAddMode={true}/>
            :''}
    </>
  );
};



interface StateProps {
  regions: any
}

const mapStateToProps = (state:StateProps) => {
  const { getregions } = state.regions;
  return { getregions}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createPlaceAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreatePlaceAction(data,onSuccess,onError)),
    updatePlaceAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdatePlaceAction(id,data,onSuccess,onError)),
    getPlacesAction: (onSuccess:any,onError:any)=> dispatch(C5_getPlacesAction(onSuccess,onError))
    

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddPlace);