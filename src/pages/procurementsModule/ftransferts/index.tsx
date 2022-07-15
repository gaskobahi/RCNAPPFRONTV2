import React, { useEffect } from 'react';
import FtransfertsViews from '../../../views/procurementsModule/ftransferts';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getFtransfertsAction } from '../../../redux/actions/ProcurementsModule/ftransferts';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import { C5_getRegionsAction } from '../../../redux/actions/LocationsModule/regions';
import { C5_getPlacesAction } from '../../../redux/actions/LocationsModule/places';
import { C5_getSuppliersAction } from '../../../redux/actions/ProcurementsModule/suppliers';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import { C5_getVehiclesAction } from '../../../redux/actions/ProcurementsModule/vehicles';
import { C5_getCarriersAction } from '../../../redux/actions/ProcurementsModule/carriers';
import { C5_getTrailersAction } from '../../../redux/actions/ProcurementsModule/trailers';
import { C5_getDriversAction } from '../../../redux/actions/ProcurementsModule/drivers';
import { C5_getVehiclebrandsAction } from '../../../redux/actions/ProcurementsModule/vehiclebrands';

 const FtransfertsPage=(props:any)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetFtransfertsSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetFtransfertsError=(res:any)=>{
        console.log(res)
         //setMyLoading(true) 
    }
   
    const _onGetSuppliersSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetSuppliersError=(res:any)=>{
         console.log(res)
     }

   
    const _onGetRegionsSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetRegionsError=(res:any)=>{
         console.log(res)
     }
    
     const _onGetPlacesSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetPlacesError=(res:any)=>{
         console.log(res)
     }
     const _onGetTrailersSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetTrailersError=(res:any)=>{
         console.log(res)
     }

     const _onGetVehiclesSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetVehiclesError=(res:any)=>{
         console.log(res)
     }
     const _onGetCarriersSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetCarriersError=(res:any)=>{
         console.log(res)
     }
     const _onGetDriversSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetDriversError=(res:any)=>{
         console.log(res)
     }

     const _onGetVehiclebrandsSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetVehiclebrandsError=(res:any)=>{
         console.log(res)
     }
     
    useEffect(()=>{
        props.getFtransfertsAction(_onGetFtransfertsSuccess,_onGetFtransfertsError)

        props.getSuppliersAction(_onGetSuppliersSuccess,_onGetSuppliersError)
        
        props.getTrailersAction(_onGetTrailersSuccess,_onGetTrailersError)
        

        props.getVehiclesAction(_onGetVehiclesSuccess,_onGetVehiclesError)
        props.getCarriersAction(_onGetCarriersSuccess,_onGetCarriersError)
            
        props.getDriversAction(_onGetDriversSuccess,_onGetDriversError)
               
        props.getRegionsAction(_onGetRegionsSuccess,_onGetRegionsError)
        
        props.getPlacesAction(_onGetPlacesSuccess,_onGetPlacesError)
         
        props.getVehiclebrandsAction(_onGetPlacesSuccess,_onGetPlacesError)

        props.getVehiclebrandsAction(_onGetVehiclebrandsSuccess,_onGetVehiclebrandsError)
    },[])

    return (
            <>
            {myloading?
                CAN(UserAction.Read,EntityUSERMODAbilty.FTRANSFERTS)? (
                        <FtransfertsViews props={props}/>):<NotAuthorizedPage/>
                :
                <MyLoadingPinner/>
                }  
            </> 
            )
    
}



interface StateProps {
    ftransferts: any,
    regions:any,
    places:any,
    suppliers:any,
    trailers:any;
    vehicles:any,
    carriers:any,
    drivers:any;

    vehiclebrands:any;
}

const mapStateToProps = (state:StateProps) => {
    const { getftransferts} = state.ftransferts;
    const { getregions} = state.regions;
    const { getplaces} = state.places;
    const { getsuppliers} = state.suppliers;
    const { gettrailers} = state.trailers;
    const { getvehicles} = state.vehicles;
    const { getcarriers} = state.carriers;
    const { getdrivers} = state.drivers;

    const { getvehiclebrands} = state.vehiclebrands;


    
    return { getftransferts,getregions,getplaces,
          getsuppliers,gettrailers,getvehicles,getcarriers,getdrivers,

          getvehiclebrands,
        }
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getFtransfertsAction: (onSuccess:any,onError:any)=> dispatch(C5_getFtransfertsAction(onSuccess,onError)),
        getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError)),
        getPlacesAction: (onSuccess:any,onError:any)=> dispatch(C5_getPlacesAction(onSuccess,onError)),
        
        getSuppliersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSuppliersAction(onSuccess,onError)),
        getTrailersAction: (onSuccess:any,onError:any)=> dispatch(C5_getTrailersAction(onSuccess,onError)),
        getVehiclesAction: (onSuccess:any,onError:any)=> dispatch(C5_getVehiclesAction(onSuccess,onError)),
        getCarriersAction: (onSuccess:any,onError:any)=> dispatch(C5_getCarriersAction(onSuccess,onError)),
        getDriversAction: (onSuccess:any,onError:any)=> dispatch(C5_getDriversAction(onSuccess,onError)),

        getVehiclebrandsAction: (onSuccess:any,onError:any)=> dispatch(C5_getVehiclebrandsAction(onSuccess,onError)),

        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FtransfertsPage);


