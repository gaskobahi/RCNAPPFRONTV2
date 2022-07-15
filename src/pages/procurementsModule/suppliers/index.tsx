import React, { useEffect } from 'react';
import SuppliersViews from '../../../views/procurementsModule/suppliers';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getSuppliersAction } from '../../../redux/actions/ProcurementsModule/suppliers';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import { C5_getPlacesAction } from '../../../redux/actions/LocationsModule/places';
import { C5_getRegionsAction } from '../../../redux/actions/LocationsModule/regions';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';


interface PageSupplierProps {
    getplaces: any;
    getSuppliersAction:(res:any,res1:any)=>void;     
    getPlacesAction:(res:any,res1:any)=>void;      
 
    
  }
  


 const SuppliersPage=(props:any)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetSuppliersSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetSuppliersError=(res:any)=>{
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
        props.getSuppliersAction(_onGetSuppliersSuccess,_onGetSuppliersError)
        props.getPlacesAction(_onGetPlacesSuccess,_onGetPlacesError)
        props.getRegionsAction(_onGetRegionsSuccess,_onGetRegionsError)
        
           
        
    },[])

    return (
            <>
            {myloading?
                CAN(UserAction.Read,EntityUSERMODAbilty.SUPPLIERS)? <SuppliersViews props={props}/>:<NotAuthorizedPage/>
            :
            <MyLoadingPinner/>}
            </> 
            )
    
}



interface StateProps {
    suppliers: any,
    regions:any,
    places:any
}

const mapStateToProps = (state:StateProps) => {
    const { getsuppliers} = state.suppliers;
    const { getregions} = state.regions;
    const { getplaces} = state.places;
    return { getsuppliers,getregions,getplaces}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getSuppliersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSuppliersAction(onSuccess,onError)),  
        getPlacesAction: (onSuccess:any,onError:any)=> dispatch(C5_getPlacesAction(onSuccess,onError)),
        getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError)),

  
    
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SuppliersPage);


