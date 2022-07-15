import React, { useEffect } from 'react';
import RcncontrolsViews from '../../../views/procurementsModule/rcncontrols';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getRcncontrolsAction, C5_getRcncontrolsv2Action } from '../../../redux/actions/ProcurementsModule/rcncontrols';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import { C5_getRegionsAction } from '../../../redux/actions/LocationsModule/regions';
import { C5_getPlacesAction } from '../../../redux/actions/LocationsModule/places';
import { C5_getSuppliersAction } from '../../../redux/actions/ProcurementsModule/suppliers';
import { C5_getFtransfertsAction } from '../../../redux/actions/ProcurementsModule/ftransferts';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';

 const RcncontrolsPage=(props:any)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);


    const _onGetRcncontrolsSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetRcncontrolsError=(res:any)=>{
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
     const _onGetFtransfertsSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetFtransfertsError=(res:any)=>{
         console.log(res)
     }

    useEffect(()=>{
        props.getRcncontrolsAction(_onGetRcncontrolsSuccess,_onGetRcncontrolsError)
        props.getRcncontrolsv2Action(_onGetRcncontrolsSuccess,_onGetRcncontrolsError)

        
        props.getSuppliersAction(_onGetSuppliersSuccess,_onGetSuppliersError)
     
        props.getRegionsAction(_onGetRegionsSuccess,_onGetRegionsError)
        
        props.getPlacesAction(_onGetPlacesSuccess,_onGetPlacesError)
         

        props.getFtransfertsAction(_onGetFtransfertsSuccess,_onGetFtransfertsError)
        
    },[])

    return (
             <>
                {myloading?
                  CAN(UserAction.Read,EntityUSERMODAbilty.RCNCONTROLS)? (
                         <RcncontrolsViews props={props}/>):<NotAuthorizedPage/>
                  :
                  <MyLoadingPinner/>
                }  
             </> 
            )
}



interface StateProps {
    rcncontrols: any,
    regions:any,
    places:any
}

const mapStateToProps = (state:StateProps) => {
    const { getrcncontrols} = state.rcncontrols;
    const { getregions} = state.regions;
    const { getplaces} = state.places;
    return { getrcncontrols,getregions,getplaces}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getRcncontrolsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRcncontrolsAction(onSuccess,onError)),
        getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError)),
        getPlacesAction: (onSuccess:any,onError:any)=> dispatch(C5_getPlacesAction(onSuccess,onError)),
        getSuppliersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSuppliersAction(onSuccess,onError)),
        getFtransfertsAction: (onSuccess:any,onError:any)=> dispatch(C5_getFtransfertsAction(onSuccess,onError)),
        getRcncontrolsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getRcncontrolsv2Action(onSuccess,onError)),


        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RcncontrolsPage);


