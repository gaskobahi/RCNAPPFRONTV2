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

import { connect } from 'react-redux';
import {toast } from 'react-toastify';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import {  C5_ResetUserPasswordAction, C5_UpdateUserAction } from "../../../redux/actions/UsersModule/users";

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





  interface ModalResetUserPasswordProps {
    openModal: boolean;
    closeResetPasswordModal: () => void;
    user: any;
    resetUserPasswordAction:(id:string,data:any,res:any,res1:any)=>void;    
  }
  



const ModalResetUserPassword = (props:ModalResetUserPasswordProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);


  const user = props?.user;

    
  const formSchema = Yup.object().shape({
      password: Yup.string()
      .transform(x => x === '' ? undefined : x)
      .concat(Yup.string().required('Password is required'))
      .min(6, 'Password must be at 6 char short')
      .max(25, 'Password must be at 25 char long'),
      c_password: Yup.string().trim()
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  ResetUserPassword=(data:any)=> {
    const onResetUserPasswordSuccess=(res:any)=>{
        reset();
        setIsLoading(false)
        let message=user.username+" : Password resetted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.closeResetPasswordModal()   
      }
    const onResetUserPasswordError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)
    }

    props.resetUserPasswordAction(user.id,data,onResetUserPasswordSuccess,onResetUserPasswordError)
  }


  const onSubmit = (data:any,e:any) =>{
    console.log(data)
      e.preventDefault();
      setIsLoading(true)
      return ResetUserPassword(data)
  }
  

  const _cancel=()=>{
    props.closeResetPasswordModal(); 
  }

  
  useEffect(() => {
      //setValue('id', user.id)
     
  }, []);

 
  return (
      <Modal open= {props.openModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {"Reset Password : "+props.user.username}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                  
                      <Grid item md={12} xs={12}>
                            <TextField variant="outlined" fullWidth label="Password *" placeholder='Enter password' type='password'
                              {...register("password")} 
                              size="small"
                              helperText={errors.password?.message}
                              error={errors.password?true :false}
                              />
                      </Grid>
                      <Grid item md={12} xs={12}>
                            <TextField variant="outlined" fullWidth label="Confirm Password *"  placeholder='Enter confirm password' type='password'
                              {...register("c_password")}
                              size="small"
                              helperText={errors.c_password?.message}
                              error={errors.c_password?true :false}
                              />
                      </Grid>
                  
                      
                      <Grid item md={12} xs={12}>  
                       
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                          <LoadingButton  type="submit" variant="contained" color="success"   loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading?true:false}>
                                Save Reset Password 
                          </LoadingButton>
                    
                      </Grid>
                      
                    </Grid>
                 </CardContent>
              </Card>
              </form>
        
        </Container>
      </Modal>
  );
};


const mapStateToProps = (state:any) => {
  return {}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    resetUserPasswordAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_ResetUserPasswordAction(id,data,onSuccess,onError))
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalResetUserPassword);