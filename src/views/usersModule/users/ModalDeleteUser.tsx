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



import {C5_getUsersAction, C5_DeleteUserAction } from "../../../redux/actions/UsersModule/users";
import LoadingButton from "@mui/lab/LoadingButton";







  interface ModalSettingsUserProps {
    openModal: boolean;
    closeDeleteUserModal: () => void;
    user: any;
    getusers:any
    deleteUserAction:(id:string,res:any,res1:any)=>void;
    getUsersAction:(res:any,res1:any)=>void;

    
  
  }
  



const ModalDeleteUser = (props:ModalSettingsUserProps) => {
  const [userstatus,setUserStatus]=useState()
  const user = props.user && props.user;
  const [isloading,setIsLoading]=useState(false)

  const _getRefreshStatus=(users:any=[],userId:string)=>{
     const u:any=[]=users.filter((usr:any)=>usr.id===userId)
     setUserStatus(u[0].isActive);
  }

  
 
  
  const  _handledeleteUser=(id:string)=>()=> {
    const onDeleteUserSuccess=(res:any)=>{
        setIsLoading(false)
        const onSuccesGet=(res:any)=>{props.closeDeleteUserModal()}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=user.username+" :deleted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getUsersAction(onSuccesGet,onErrorGet)
      }
    const onDeleteUserError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       setIsLoading(false)
    }
     props.deleteUserAction(id,onDeleteUserSuccess,onDeleteUserError)
  }


  const _cancel=()=>{
    props.closeDeleteUserModal(); 
  }

  
  useEffect(() => {
  }, []);

  return (
      <Modal open= {props.openModal} onClose={_cancel}>
        <Container maxWidth="sm">
              <Card>
                <CardHeader 
                    subheader="" title= {"CONFIRM USER DELETION"}/>
                  <Divider />
                  <CardContent>
                      <Grid item md={12} xs={12}>
                            <h4> { "Do you confirm the deletion of "+user.username+'?' }</h4>
                            <br/>
                      </Grid>
                      <Grid item md={12} xs={12}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start">
                                Cancel
                        </LoadingButton>
                          <LoadingButton  variant="contained" color="error" onClick={_handledeleteUser(user.id)}   loadingPosition="start"
                            loading={isloading?true:false}>
                                Confirm Delete User 
                          </LoadingButton>
                      </Grid>
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
    deleteUserAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteUserAction(id,onSuccess,onError)),
    getUsersAction: (onSuccess:any,onError:any)=> dispatch(C5_getUsersAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalDeleteUser);