import React, { useEffect } from 'react';
import ProcurementsViews from '../../../views/procurementsModule/procurements';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getProcurementsAction, C5_getProcurementsv2Action } from '../../../redux/actions/ProcurementsModule/procurements';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import { C5_getRegionsAction } from '../../../redux/actions/LocationsModule/regions';
import { C5_getPlacesAction } from '../../../redux/actions/LocationsModule/places';
import { C5_getSuppliersAction } from '../../../redux/actions/ProcurementsModule/suppliers';
import { C5_getStacksAction } from '../../../redux/actions/ProcurementsModule/stacks';
import { C5_getTdechargmentsAction } from '../../../redux/actions/ProcurementsModule/tdechargments';
import { C5_getFtransfertsAction } from '../../../redux/actions/ProcurementsModule/ftransferts';
import { C5_getRcncontrolsAction } from '../../../redux/actions/ProcurementsModule/rcncontrols';
import { C5_getYieldinspectionsAction } from '../../../redux/actions/ProcurementsModule/yieldinspections';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import { authProvider } from '../../../AuthProvider';

 const ProcurementsPage=(props:any)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);
    let {checkAuth}=authProvider;
    const auth=checkAuth();
    const _onGetProcurementsSuccess=(res:any)=>{
        setMyLoading(true)
       console.log(res)
     }
    const _onGetProcurementsError=(res:any)=>{
        console.log(res)
         //setMyLoading(true)

    }
    const _onGetProcurementsv2Success=(res:any)=>{
        console.log(res)
      }
     const _onGetProcurementsv2Error=(res:any)=>{
         console.log(res)
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
     const _onGetStacksSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetStacksError=(res:any)=>{
         console.log(res)
     }
     const _onGetTdechargmentsSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetTdechargmentsError=(res:any)=>{
         console.log(res)
     }

     const _onGetFtransfertsSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetFtransfertsError=(res:any)=>{
         console.log(res)
     }
     
     const _onGetRcncontrolsSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetRcncontrolsError=(res:any)=>{
         console.log(res)
     }
    
     const _onGetYieldinspectionsSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetYieldinspectionsError=(res:any)=>{
         console.log(res)
     }
     
    useEffect(()=>{
        props.getProcurementsAction(_onGetProcurementsSuccess,_onGetProcurementsError)
        props.getProcurementsv2Action(_onGetProcurementsv2Success,_onGetProcurementsError)
        props.getSuppliersAction(_onGetSuppliersSuccess,_onGetSuppliersError)
        props.getRegionsAction(_onGetRegionsSuccess,_onGetRegionsError)
        props.getPlacesAction(_onGetPlacesSuccess,_onGetPlacesError)
        props.getStacksAction(_onGetStacksSuccess,_onGetStacksError)
        props.getTdechargmentsAction(_onGetTdechargmentsSuccess,_onGetTdechargmentsError)
        props.getFtransfertsAction(_onGetFtransfertsSuccess,_onGetFtransfertsError)
        props.getRcncontrolsAction(_onGetRcncontrolsSuccess,_onGetRcncontrolsError)
        props.getYieldinspectionsAction(_onGetYieldinspectionsSuccess,_onGetYieldinspectionsError)
    },[])

    return (
            <>
              {myloading?
                    CAN(UserAction.Read,EntityUSERMODAbilty.PROCUREMENTS)? <ProcurementsViews props={props}/>:<NotAuthorizedPage/>
               :
             <MyLoadingPinner/>}
           
            </>
            )
} 



interface StateProps {
    procurements: any,
    regions:any,
    places:any
}

const mapStateToProps = (state:StateProps) => {
    const { getprocurements} = state.procurements;
    const { getregions} = state.regions;
    const { getplaces} = state.places;
    return { getprocurements,getregions,getplaces}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getProcurementsAction: (onSuccess:any,onError:any)=> dispatch(C5_getProcurementsAction(onSuccess,onError)),
        getProcurementsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getProcurementsv2Action(onSuccess,onError)),

        
        getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError)),
        getPlacesAction: (onSuccess:any,onError:any)=> dispatch(C5_getPlacesAction(onSuccess,onError)),
        getSuppliersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSuppliersAction(onSuccess,onError)),
        getStacksAction: (onSuccess:any,onError:any)=> dispatch(C5_getStacksAction(onSuccess,onError)),
        getTdechargmentsAction: (onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentsAction(onSuccess,onError)),
        getFtransfertsAction: (onSuccess:any,onError:any)=> dispatch(C5_getFtransfertsAction(onSuccess,onError)),
        getRcncontrolsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRcncontrolsAction(onSuccess,onError)),
        getYieldinspectionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getYieldinspectionsAction(onSuccess,onError)),

        
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProcurementsPage);


