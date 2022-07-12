import React, { useEffect } from 'react';
import StacksViews from '../../../views/procurementsModule/stacks';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getStacksAction } from '../../../redux/actions/ProcurementsModule/stacks';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import { C5_getPlacesAction } from '../../../redux/actions/LocationsModule/places';
import { C5_getRegionsAction } from '../../../redux/actions/LocationsModule/regions';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';

 const StacksPage=(props:any)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetStacksSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetStacksError=(res:any)=>{
        console.log(res)
    }
   
    const _onGetPlacesSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetPlacesError=(res:any)=>{
         console.log(res)
     }
    
    const _onGetRegionsSuccess=(res:any)=>{
    console.log(res)
    }
    const _onGetRegionsError=(res:any)=>{
        console.log(res)
    }
  
    useEffect(()=>{
        props.getStacksAction(_onGetStacksSuccess,_onGetStacksError)
        if(!props.getplaces){
            props.getPlacesAction(_onGetPlacesSuccess,_onGetPlacesError)
           }    

        if(!props.getregions){
        props.getRegionsAction(_onGetRegionsSuccess,_onGetRegionsError)
        }    
    },[])

    return (
                <>
                    {myloading?
                        CAN(UserAction.Read,EntityUSERMODAbilty.STACKS)? <StacksViews props={props}/>:<NotAuthorizedPage/>
                    :
                    <MyLoadingPinner/>}
                </> 
            )
    
}



interface StateProps {
    stacks: any,
    places:any,
    regions:any
}

const mapStateToProps = (state:StateProps) => {
    const { getstacks} = state.stacks;
    const { getplaces} = state.places;
    const { getregions} = state.regions;
    return { getstacks,getplaces,getregions}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getStacksAction: (onSuccess:any,onError:any)=> dispatch(C5_getStacksAction(onSuccess,onError)),
        getPlacesAction: (onSuccess:any,onError:any)=> dispatch(C5_getPlacesAction(onSuccess,onError)),
        getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError)),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StacksPage);


