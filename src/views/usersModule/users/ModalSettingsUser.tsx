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
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';

import { connect } from 'react-redux';
import {toast } from 'react-toastify';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import {C5_getUsersAction, C5_UserSettingsAction } from "../../../redux/actions/UsersModule/users";

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





  interface ModalSettingsUserProps {
    openModal: boolean;
    closeSettingsUserModal: () => void;
    user: any;
    getusers:any
    userChangeStatusAction:(id:string,data:any,res:any,res1:any)=>void;
    userIsChangeUsernameAction:(id:string,data:any,res:any,res1:any)=>void;
    getUsersAction:(res:any,res1:any)=>void;

    
  
  }
  



const ModalSettingsUser = (props:ModalSettingsUserProps) => {
  const className = useStyles();
  const [userstatus,setUserStatus]=useState()
  const [caneditusrname,setUsercanEditUsrname]=useState()


  const [actualuser,setActualUser]=useState()

  const user = props.user && props.user;

    
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

  

  const _getRefreshStatus=(users:any=[],userId:string)=>{
     const u:any=[]=users.filter((usr:any)=>usr.id===userId)
     setUserStatus(u[0].isActive);
  }

  
  const _getRefreshcanEditUsrname=(users:any=[],userId:string)=>{
    const u:any=[]=users.filter((usr:any)=>usr.id===userId)
    setUsercanEditUsrname(u[0].caneditusrname);
 }

  
  const  _handleChangestatus=()=> {
    let data:any={};
    if(userstatus){data.isActive=false;}else{data.isActive=true;}
    const onChangestatusSuccess=(res:any)=>{
        /*setIsLoading(false)*/
        const onSuccesGet=(res:any)=>{ _getRefreshStatus(res,user.id)}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=user.username+" :status changed successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getUsersAction(onSuccesGet,onErrorGet)

      }
    const onChangestatusError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       //setIsLoading(false)
    }
     props.userChangeStatusAction(user.id,data,onChangestatusSuccess,onChangestatusError)
  }

  const  _handleChangeusername=()=> {
    let data:any={};
    if(caneditusrname){ data.caneditusrname=false;}else{data.caneditusrname=true;}
    const onChangeEditusrnameSuccess=(res:any)=>{
        /*setIsLoading(false)*/
        const onSuccesGet=(res:any)=>{ _getRefreshcanEditUsrname(res,user.id)}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message="updated successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getUsersAction(onSuccesGet,onErrorGet)

      }
    const onChangeEditusrnameError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       //setIsLoading(false)
    }
     props.userIsChangeUsernameAction(user.id,data,onChangeEditusrnameSuccess,onChangeEditusrnameError)
  }


  const _cancel=()=>{
    props.closeSettingsUserModal(); 
  }

  
  useEffect(() => {
    if(props && props.getusers){
        _getRefreshcanEditUsrname(props.getusers,user.id)
        _getRefreshStatus(props.getusers,user.id)
    }
  }, []);

  return (
      <Modal open= {props.openModal} onClose={_cancel}>
        <Container maxWidth="sm">
              <Card>
                <CardHeader
                    subheader="" title= {"Settings : " +props.user.username}/>
                  <Divider />
                  <CardContent>
                      <div className="card-body p-0">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th >Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                                <td>Can modify his username</td>
                                <td>
                                    <Switch checked={caneditusrname} onChange={_handleChangeusername} inputProps={{ 'aria-label': 'controlled' }}/>
                                </td>
                            </tr>
                            <tr>
                              <td>Change status</td>
                              <td>
                                <Switch checked={userstatus} onChange={_handleChangestatus} inputProps={{ 'aria-label': 'controlled' }}/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                 </CardContent>
              </Card>        
        </Container>
      </Modal>
  );
};


const mapStateToProps = (state:any) => {
  const { getusers } = state.users;

  return {getusers}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    userChangeStatusAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UserSettingsAction(id,data,onSuccess,onError)),
    userIsChangeUsernameAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UserSettingsAction(id,data,onSuccess,onError)),

    getUsersAction: (onSuccess:any,onError:any)=> dispatch(C5_getUsersAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalSettingsUser);