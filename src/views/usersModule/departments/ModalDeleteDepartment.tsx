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



import {C5_getDepartmentsAction, C5_DeleteDepartmentAction } from "../../../redux/actions/UsersModule/departments";
import LoadingButton from "@mui/lab/LoadingButton";
import { alertTitleClasses } from "@mui/material";







  interface ModalDepartmentProps {
    openDepartmentModal: boolean;
    closeDeleteDepartmentModal: () => void;
    department: any;
    getdepartments:any
    deleteDepartmentAction:(id:string,res:any,res1:any)=>void;
    getDepartmentsAction:(res:any,res1:any)=>void;

    
  
  }
  



const ModalDeleteDepartment = (props:ModalDepartmentProps) => {
  const [departmentstatus,setDepartmentStatus]=useState()
  const department = props.department && props.department;
  const [isloading,setIsLoading]=useState(false)

  const _getRefreshStatus=(departments:any=[],departmentId:string)=>{
     const u:any=[]=departments.filter((usr:any)=>usr.id===departmentId)
     setDepartmentStatus(u[0].isActive);
  }

  
 
  
  const  _handledeleteDepartment=(id:string)=>()=> {
    const onDeleteDepartmentSuccess=(res:any)=>{
        setIsLoading(false)
        const onSuccesGet=(res:any)=>{props.closeDeleteDepartmentModal()}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=department.code+" :deleted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getDepartmentsAction(onSuccesGet,onErrorGet)
      }
    const onDeleteDepartmentError=(res:any)=>{
      let message409="Relation conflict"
      res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       setIsLoading(false)
       props.closeDeleteDepartmentModal(); 
    }
     props.deleteDepartmentAction(id,onDeleteDepartmentSuccess,onDeleteDepartmentError)
  }


  const _cancel=()=>{
    props.closeDeleteDepartmentModal(); 
  }

  
  useEffect(() => {
  }, []);

  return (
      <Modal open= {props.openDepartmentModal} onClose={_cancel}>
        <Container maxWidth="sm">
              <Card>
                <CardHeader 
                    subheader="" title= {"CONFIRM department DELETION"}/>
                  <Divider />
                  <CardContent>
                      <Grid item md={12} xs={12}>
                            <h4> { "Do you confirm the deletion of "+department.code+'?' }</h4>
                            <br/>
                      </Grid>
                      <Grid item md={12} xs={12}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start">
                                Cancel
                        </LoadingButton>
                          <LoadingButton  variant="contained" color="error" onClick={_handledeleteDepartment(department.id)}   loadingPosition="start"
                            loading={isloading?true:false}>
                                Confirm Delete Department 
                          </LoadingButton>
                      </Grid>
                    </CardContent>
              </Card>        
        </Container>
      </Modal>
  );
};


const mapStateToProps = (state:any) => {
  const { getdepartments } = state.departments;

  return {getdepartments}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    deleteDepartmentAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteDepartmentAction(id,onSuccess,onError)),
    getDepartmentsAction: (onSuccess:any,onError:any)=> dispatch(C5_getDepartmentsAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalDeleteDepartment);