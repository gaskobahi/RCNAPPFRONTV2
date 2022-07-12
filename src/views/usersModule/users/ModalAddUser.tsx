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

//import {C5_CreateUserAction} from '../../redux/actions/Users/UsersActions';
//import {C5_EditUserAction} from '../../redux/actions/Users/UsersActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { emailRegExp, phoneRegExp } from "../../../Helpers/helpMenuTree";
import { C5_CreateUserAction, C5_getUsersAction, C5_UpdateUserAction } from "../../../redux/actions/UsersModule/users";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import CAN from "../../../Ability/can";
import ModalAddDepartment from "../departments/ModalAddDepartment";
import ModalAddRole from "../roles/ModalAddRole";
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



  interface ModalAddUserProps {
    openModal: boolean;
    closeAddModal: () => void;
    user: any;
    
    isAddMode: boolean;
    getroles:[],
    getdepartments:[],
    createUserAction:(data:any,res:any,res1:any)=>void;
    updateUserAction:(id:string,data:any,res:any,res1:any)=>void;
    getUsersAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddUser = (props:ModalAddUserProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);

 //for role
 const [openAddRoleModal,setopenAddRoleModal]=useState(false)
 const [isAddRoleMode,setisAddRoleMode]=useState(false)
 const _showAddRoleModal=()=>{
  setisAddRoleMode(true)
  setopenAddRoleModal(true)
}
const _closeAddRoleModal=()=>setopenAddRoleModal(false)

 //end setting role modal

 //for department
 const [openAddDepartmentModal,setopenAddDepartmentModal]=useState(false)
 const [isAddDepartmentMode,setisAddDepartmentMode]=useState(false)
 const _showAddDepartmentModal=()=>{
  setisAddDepartmentMode(true)
  setopenAddDepartmentModal(true)
}
const _closeAddDepartmentModal=()=>setopenAddDepartmentModal(false)

///end setting department modal


  const user = props?.user;
  const prevUser:any =usePrevious(user);
  const isAddMode=props?.isAddMode;


  const _showAddRolerModal=()=>()=>{
    setisAddRoleMode(true)
    setopenAddRoleModal(true)
  }




    
  const formSchema = Yup.object().shape({
      code: Yup.string().trim()
      .min(6, 'Code must be at 6 char short')
      .required('Code is mandatory')
      .max(15, 'Code must be at 12 char long'),
      username: Yup.string().trim()
      .min(3, 'Username must be at 3 char short')
      .required('Username is mandatory')
      .max(18, 'Username must be at 18 char long'),
      lastname: Yup.string().trim()
      .min(3, 'Lastname must be at 3 char short')
      .required('Lastname is mandatory')
      .max(18, 'Lastname must be at 18 char long'),
      firstname: Yup.string()
      .min(3, 'Firstname must be at 3 char short')
      .required('Firstname is mandatory')
      .max(30, 'Firstname must be at 30 char long'),
      phone: Yup.string().required('Phone is mandatory').matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Phone must be at 10 char short')
      .max(15, 'Phone must be at 15 char long'),
      email: Yup.lazy((value) => (value === '' ? Yup.string().required('Email is mandatory'): Yup.string().matches(emailRegExp, 'Email is not valid').trim())),

      
      departmentId: Yup.string().nullable(),
      roleId: Yup.string().required('Role is mandatory')
      .required('Role is mandatory'),
      password: Yup.string()
      .transform(x => x === '' ? undefined : x)
      .concat(isAddMode ? Yup.string().required('Password is required'):Yup.string())
      .min(6, 'Password must be at 6 char short')
      .max(25, 'Password must be at 25 char long'),
      c_password: Yup.string().trim()
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createUser=(data:any)=> {
     
      const onCreateUserSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.username+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getUsersAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateUserError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createUserAction(data,onCreateUserSuccess,onCreateUserError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditUser=(data:any)=> {
    /*let dt:any={}
    if(data.code)dt.code=data.code;
    if(data.username)dt.username=data.username;
    if(data.firstname)dt.firstname=data.firstname;
    if(data.lastname)dt.lastname=data.lastname;
    if(data.phone)dt.phone=data.phone;
    if(data.email)dt.email=data.email;
    if(data.departmentId)dt.departmentId=data.departmentId;
    if(data.roleId)dt.roleId=data.roleId;*/


   const onUpdateUserSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(data.username+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getUsersAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateUserError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }

    if(prevUser.code!=data.code || prevUser.username!=data.username || prevUser.firstname!=data.firstname ||
      prevUser.lastname!=data.lastname ||  prevUser.phone!=data.phone ||  prevUser.email!=data.email ||
      prevUser.departmentId!=data.departmentId || prevUser.roleId!=data.roleId){
      props.updateUserAction(data.id,data,onUpdateUserSuccess,onUpdateUserError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
  }


  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createUser(data):EditUser(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', user.id)
      setValue('code', user.code)
      setValue('username', user.username)
      setValue('firstname', user.firstname)
      setValue('lastname', user.lastname)
      setValue('phone', user.phone)
      setValue('email', user.email)
      setValue('departmentId', user.departmentId)
      setValue('roleId', user.roleId)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openModal}>
        <Container maxWidth="md">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add User":"Edit User : "+props.user.code}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                    <Grid item md={4} xs={4} >
                        <TextField fullWidth label="Code *" variant="outlined"
                            placeholder='Enter Code'{...register("code")}
                            size="small"
                            helperText={errors.code?.message}
                            error={errors.code?true :false}/>
                      </Grid>
                      <Grid item md={4} xs={4} >
                        <TextField fullWidth label="Username *" variant="outlined"
                            placeholder='Enter Username'{...register("username")}
                            size="small"
                            helperText={errors.username?.message}
                            error={errors.username?true :false}/>
                      </Grid>
                      <Grid item md={4} xs={4} >
                          <TextField fullWidth label="Lastname *" variant="outlined" defaultValue=''
                              placeholder='Enter Lastname' autoFocus
                              {...register("lastname")}
                              size="small"
                              helperText={errors.lastname?.message}
                              error={errors.lastname?true :false}/>
                      </Grid>
                      <Grid item md={12} xs={12} >
                          <TextField fullWidth label="Firstname *" variant="outlined" 
                              size="small"
                              placeholder='Enter Firstname' 
                             {...register("firstname")}
                             helperText={errors.firstname?.message}
                             error={errors.firstname?true :false}
                            />
                      </Grid>
                      <Grid item md={6} xs={6} >
                          <TextField fullWidth label="Phone *"
                              size="small" variant="outlined"
                              placeholder='Enter Phone' {...register("phone")} 
                              helperText={errors.phone?.message}
                              error={errors.phone?true :false}
                          />
                      </Grid>
                      <Grid item md={6} xs={6} >
                          <TextField fullWidth label="Email *" variant="outlined"
                              placeholder='Enter Email' {...register("email")}
                              size="small" 
                              helperText={errors.email?.message}
                              error={errors.email?true :false}
                          />
                      </Grid>
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Role *"
                            {...register("roleId")}
                            SelectProps={{native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.roleId?.message}
                            error={errors.roleId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getroles && props.getroles.map((data:any,index:any) => (
                                  <option value={data.id} key={index}>{data.name}</option>
                                ))
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={1}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.ROLES) && (
                            <Tooltip title="Add Role" aria-label="add" onClick={_showAddRoleModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                       </Grid>
                      <Grid item md={5} xs={5}>
                        <TextField
                            select
                            label="Select Department"
                            {...register("departmentId")}
                            SelectProps={{ native: true,}}
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
                      {isAddMode?
                      <>
                      <Grid item md={6} xs={6}>
                            <TextField variant="outlined" fullWidth label="Password *" placeholder='Enter password' type='password'
                              {...register("password")} 
                              size="small"
                              helperText={errors.password?.message}
                              error={errors.password?true :false}
                              />
                      </Grid>
                      <Grid item md={6} xs={6}>
                            <TextField variant="outlined" fullWidth label="Confirm Password *"  placeholder='Enter confirm password' type='password'
                              {...register("c_password")}
                              size="small"
                              helperText={errors.c_password?.message}
                              error={errors.c_password?true :false}
                              />
                      </Grid>
                       </>:''
                      }
                      
                      <Grid item md={12} xs={12}>  
                       
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                          <LoadingButton  type="submit" variant="contained" color="success"    loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading?true:false}>
                                Save User 
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

            {openAddRoleModal?
                  <ModalAddRole openRoleModal={openAddRoleModal} closeAddModal={_closeAddRoleModal} role={''} isAddMode={isAddRoleMode}/>
            :''}
            
    </>
  );
};


const mapStateToProps = (state:any) => {
  const {getroles} = state.roles;
  const {getdepartments} = state.departments;
  return { getroles,getdepartments }
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createUserAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateUserAction(data,onSuccess,onError)),
    updateUserAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateUserAction(id,data,onSuccess,onError)),
    getUsersAction: (onSuccess:any,onError:any)=> dispatch(C5_getUsersAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddUser);