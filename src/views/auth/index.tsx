import React, { useState } from  'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_LoginAction } from '../../redux/actions/Auth/AuthActions';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
/*interface AuthUser {
    username: string;
    password: string;
}*/

const formSchema = Yup.object().shape({
    username: Yup.string().trim()
    .required('Username is mandatory'),
    password: Yup.string()
    .required('Password is mandatory')
})

const formOptions = { resolver: yupResolver(formSchema) }
const LoginView=(props:any)=>{
    const { register, handleSubmit ,formState: {errors } } = useForm(formOptions)
    const dispatch:any= useDispatch();
    const [showAlert,setShowAlert]=useState(false)
    const [showAlertMsg,setShowAlertMsg]=useState("")
    const [isloading,setIsloading]=useState(false);

    let navigate = useNavigate();
    const onSuccessLogin=(res:any)=>{
        setIsloading(false)
        setShowAlert(false)
        setShowAlertMsg("")
       // setTimeout(()=>{
           navigate("/", { replace: true })

      // },1000)
    }
    const onErrorLogin=(res:any)=>{
        setIsloading(false)
        setShowAlertMsg(res.message)
        setShowAlert(true)
    }

    const onSubmit = (data:any)=>{
        setIsloading(true)
        dispatch(C5_LoginAction(data,onSuccessLogin,onErrorLogin));
    }
    
    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a><b>RCN</b>APP</a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in</p>
                        <form  onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                          <Grid item md={12} xs={12}>  
                            <Grid item md={12} xs={12}>  
                                <TextField type="text" fullWidth label="Username *" variant="outlined"
                                    placeholder='Enter Username'{...register("username")}
                                    helperText={errors.username?.message}
                                    size="small"
                                    error={errors.username?true :false}/>
                            </Grid>
                            <br/>
                            <Grid item md={12} xs={12}>  
                                <TextField type="password" fullWidth label="Password *" variant="outlined"
                                    placeholder='Enter Password'{...register("password")}
                                    size="small"
                                    helperText={errors.password?.message}
                                    error={errors.password?true :false}/>
                            </Grid>
                            <br/>
                            <Grid item md={12} xs={12}>
                               
                                <LoadingButton  type="submit"  fullWidth variant="contained" color="primary"    loadingPosition="start" startIcon={<ArrowRightAltIcon />}
                                        loading={isloading?true:false}>
                                            SIGN IN
                                </LoadingButton>
                            </Grid>
                            <br/>
                            {showAlert?<Alert severity="error">{showAlertMsg}</Alert>:"" }
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default  LoginView;