import React, { useState } from  'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import {toast } from 'react-toastify';
import {C5_UpdateMyProfileAction, C5_UserProfileAction } from '../../../redux/actions/Auth/AuthActions';
import { emailRegExp, phoneRegExp } from '../../../Helpers/helpMenuTree';
import { Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


interface AuthUpdateMyProfile {
    lastname: string;
    firstname: string;
    phone: string;
    email: string;
}

const formSchemaUpdateProfile = Yup.object().shape({
    username: Yup.lazy((value) => (value === '' ? Yup.string() : Yup.string().nullable().trim().min(3, 'Username must be at 3 char short').max(18, 'Username must be at 18 char long'))),
    lastname: Yup.lazy((value) => (value === '' ? Yup.string() : Yup.string().nullable().trim().min(3, 'Lastname must be at 3 char short').max(18, 'Lastname must be at 18 char long'))),
    firstname: Yup.lazy((value) => (value === '' ? Yup.string(): Yup.string().nullable().min(3, 'Lastname must be at 3 char short').max(30, 'Lastname must be at 30 char long'))),
    phone: Yup.lazy((value) => (value === '' ? Yup.string(): Yup.string().matches(phoneRegExp, 'Phone number is not valid'))),
    email: Yup.lazy((value) => (value === '' ? Yup.string(): Yup.string().matches(emailRegExp, 'Email is not valid').trim())),
    
})

const  UpdateProfileView =(props:any)=>{
    let {getuserprofile}=props;
    const dispatch:any= useDispatch();
    const [isloading,setIsloading]=useState(false);
    const formOptions:any = { resolver: yupResolver(formSchemaUpdateProfile)}
    const { register, handleSubmit, reset,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

    const _onSuccessUpdateProfile=(res:any)=>{
        toast.success("Your profile updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
        reset()
        const onGetProfESuccess=(res:any)=>{
            console.log(res)
            setIsloading(false)
        }
        const onGetProfError=(res:any)=>{
            console.warn(res)
            setIsloading(false)
        }
        dispatch(C5_UserProfileAction(onGetProfESuccess,onGetProfError))
    }
    const _onErrorUpdateProfile=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsloading(false)
    }

    const _onSubmitUpdateMyProfile = (data:any)=>{
       let dt:any={}
       if(data.username)dt.username=data.username;
       if(data.firstname)dt.firstname=data.firstname;
       if(data.lastname)dt.lastname=data.lastname;
       if(data.phone)dt.phone=data.phone;
       if(data.email)dt.email=data.email;
       let id= getuserprofile?.id;
       if(Object.keys(dt).length!=0){
        setIsloading(true)
         dispatch(props.updateMyProfileAction(id,dt,_onSuccessUpdateProfile,_onErrorUpdateProfile));
       }
    }
 

    return (
        <form className="form-horizontal" onSubmit={handleSubmit(_onSubmitUpdateMyProfile)}>
        <Grid container spacing={2}>
            {getuserprofile && getuserprofile.caneditusrname?
                <Grid item md={12} xs={12}>  
                    <TextField fullWidth label="Username" variant="outlined"
                        placeholder='Enter Username'{...register("username")}
                        helperText={errors.username?.message}
                        size="small"
                        error={errors.username?true :false}/>
                </Grid>  
            :''}
                <Grid item md={12} xs={12}>  
                    <TextField fullWidth label="Lastname" variant="outlined" defaultValue=''
                        placeholder='Enter Lastname' autoFocus
                        {...register("lastname")}
                        size="small"
                        helperText={errors.lastname?.message}
                        error={errors.lastname?true :false}/>
                </Grid>
                <Grid item md={12} xs={12}>  
                    <TextField fullWidth label="Firstname" variant="outlined" 
                        placeholder='Enter Firstname' 
                        size="small"
                        {...register("firstname")}
                        helperText={errors.firstname?.message}
                        error={errors.firstname?true :false}/>
                </Grid>
                <Grid item md={12} xs={12}>  
                 <TextField fullWidth label="Phone" variant="outlined"
                    placeholder='Enter Phone' {...register("phone")} 
                    size="small"
                    helperText={errors.phone?.message}
                    error={errors.phone?true :false}/>
                </Grid>  
                <Grid item md={12} xs={12}>  
                <TextField fullWidth label="Email" variant="outlined"
                    placeholder='Enter Email' {...register("email")} 
                    size="small"
                    helperText={errors.email?.message}
                    error={errors.email?true :false}/>
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
            updateMyProfileAction: (id:string,data:string,onSuccess:any,onError:any) => dispatch(C5_UpdateMyProfileAction(id,data,onSuccess,onError))
        }
    }



export default connect(mapStateToProps,mapDispatchToProps)(UpdateProfileView);


