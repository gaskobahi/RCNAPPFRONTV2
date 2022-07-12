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

//import {C5_CreateDepartmentAction} from '../../redux/actions/Departments/DepartmentsActions';
//import {C5_EditDepartmentAction} from '../../redux/actions/Departments/DepartmentsActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { emailRegExp, phoneRegExp } from "../../../Helpers/helpMenuTree";
import { C5_CreateDepartmentAction, C5_getDepartmentsAction, C5_UpdateDepartmentAction } from "../../../redux/actions/UsersModule/departments";
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



  interface ModalAddDepartmentProps {
    openDepartmentModal: boolean;
    closeAddModal: () => void;
    department: any;
    isAddMode: boolean;
    createDepartmentAction:(data:any,res:any,res1:any)=>void;
    updateDepartmentAction:(id:string,data:any,res:any,res1:any)=>void;
    getDepartmentsAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddDepartment = (props:ModalAddDepartmentProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);


  const department = props?.department;
  const prevDepartment:any =usePrevious(department);

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


  const  createDepartment=(data:any)=> {
      const onCreateDepartmentSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getDepartmentsAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateDepartmentError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createDepartmentAction(data,onCreateDepartmentSuccess,onCreateDepartmentError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditDepartment=(data:any)=> {
   const onUpdateDepartmentSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(data.code+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getDepartmentsAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateDepartmentError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }
    
    if(prevDepartment.code!=data.code || prevDepartment.name!=data.name || prevDepartment.description!=data.description){
      props.updateDepartmentAction(data.id,data,onUpdateDepartmentSuccess,onUpdateDepartmentError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
  }


  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createDepartment(data):EditDepartment(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', department.id)
      setValue('code', department.code)
      setValue('name', department.name)
      setValue('description', department.description)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openDepartmentModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Department":"Edit Department : "+props.department.code}/>
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
                                Save Department 
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
    createDepartmentAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateDepartmentAction(data,onSuccess,onError)),
    updateDepartmentAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateDepartmentAction(id,data,onSuccess,onError)),
    getDepartmentsAction: (onSuccess:any,onError:any)=> dispatch(C5_getDepartmentsAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddDepartment);