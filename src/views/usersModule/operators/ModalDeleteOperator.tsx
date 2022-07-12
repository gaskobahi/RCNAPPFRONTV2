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



import {C5_getOperatorsAction, C5_DeleteOperatorAction } from "../../../redux/actions/UsersModule/operators";
import LoadingButton from "@mui/lab/LoadingButton";







  interface ModalSettingsOperatorProps {
    openModal: boolean;
    closeDeleteOperatorModal: () => void;
    operator: any;
    getoperators:any
    deleteOperatorAction:(id:string,res:any,res1:any)=>void;
    getOperatorsAction:(res:any,res1:any)=>void;

    
  
  }
  



const ModalDeleteOperator = (props:ModalSettingsOperatorProps) => {
  const [operatorstatus,setOperatorStatus]=useState()
  const operator = props.operator && props.operator;
  const [isloading,setIsLoading]=useState(false)

  const _getRefreshStatus=(operators:any=[],operatorId:string)=>{
     const u:any=[]=operators.filter((usr:any)=>usr.id===operatorId)
     setOperatorStatus(u[0].isActive);
  }

  
 
  
  const  _handledeleteOperator=(id:string)=>()=> {
    const onDeleteOperatorSuccess=(res:any)=>{
        setIsLoading(false)
        const onSuccesGet=(res:any)=>{props.closeDeleteOperatorModal()}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=operator.operatorname+" :deleted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getOperatorsAction(onSuccesGet,onErrorGet)
      }
    const onDeleteOperatorError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       setIsLoading(false)
    }
     props.deleteOperatorAction(id,onDeleteOperatorSuccess,onDeleteOperatorError)
  }


  const _cancel=()=>{
    props.closeDeleteOperatorModal(); 
  }

  
  useEffect(() => {
  }, []);

  return (
      <Modal open= {props.openModal} onClose={_cancel}>
        <Container maxWidth="sm">
              <Card>
                <CardHeader 
                    subheader="" title= {"CONFIRM operator DELETION"}/>
                  <Divider />
                  <CardContent>
                      <Grid item md={12} xs={12}>
                            <h4> { "Do you confirm the deletion of "+operator.username+'?' }</h4>
                            <br/>
                      </Grid>
                      <Grid item md={12} xs={12}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start">
                                Cancel
                        </LoadingButton>
                          <LoadingButton  variant="contained" color="error" onClick={_handledeleteOperator(operator.id)}   loadingPosition="start"
                            loading={isloading?true:false}>
                                Confirm Delete Operator 
                          </LoadingButton>
                      </Grid>
                    </CardContent>
              </Card>        
        </Container>
      </Modal>
  );
};


const mapStateToProps = (state:any) => {
  const { getoperators } = state.operators;

  return {getoperators}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    deleteOperatorAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteOperatorAction(id,onSuccess,onError)),
    getOperatorsAction: (onSuccess:any,onError:any)=> dispatch(C5_getOperatorsAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalDeleteOperator);