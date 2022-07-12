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

//import {C5_CreateOperatorAction} from '../../redux/actions/Operators/OperatorsActions';
//import {C5_EditOperatorAction} from '../../redux/actions/Operators/OperatorsActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { emailRegExp, phoneRegExp } from "../../../Helpers/helpMenuTree";
import { C5_CreateOperatorAction, C5_getOperatorsAction, C5_UpdateOperatorAction } from "../../../redux/actions/UsersModule/operators";
import ModalAddDepartment from "../departments/ModalAddDepartment";
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



  interface ModalAddOperatorProps {
    openModal: boolean;

    closeAddModal: () => void;
    operator: any;
    isAddMode: boolean;
    getdepartments:[],
    createOperatorAction:(data:any,res:any,res1:any)=>void;
    updateOperatorAction:(id:string,data:any,res:any,res1:any)=>void;
    getOperatorsAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddOperator = (props:ModalAddOperatorProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);


  const operator = props?.operator;
  const prevOperator:any =usePrevious(operator);
  const isAddMode=props?.isAddMode;


 


  
 //for department
 const [openAddDepartmentModal,setopenAddDepartmentModal]=useState(false)
 const [isAddDepartmentMode,setisAddDepartmentMode]=useState(false)
 const _showAddDepartmentModal=()=>{
  setisAddDepartmentMode(true)
  setopenAddDepartmentModal(true)
}
const _closeAddDepartmentModal=()=>setopenAddDepartmentModal(false)


    
  const formSchema = Yup.object().shape({
      username: Yup.string().trim()
      .min(6, 'Username must be at 6 char short')
      .required('Username is mandatory')
      .max(20, 'Username must be at 20 char long'),
      lastname: Yup.string().trim()
      .min(3, 'Lastname must be at 3 char short')
      .required('Lastname is mandatory')
      .max(20, 'Lastname must be at 20 char long'),
      firstname: Yup.string()
      .min(3, 'Firstname must be at 3 char short')
      .required('Firstname is mandatory')
      .max(40, 'Firstname must be at 40 char long'),
      phone: Yup.string().required('Phone is mandatory').matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Phone must be at 10 char short')
      .max(15, 'Phone must be at 15 char long'),
      departmentId: Yup.string().nullable(),
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createOperator=(data:any)=> {
      const onCreateOperatorSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.username+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getOperatorsAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateOperatorError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createOperatorAction(data,onCreateOperatorSuccess,onCreateOperatorError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditOperator=(data:any)=> {
   const onUpdateOperatorSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(data.username+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getOperatorsAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateOperatorError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)
    }

    if(prevOperator.username!=data.username || prevOperator.firstname!=data.firstname || prevOperator.lastname!=data.lastname || 
       prevOperator.phone!=data.phone ||  prevOperator.departmentId!=data.departmentId
      ){
      props.updateOperatorAction(data.id,data,onUpdateOperatorSuccess,onUpdateOperatorError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }

  
  }


  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createOperator(data):EditOperator(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', operator.id)
      setValue('username', operator.username)
      setValue('firstname', operator.firstname)
      setValue('lastname', operator.lastname)
      setValue('phone', operator.phone)
      setValue('departmentId', operator.departmentId)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openModal}>
        <Container maxWidth="md">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Operator":"Edit Operator : "+props.operator.username}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={6} >
                        <TextField fullWidth label="Username *" variant="outlined"
                            placeholder='Enter Username'{...register("username")}
                            size="small"
                            helperText={errors.username?.message}
                            error={errors.username?true :false}/>
                      </Grid>
                      <Grid item md={6} xs={6} >
                          <TextField fullWidth label="Lastname *" variant="outlined" defaultValue=''
                              placeholder='Enter Lastname' autoFocus
                              {...register("lastname")}
                              size="small"
                              helperText={errors.lastname?.message}
                              error={errors.lastname?true :false}/>
                      </Grid>
                      <Grid item md={12} xs={12} >
                          <TextField fullWidth label="Firstname *" variant="outlined" 
                              placeholder='Enter Firstname' 
                             {...register("firstname")}
                             size="small"
                             helperText={errors.firstname?.message}
                             error={errors.firstname?true :false}
                            />
                      </Grid>
                      <Grid item md={6} xs={6} >
                          <TextField fullWidth label="Phone *" variant="outlined"
                              placeholder='Enter Phone' {...register("phone")} 
                              helperText={errors.phone?.message}
                              size="small"
                              error={errors.phone?true :false}
                          />
                      </Grid>         
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Department"
                            {...register("departmentId")}
                            SelectProps={{native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.departmentId?.message}
                            error={errors.departmentId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getdepartments && props.getdepartments.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.name}</option>
                                ))
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={1}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.DEPARTMENTS) && (
                            <Tooltip title="Add Departement" aria-label="add" onClick={_showAddDepartmentModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                       </Grid>
                      <Grid item md={12} xs={12}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                          <LoadingButton  type="submit" variant="contained" color="success"    loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading?true:false}>
                                Save Operator 
                          </LoadingButton>
                    
                      </Grid>
                      
                    </Grid>
                 </CardContent>
              </Card>
              </form>
        
        </Container>
      </Modal>
      {openAddDepartmentModal?
              <ModalAddDepartment openDepartmentModal={openAddDepartmentModal} closeAddModal={_closeAddDepartmentModal} department={''} isAddMode={isAddDepartmentMode}/>
            :''}
    </>
  );
};


const mapStateToProps = (state:any) => {
  const {getdepartments} = state.departments;
  return {getdepartments }
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createOperatorAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateOperatorAction(data,onSuccess,onError)),
    updateOperatorAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateOperatorAction(id,data,onSuccess,onError)),
    getOperatorsAction: (onSuccess:any,onError:any)=> dispatch(C5_getOperatorsAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddOperator);