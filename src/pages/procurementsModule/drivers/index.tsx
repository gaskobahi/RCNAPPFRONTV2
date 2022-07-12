import React, { useEffect } from 'react';
import DriversViews from '../../../views/procurementsModule/drivers';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getDriversAction } from '../../../redux/actions/ProcurementsModule/drivers';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import { C5_getSuppliersAction } from '../../../redux/actions/ProcurementsModule/suppliers';


interface PageDriverProps {
    getdrivers: any;
    getDriversAction:(res:any,res1:any)=>void;     
 
    
  }
  


 const DriversPage=(props:PageDriverProps)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetDriversSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetDriversError=(res:any)=>{
        console.log(res)
    }
   
  

    useEffect(()=>{
        props.getDriversAction(_onGetDriversSuccess,_onGetDriversError)
    },[])

    return (
            <>
            {myloading?
                CAN(UserAction.Read,EntityUSERMODAbilty.DRIVERS)? <DriversViews props={props}/>:<NotAuthorizedPage/>
            :
            <MyLoadingPinner/>}
            </> 
            )
    
}



interface StateProps {
    drivers: any,
    suppliers:any,
}

const mapStateToProps = (state:StateProps) => {
    const { getdrivers} = state.drivers;
    return { getdrivers}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getDriversAction: (onSuccess:any,onError:any)=> dispatch(C5_getDriversAction(onSuccess,onError)),      
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DriversPage);


