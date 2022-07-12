import React, { useEffect } from 'react';
import PlacesViews from '../../../views/locationsModule/places';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getPlacesAction } from '../../../redux/actions/LocationsModule/places';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import { C5_getRegionsAction } from '../../../redux/actions/LocationsModule/regions';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import MyLoadingPinner from '../../../components/Loading';

 const PlacesPage=(props:any)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetPlacesSuccess=(res:any)=>{
      // console.log(res)
       setMyLoading(true)
     }
    const _onGetPlacesError=(res:any)=>{
        //console.log(res)
    }
   
    
  
    useEffect(()=>{
        props.getPlacesAction(_onGetPlacesSuccess,_onGetPlacesError)
        props.getRegionsAction(_onGetPlacesSuccess,_onGetPlacesError)
    },[])

    return (
              <>
              {myloading?
                  CAN(UserAction.Read,EntityUSERMODAbilty.PLACES)? <PlacesViews props={props}/>:<NotAuthorizedPage/>
              :
              <MyLoadingPinner/>}
              </> 
            )
    
}



interface StateProps {
    places: any
}

const mapStateToProps = (state:StateProps) => {
    const { getplaces} = state.places;
    return { getplaces}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getPlacesAction: (onSuccess:any,onError:any)=> dispatch(C5_getPlacesAction(onSuccess,onError)),
        getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError)),
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlacesPage);


