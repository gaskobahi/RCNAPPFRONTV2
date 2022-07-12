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



import {C5_getRegionsAction, C5_DeleteRegionAction } from "../../../redux/actions/LocationsModule/regions";
import LoadingButton from "@mui/lab/LoadingButton";
import { alertTitleClasses } from "@mui/material";







  interface ModalRegionProps {
    openRegionModal: boolean;
    closeDeleteRegionModal: () => void;
    region: any;
    getregions:any
    deleteRegionAction:(id:string,res:any,res1:any)=>void;
    getRegionsAction:(res:any,res1:any)=>void;

    
  
  }
  



const ModalDeleteRegion = (props:ModalRegionProps) => {
  const [regionstatus,setRegionStatus]=useState()
  const region = props.region && props.region;
  const [isloading,setIsLoading]=useState(false)

  const _getRefreshStatus=(regions:any=[],regionId:string)=>{
     const u:any=[]=regions.filter((usr:any)=>usr.id===regionId)
     setRegionStatus(u[0].isActive);
  }

  
 
  
  const  _handledeleteRegion=(id:string)=>()=> {
    const onDeleteRegionSuccess=(res:any)=>{
        setIsLoading(false)
        const onSuccesGet=(res:any)=>{props.closeDeleteRegionModal()}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=region.code+" :deleted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getRegionsAction(onSuccesGet,onErrorGet)
      }
    const onDeleteRegionError=(res:any)=>{
      let message409="Relation conflict"
      res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       setIsLoading(false)
       props.closeDeleteRegionModal(); 
    }
     props.deleteRegionAction(id,onDeleteRegionSuccess,onDeleteRegionError)
  }


  const _cancel=()=>{
    props.closeDeleteRegionModal(); 
  }

  
  useEffect(() => {
  }, []);

  return (
      <Modal open= {props.openRegionModal} onClose={_cancel}>
        <Container maxWidth="sm">
              <Card>
                <CardHeader 
                    subheader="" title= {"CONFIRM region DELETION"}/>
                  <Divider />
                  <CardContent>
                      <Grid item md={12} xs={12}>
                            <h4> { "Do you confirm the deletion of "+region.code+'?' }</h4>
                            <br/>
                      </Grid>
                      <Grid item md={12} xs={12}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start">
                                Cancel
                        </LoadingButton>
                          <LoadingButton  variant="contained" color="error" onClick={_handledeleteRegion(region.id)}   loadingPosition="start"
                            loading={isloading?true:false}>
                                Confirm Delete Region 
                          </LoadingButton>
                      </Grid>
                    </CardContent>
              </Card>        
        </Container>
      </Modal>
  );
};


const mapStateToProps = (state:any) => {
  const { getregions } = state.regions;

  return {getregions}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    deleteRegionAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeleteRegionAction(id,onSuccess,onError)),
    getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalDeleteRegion);