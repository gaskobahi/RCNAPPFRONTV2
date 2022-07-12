import React, { useEffect } from 'react';
import VehiclesViews from '../../../views/procurementsModule/vehicles';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getVehiclesAction } from '../../../redux/actions/ProcurementsModule/vehicles';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import { C5_getVehiclebrandsAction } from '../../../redux/actions/ProcurementsModule/vehiclebrands';


interface PageVehicleProps {
    getvehicles: any;
    getVehiclesAction:(res:any,res1:any)=>void;     
    getVehiclebrandsAction:(res:any,res1:any)=>void;     
    
  }
  


 const VehiclesPage=(props:PageVehicleProps)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetVehiclesSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetVehiclesError=(res:any)=>{
        console.log(res)
    }
    const _onSuccess=(res:any)=>{
        //console.log(res)
      }
     const _onError=(res:any)=>{
        // console.log(res)
     }

    useEffect(()=>{
        props.getVehiclesAction(_onGetVehiclesSuccess,_onGetVehiclesError)
        props.getVehiclebrandsAction(_onSuccess,_onError)

        
    },[])

    return (
            <>
            {myloading?
                CAN(UserAction.Read,EntityUSERMODAbilty.VEHICLES)? <VehiclesViews props={props}/>:<NotAuthorizedPage/>
            :
            <MyLoadingPinner/>}
            </> 
            )
    
}



interface StateProps {
    vehicles: any,
}

const mapStateToProps = (state:StateProps) => {
    const { getvehicles} = state.vehicles;
    return { getvehicles}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getVehiclesAction: (onSuccess:any,onError:any)=> dispatch(C5_getVehiclesAction(onSuccess,onError)), 
        getVehiclebrandsAction:(onSuccess:any,onError:any)=> dispatch(C5_getVehiclebrandsAction(onSuccess,onError)),
 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VehiclesPage);


