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



import {C5_getPlacesAction, C5_DeletePlaceAction } from "../../../redux/actions/LocationsModule/places";
import LoadingButton from "@mui/lab/LoadingButton";
import { alertTitleClasses } from "@mui/material";







  interface ModalPlaceProps {
    openPlaceModal: boolean;
    closeDeletePlaceModal: () => void;
    place: any;
    getplaces:any
    deletePlaceAction:(id:string,res:any,res1:any)=>void;
    getPlacesAction:(res:any,res1:any)=>void;

    
  
  }
  



const ModalDeletePlace = (props:ModalPlaceProps) => {
  const [placestatus,setPlaceStatus]=useState()
  const place = props.place && props.place;
  const [isloading,setIsLoading]=useState(false)

  const _getRefreshStatus=(places:any=[],placeId:string)=>{
     const u:any=[]=places.filter((usr:any)=>usr.id===placeId)
     setPlaceStatus(u[0].isActive);
  }

  
 
  
  const  _handledeletePlace=(id:string)=>()=> {
    const onDeletePlaceSuccess=(res:any)=>{
        setIsLoading(false)
        const onSuccesGet=(res:any)=>{props.closeDeletePlaceModal()}
        const onErrorGet=(res:any)=>{console.log(res)}
        let message=place.code+" :deleted successfully";
        toast.success(message,{position:toast.POSITION.BOTTOM_CENTER});
        props.getPlacesAction(onSuccesGet,onErrorGet)
      }
    const onDeletePlaceError=(res:any)=>{
      let message409="Relation conflict"
      res.statusCode=409? toast.error(message409,{position:toast.POSITION.TOP_CENTER}):toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
       setIsLoading(false)
       props.closeDeletePlaceModal(); 
    }
     props.deletePlaceAction(id,onDeletePlaceSuccess,onDeletePlaceError)
  }


  const _cancel=()=>{
    props.closeDeletePlaceModal(); 
  }

  
  useEffect(() => {
  }, []);

  return (
      <Modal open= {props.openPlaceModal} onClose={_cancel}>
        <Container maxWidth="sm">
              <Card>
                <CardHeader 
                    subheader="" title= {"CONFIRM place DELETION"}/>
                  <Divider />
                  <CardContent>
                      <Grid item md={12} xs={12}>
                            <h4> { "Do you confirm the deletion of "+place.code+'?' }</h4>
                            <br/>
                      </Grid>
                      <Grid item md={12} xs={12}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start">
                                Cancel
                        </LoadingButton>
                          <LoadingButton  variant="contained" color="error" onClick={_handledeletePlace(place.id)}   loadingPosition="start"
                            loading={isloading?true:false}>
                                Confirm Delete Place 
                          </LoadingButton>
                      </Grid>
                    </CardContent>
              </Card>        
        </Container>
      </Modal>
  );
};


const mapStateToProps = (state:any) => {
  const { getplaces } = state.places;

  return {getplaces}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    deletePlaceAction: (id:string,onSuccess:any,onError:any)=> dispatch(C5_DeletePlaceAction(id,onSuccess,onError)),
    getPlacesAction: (onSuccess:any,onError:any)=> dispatch(C5_getPlacesAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalDeletePlace);