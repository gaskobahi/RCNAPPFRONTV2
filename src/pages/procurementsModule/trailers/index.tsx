import React, { useEffect } from 'react';
import TrailersViews from '../../../views/procurementsModule/trailers';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getTrailersAction } from '../../../redux/actions/ProcurementsModule/trailers';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import { C5_getVehiclebrandsAction } from '../../../redux/actions/ProcurementsModule/vehiclebrands';


interface PageTrailerProps {
    gettrailers: any;
    getTrailersAction:(res:any,res1:any)=>void;     
    getVehiclebrandsAction:(res:any,res1:any)=>void;     
    
  }
  


 const TrailersPage=(props:PageTrailerProps)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetTrailersSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetTrailersError=(res:any)=>{
        console.log(res)
    }
    const _onSuccess=(res:any)=>{
        //console.log(res)
      }
     const _onError=(res:any)=>{
        // console.log(res)
     }

    useEffect(()=>{
        props.getTrailersAction(_onGetTrailersSuccess,_onGetTrailersError)
        props.getVehiclebrandsAction(_onSuccess,_onError)

        
    },[])

    return (
            <>
            {myloading?
                CAN(UserAction.Read,EntityUSERMODAbilty.TRAILERS)? <TrailersViews props={props}/>:<NotAuthorizedPage/>
            :
            <MyLoadingPinner/>}
            </> 
            )
    
}



interface StateProps {
    trailers: any,
}

const mapStateToProps = (state:StateProps) => {
    const { gettrailers} = state.trailers;
    return { gettrailers}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getTrailersAction: (onSuccess:any,onError:any)=> dispatch(C5_getTrailersAction(onSuccess,onError)), 
        getVehiclebrandsAction:(onSuccess:any,onError:any)=> dispatch(C5_getVehiclebrandsAction(onSuccess,onError)),
 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TrailersPage);


