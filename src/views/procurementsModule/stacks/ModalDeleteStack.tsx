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



import {C5_getStacksAction, C5_DeleteStackAction } from "../../../redux/actions/ProcurementsModule/stacks";
import LoadingButton from "@mui/lab/LoadingButton";
import { alertTitleClasses } from "@mui/material";







  interface ModalStackProps {
    openStackModal: boolean;
    closeDeleteStackModal: () => void;
    stack: any;
    getstacks:any
    deleteStackAction:(id:string,res:any,res1:any)=>void;
    getStacksAction:(res:any,res1:any)=>void;

    
  
  }
  



const ModalDeleteStack = (props:ModalStackProps) => {
  const [stackstatus,setStackStatus]=useState()
  const stack = props.stack && props.stack;
  const [isloading,setIsLoading]=useState(false)

  const _getRefreshStatus=(stacks:any=[],stackId:string)=>{
     const u:any=[]=stacks.filter((usr:any)=>usr.id===stackId)
     setStackStatus(u[0].isActive);
  }

  
 
  
  const  _handledeleteStack=(id:string)=>()=> {
    const onDeleteStackSuccess=(res:any)=>{
        setIsLoading(false)
        const onSuccesGet=(res:any)=>{props.closeDeleteStackModal()}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=stack.code+" :deleted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getStacksAction(onSuccesGet,onErrorGet)
      }
    const onDeleteStackError=(res:any)=>{
      let message409="Relation conflict"
      res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       setIsLoading(false)
       props.closeDeleteStackModal(); 
    }
     props.deleteStackAction(id,onDeleteStackSuccess,onDeleteStackError)
  }


  const _cancel=()=>{
    props.closeDeleteStackModal(); 
  }

  
  useEffect(() => {
  }, []);

  return (
      <Modal open= {props.openStackModal} onClose={_cancel}>
        <Container maxWidth="sm">
              <Card>
                <CardHeader 
                    subheader="" title= {"CONFIRM stack DELETION"}/>
                  <Divider />
                  <CardContent>
                      <Grid item md={12} xs={12}>
                            <h4> { "Do you confirm the deletion of "+stack.code+'?' }</h4>
                            <br/>
                      </Grid>
                      <Grid item md={12} xs={12}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start">
                                Cancel
                        </LoadingButton>
                          <LoadingButton  variant="contained" color="error" onClick={_handledeleteStack(stack.id)}   loadingPosition="start"
                            loading={isloading?true:false}>
                                Confirm Delete Stack 
                          </LoadingButton>
                      </Grid>
                    </CardContent>
              </Card>        
        </Container>
      </Modal>
  );
};


const mapStateToProps = (state:any) => {
  const { getstacks } = state.stacks;

  return {getstacks}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    deleteStackAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteStackAction(id,onSuccess,onError)),
    getStacksAction: (onSuccess:any,onError:any)=> dispatch(C5_getStacksAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalDeleteStack);