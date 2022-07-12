import React, { useEffect } from 'react';
import RegionsViews from '../../../views/locationsModule/regions';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getRegionsAction } from '../../../redux/actions/LocationsModule/regions';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import MyLoadingPinner from '../../../components/Loading';

 const RegionsPage=(props:any)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetRegionsSuccess=(res:any)=>{
       //console.log(res)
       setMyLoading(true)
     }
    const _onGetRegionsError=(res:any)=>{
       // console.log(res)
    }
   
  
    useEffect(()=>{
        props.getRegionsAction(_onGetRegionsSuccess,_onGetRegionsError)
        
    },[])

    return (
            <>
            {myloading?
                CAN(UserAction.Read,EntityUSERMODAbilty.REGIONS)? <RegionsViews props={props}/>:<NotAuthorizedPage/>
            :
            <MyLoadingPinner/>}
            </> 
        )
            
    
}



interface StateProps {
    regions: any
}

const mapStateToProps = (state:StateProps) => {
    const { getregions} = state.regions;
    return { getregions}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError)),        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegionsPage);


