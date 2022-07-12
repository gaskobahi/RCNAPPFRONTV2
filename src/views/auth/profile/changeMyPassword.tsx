import React, { useState } from  'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';

import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import {toast } from 'react-toastify';
import {C5_ChangeMyPasswordAction} from '../../../redux/actions/Auth/AuthActions';
import { Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

interface AuthUpdateMyProfile {
    lastname: string;
    firstname: string;
    phone: string;
    email: string;
}

const formSchemaChangePassword = Yup.object().shape({
    oldpassword:Yup.string().required('Current Password is required')
      .min(6, 'Current Password must be at least 6 characters'),
    password: Yup.string()
    .transform(x => x === '' ? undefined : x)
    .concat(Yup.string().required('Password is required'))
    .min(6, 'Password must be at 6 char short')
    .max(25, 'Password must be at 25 char long'),
    c_password: Yup.string().trim()
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
})

const  ChangeMyPasswordView =(props:any)=>{
    let {getuserprofile}=props;
    const dispatch:any= useDispatch();
    const [isloading,setIsloading]=useState(false);
    const formOptions:any = { resolver: yupResolver(formSchemaChangePassword)}
    const { register, handleSubmit, reset,formState: {errors } } = useForm(formOptions)

    const _onSuccessChangeMyPassword=(res:any)=>{
        toast.success("Your Password has been changed successfully!",{position:toast.POSITION.BOTTOM_CENTER});
        setIsloading(false)
        reset()
    }
    const _onErrorChangeMyPassword=(res:any)=>{
        setIsloading(false)
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    }

    const _onSubmitChangeMyPassword = (data:any)=>{
       let id= getuserprofile?.id;
       setIsloading(true)
        dispatch(props.changeMyPasswordAction(id,data,_onSuccessChangeMyPassword,_onErrorChangeMyPassword));
    }
 

    return (
        <form className="form-horizontal" onSubmit={handleSubmit(_onSubmitChangeMyPassword)}>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>  
                    <TextField type="password" fullWidth label="Current Password *" variant="outlined"
                        placeholder='Enter  Current Password'{...register("oldpassword")}
                        helperText={errors.oldpassword?.message}
                        size="small"
                        error={errors.oldpassword?true :false}/>
                </Grid>
                <Grid item md={12} xs={12}>  
                    <TextField type="password" fullWidth label="New Password *" variant="outlined"
                        placeholder='Enter  New Password'{...register("password")}
                        helperText={errors.password?.message}
                        size="small"
                        error={errors.password?true :false}/>
                </Grid>
                <Grid item md={12} xs={12}>  
                    <TextField type="password" fullWidth label="Confirm Password *" variant="outlined"
                        placeholder='Enter Confirm New Password'{...register("c_password")}
                        helperText={errors.c_password?.message}
                        size="small"
                        error={errors.c_password?true :false}/>
                </Grid>
                <Grid item md={12} xs={12}>  
                    <LoadingButton  type="submit" variant="contained" color="error"    loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading?true:false}>
                                Submit
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    )
        
        
}

    interface StateProps {
        auth: any
    }
  

    const mapStateToProps = (state:StateProps) => {
        const { getuserprofile } = state.auth;
        return { getuserprofile }
    };

    const mapDispatchToProps = (dispatch:any)=>{
        return {
            changeMyPasswordAction: (id:string,data:string,onSuccess:any,onError:any) => dispatch(C5_ChangeMyPasswordAction(id,data,onSuccess,onError))
        }
    }



export default connect(mapStateToProps,mapDispatchToProps)(ChangeMyPasswordView);


