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

//import {C5_CreateRoleAction} from '../../redux/actions/Roles/RolesActions';
//import {C5_EditRoleAction} from '../../redux/actions/Roles/RolesActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { emailRegExp, phoneRegExp } from "../../../Helpers/helpMenuTree";
import { C5_CreateRoleAction, C5_getRolesAction, C5_UpdateRoleAction } from "../../../redux/actions/UsersModule/roles";
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



  interface ModalAddRoleProps {
    openRoleModal: boolean;
    closeAddModal: () => void;
    role: any;
    isAddMode: boolean;
    createRoleAction:(data:any,res:any,res1:any)=>void;
    updateRoleAction:(id:string,data:any,res:any,res1:any)=>void;
    getRolesAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddRole = (props:ModalAddRoleProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);


  const role:any = props?.role;
  const prevRole:any =usePrevious(role);
  const isAddMode=props?.isAddMode;

  const formSchema = Yup.object().shape({
      code: Yup.string().trim()
      .min(2, 'Code must be at 2 char short')
      .required('Code is mandatory')
      .max(15, 'Code must be at 15 char long'),
      name: Yup.string().trim()
      .min(2, 'Name must be at 2 char short')
      .required('Name is mandatory')
      .max(20, 'Name must be at 20 char long'),
      description: Yup.string()
      .min(2, 'Description must be at 2 char short')
      .required('Description is mandatory')
      .max(40, 'Description must be at 40 char long'),
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createRole=(data:any)=> {
      const onCreateRoleSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getRolesAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateRoleError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createRoleAction(data,onCreateRoleSuccess,onCreateRoleError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditRole=(data:any)=> {
   const onUpdateRoleSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(data.code+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getRolesAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateRoleError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }

    if(prevRole.code!=data.code || prevRole.name!=data.name || prevRole.description!=data.description){
      props.updateRoleAction(data.id,data,onUpdateRoleSuccess,onUpdateRoleError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
  }


  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createRole(data):EditRole(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', role.id)
      setValue('code', role.code)
      setValue('name', role.name)
      setValue('description', role.description)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openRoleModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Role":"Edit Role : "+props.role.code}/>
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
                      <Grid item md={12} xs={12} >
                          <TextField fullWidth label="Description *" variant="outlined" 
                              placeholder='Enter Description' 
                             {...register("description")}
                             size="small"
                             helperText={errors.description?.message}
                             error={errors.description?true :false}
                            />
                      </Grid>
                      <Grid item md={12} xs={12}>  
                       
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                          <LoadingButton  type="submit" variant="contained" color="success"    loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading?true:false}>
                                Save Role 
                          </LoadingButton>
                    
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
  return { }
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createRoleAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateRoleAction(data,onSuccess,onError)),
    updateRoleAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateRoleAction(id,data,onSuccess,onError)),
    getRolesAction: (onSuccess:any,onError:any)=> dispatch(C5_getRolesAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddRole);