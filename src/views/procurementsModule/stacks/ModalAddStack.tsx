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

//import {C5_CreateStackAction} from '../../redux/actions/Stacks/StacksActions';
//import {C5_EditStackAction} from '../../redux/actions/Stacks/StacksActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { emailRegExp, phoneRegExp } from "../../../Helpers/helpMenuTree";
import { C5_CreateStackAction, C5_getStacksAction, C5_UpdateStackAction } from "../../../redux/actions/ProcurementsModule/stacks";
//import ModalAddPlace from "../";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import CAN from "../../../Ability/can";
import ModalAddPlace from "../../locationsModule/places/ModalAddPlace";
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



  interface ModalAddStackProps {
    openStackModal: boolean;
    closeAddModal: () => void;
    stack: any;
    getplaces: any;
    isAddMode: boolean;
    createStackAction:(data:any,res:any,res1:any)=>void;
    updateStackAction:(id:string,data:any,res:any,res1:any)=>void;
    getStacksAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddStack = (props:ModalAddStackProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);
 const [openAddPlaceModal, setopenAddPlaceModal] =useState(false);


  const stack = props?.stack;
  const prevStack:any =usePrevious(stack);

  const isAddMode=props?.isAddMode;

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
      placeId: Yup.string().required('Place is mandatory')
      .required('Place is mandatory'),
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createStack=(data:any)=> {
      const onCreateStackSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getStacksAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateStackError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createStackAction(data,onCreateStackSuccess,onCreateStackError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditStack=(data:any)=> {
   const onUpdateStackSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(data.code+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getStacksAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateStackError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }

    if(prevStack.code!=data.code ||prevStack.name!=data.name || prevStack.placeId!=data.placeId){
      props.updateStackAction(data.id,data,onUpdateStackSuccess,onUpdateStackError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
  }


  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createStack(data):EditStack(data)
  }
  
  const _closeAddPlaceModal=()=>setopenAddPlaceModal(false)

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _showAddPlaceModal=()=>{
    setopenAddPlaceModal(true)
  }
  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', stack.id)
      setValue('code', stack.code)
      setValue('name', stack.name)
      setValue('placeId', stack.placeId)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openStackModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Stack":"Edit Stack : "+props.stack.code}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={5} xs={5} >
                        <TextField fullWidth label="Code *" variant="outlined"
                            placeholder='Enter Code'{...register("code")}
                            size="small"
                            helperText={errors.code?.message}
                            error={errors.code?true :false}/>
                      </Grid>
                      <Grid item md={5} xs={5} >
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
                       <Grid item md={12} xs={12}></Grid>
                    </Grid>

                    <Divider/>
                    <Grid container item md={12} xs={12}  justifyContent='flex-end' style={{marginTop:10}}>  
                    <br/>
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                          <LoadingButton  type="submit" variant="contained" color="success"    loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading}>
                                Save Stack 
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



interface StateProps {
  places: any
}

const mapStateToProps = (state:StateProps) => {
  const { getplaces } = state.places;
  return { getplaces}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createStackAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateStackAction(data,onSuccess,onError)),
    updateStackAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateStackAction(id,data,onSuccess,onError)),
    getStacksAction: (onSuccess:any,onError:any)=> dispatch(C5_getStacksAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddStack);