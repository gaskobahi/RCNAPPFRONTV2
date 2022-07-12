import React, { useState } from  'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import {toast } from 'react-toastify';
import { C5_UpdateMyProfileAction, C5_UserProfileAction } from '../../../redux/actions/Auth/AuthActions';
import UpdateProfileView from './updateProfile';
import ChangeMyPasswordView from './changeMyPassword';
import { emailRegExp, phoneRegExp } from '../../../Helpers/helpMenuTree';
//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//const emailRegExp=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface AuthUpdateMyProfile {
    lastname: string;
    firstname: string;
    phone: string;
    email: string;
}

const formSchemaUpdateProfile = Yup.object().shape({
    lastname: Yup.lazy((value) => (value === '' ? Yup.string() : Yup.string().nullable().trim().min(3, 'Lastname must be at 3 char short').max(15, 'Lastname must be at 15 char long'))),
    firstname: Yup.lazy((value) => (value === '' ? Yup.string(): Yup.string().nullable().min(3, 'Lastname must be at 3 char short').max(30, 'Lastname must be at 15 char long'))),
    phone: Yup.lazy((value) => (value === '' ? Yup.string(): Yup.string().matches(phoneRegExp, 'Phone number is not valid'))),
    email: Yup.lazy((value) => (value === '' ? Yup.string(): Yup.string().matches(emailRegExp, 'Email is not valid').trim())),
})

const  ProfileView =(props:any)=>{
    let {getuserprofile}=props;
    const dispatch:any= useDispatch();
    const formOptions:any = { resolver: yupResolver(formSchemaUpdateProfile)}
    const { register, handleSubmit, reset,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

    const _onSuccessUpdateProfile=(res:any)=>{
        toast.success("Your profile updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
        reset()
        const onGetProfESuccess=(res:any)=>{
            console.log(res)
        }
        const onGetProfError=(res:any)=>{
            console.warn(res)
        }
        dispatch(C5_UserProfileAction(onGetProfESuccess,onGetProfError))
    }
    const _onErrorUpdateProfile=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
    }

    const _onSubmitUpdateMyProfile = (data:any)=>{
       let dt:any={}
       if(data.firstname)dt.firstname=data.firstname;
       if(data.lastname)dt.lastname=data.lastname;
       if(data.phone)dt.phone=data.phone;
       if(data.email)dt.email=data.email;
       let id= getuserprofile?.id;
       if(Object.keys(dt).length!=0){
           //isnot empty
         dispatch(props.updateMyProfileAction(id,dt,_onSuccessUpdateProfile,_onErrorUpdateProfile));

       }
    }
 

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card card-primary card-outline">
                    <div className="card-body box-profile">
                        <div className="text-center">
                            <img className="profile-user-img img-fluid img-circle"
                                src="adminlte/dist/img/useravatar.png"
                                alt="User profile picture"/>
                        </div>
                        <h3 className="profile-username text-center">{getuserprofile?.username}</h3>
                        <p className="text-muted text-center">{getuserprofile?.role?.name}</p>
                        <ul className="list-group list-group-unbordered mb-3">
                            <li className="list-group-item">
                            <b>Lastname</b> <a className="float-right">{getuserprofile?.lastname}</a>
                            </li>
                            <li className="list-group-item">
                                <b>Firstname</b> <a className="float-right">{getuserprofile?.firstname}</a>
                            </li>
                            <li className="list-group-item">
                            <b>Phone</b> <a className="float-right">{getuserprofile?.phone}</a>
                            </li>
                            {getuserprofile.email?
                            <li className="list-group-item">
                            <b>Email</b> <a className="float-right">{getuserprofile?.email}</a>
                            </li>
                                :""}
                            {getuserprofile.service?
                            <li className="list-group-item">
                                <b>Service</b> <a className="float-right">{getuserprofile?.service?.name}</a>
                                </li>
                                :""}
                        </ul>
                        <a className="btn btn-primary btn-block"><b>{getuserprofile?.role?.name}</b></a>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card">
                    <div className="card-header p-2">
                    <ul className="nav nav-pills">
                        <li className="nav-item"><a className="active nav-link" href="#updatemyprofile" data-toggle="tab">Update my profile</a></li>
                        <li className="nav-item"><a className="nav-link" href="#changemyppassword" data-toggle="tab">Change my password</a></li>
                    </ul>
                    </div>
                    <div className="card-body">
                    <div className="tab-content">
                        <div className=" active tab-pane" id="updatemyprofile">
                           <UpdateProfileView/>
                        </div>
                        <div className="tab-pane" id="changemyppassword">
                           <ChangeMyPasswordView/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
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



export default connect(mapStateToProps,mapDispatchToProps)(ProfileView);


