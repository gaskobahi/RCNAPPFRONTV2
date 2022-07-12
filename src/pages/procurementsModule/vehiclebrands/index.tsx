import React, { useEffect } from 'react';
import VehiclebrandsViews from '../../../views/procurementsModule/vehiclebrands';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getVehiclebrandsAction } from '../../../redux/actions/ProcurementsModule/vehiclebrands';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import { C5_getSuppliersAction } from '../../../redux/actions/ProcurementsModule/suppliers';


interface PageVehiclebrandProps {
    getvehiclebrands: any;
    getVehiclebrandsAction:(res:any,res1:any)=>void;     
 
    
  }
  


 const VehiclebrandsPage=(props:PageVehiclebrandProps)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetVehiclebrandsSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetVehiclebrandsError=(res:any)=>{
        console.log(res)
    }
   

    useEffect(()=>{
        props.getVehiclebrandsAction(_onGetVehiclebrandsSuccess,_onGetVehiclebrandsError)
    },[])

    return (
            <>
            {myloading?
                CAN(UserAction.Read,EntityUSERMODAbilty.VEHICLEBRANDS)? <VehiclebrandsViews props={props}/>:<NotAuthorizedPage/>
            :
            <MyLoadingPinner/>}
            </> 
            )
    
}



interface StateProps {
    vehiclebrands: any,
}

const mapStateToProps = (state:StateProps) => {
    const { getvehiclebrands} = state.vehiclebrands;
    return { getvehiclebrands}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getVehiclebrandsAction: (onSuccess:any,onError:any)=> dispatch(C5_getVehiclebrandsAction(onSuccess,onError)),  
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VehiclebrandsPage);


