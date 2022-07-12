import {
  Container,
  makeStyles,
  Modal,
  Card,
  Grid,
  Divider,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import { connect } from 'react-redux';
import {toast } from 'react-toastify';



import {C5_getRolesAction, C5_DeleteRoleAction } from "../../../redux/actions/UsersModule/roles";
import LoadingButton from "@mui/lab/LoadingButton";
import { alertTitleClasses } from "@mui/material";







  interface ModalRoleProps {
    openRoleModal: boolean;
    closeDeleteRoleModal: () => void;
    role: any;
    getroles:any
    deleteRoleAction:(id:string,res:any,res1:any)=>void;
    getRolesAction:(res:any,res1:any)=>void;

    
  
  }
  



const ModalDeleteRole = (props:ModalRoleProps) => {
  const [rolestatus,setRoleStatus]=useState()
  const role = props.role && props.role;
  const [isloading,setIsLoading]=useState(false)

  const _getRefreshStatus=(roles:any=[],roleId:string)=>{
     const u:any=[]=roles.filter((usr:any)=>usr.id===roleId)
     setRoleStatus(u[0].isActive);
  }

  
 
  
  const  _handledeleteRole=(id:string)=>()=> {
    const onDeleteRoleSuccess=(res:any)=>{
        setIsLoading(false)
        const onSuccesGet=(res:any)=>{props.closeDeleteRoleModal()}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=role.code+" :deleted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getRolesAction(onSuccesGet,onErrorGet)
      }
    const onDeleteRoleError=(res:any)=>{
      let message409="Relation conflict"
      res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       setIsLoading(false)
       props.closeDeleteRoleModal(); 
    }
     props.deleteRoleAction(id,onDeleteRoleSuccess,onDeleteRoleError)
  }


  const _cancel=()=>{
    props.closeDeleteRoleModal(); 
  }

  
  useEffect(() => {
  }, []);

  return (
      <Modal open= {props.openRoleModal} onClose={_cancel}>
        <Container maxWidth="sm">
              <Card>
                <CardHeader 
                    subheader="" title= {"CONFIRM role DELETION"}/>
                  <Divider />
                  <CardContent>
                      <Grid item md={12} xs={12}>
                            <h4> { "Do you confirm the deletion of "+role.code+'?' }</h4>
                            <br/>
                      </Grid>
                      <Grid item md={12} xs={12}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start">
                                Cancel
                        </LoadingButton>
                          <LoadingButton  variant="contained" color="error" onClick={_handledeleteRole(role.id)}   loadingPosition="start"
                            loading={isloading?true:false}>
                                Confirm Delete Role 
                          </LoadingButton>
                      </Grid>
                    </CardContent>
              </Card>        
        </Container>
      </Modal>
  );
};


const mapStateToProps = (state:any) => {
  const { getroles } = state.roles;

  return {getroles}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    deleteRoleAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteRoleAction(id,onSuccess,onError)),
    getRolesAction: (onSuccess:any,onError:any)=> dispatch(C5_getRolesAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalDeleteRole);