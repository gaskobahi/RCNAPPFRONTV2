import React, { useEffect } from 'react';
import CarriersViews from '../../../views/procurementsModule/carriers';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getCarriersAction } from '../../../redux/actions/ProcurementsModule/carriers';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import { C5_getSuppliersAction } from '../../../redux/actions/ProcurementsModule/suppliers';


interface PageCarrierProps {
    getcarriers: any;
    getCarriersAction:(res:any,res1:any)=>void;     
 
    
  }
  


 const CarriersPage=(props:PageCarrierProps)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetCarriersSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetCarriersError=(res:any)=>{
        console.log(res)
    }
   
  

    useEffect(()=>{
        props.getCarriersAction(_onGetCarriersSuccess,_onGetCarriersError)
    },[])

    return (
            <>
            {myloading?
                CAN(UserAction.Read,EntityUSERMODAbilty.CARRIERS)? <CarriersViews props={props}/>:<NotAuthorizedPage/>
            :
            <MyLoadingPinner/>}
            </> 
            )
    
}



interface StateProps {
    carriers: any,
}

const mapStateToProps = (state:StateProps) => {
    const { getcarriers} = state.carriers;
    return { getcarriers}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getCarriersAction: (onSuccess:any,onError:any)=> dispatch(C5_getCarriersAction(onSuccess,onError)),      
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CarriersPage);


