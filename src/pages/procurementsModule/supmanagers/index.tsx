import React, { useEffect } from 'react';
import SupmanagersViews from '../../../views/procurementsModule/supmanagers';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getSupmanagersAction } from '../../../redux/actions/ProcurementsModule/supmanagers';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';
import MyLoadingPinner from '../../../components/Loading';
import { NotAuthorizedPage } from '../../../Helpers/custom';
import { C5_getSuppliersAction } from '../../../redux/actions/ProcurementsModule/suppliers';


interface PageSupmanagerProps {
    getsuppliers: any;
    getsupmanagers:any;
    getSupmanagersAction:(res:any,res1:any)=>void;     
    getSuppliersAction:(res:any,res1:any)=>void;      
 
    
  }
  


 const SupmanagersPage=(props:PageSupmanagerProps)=>{
    const dispatch= useDispatch();
    const [myloading, setMyLoading] = React.useState(false);

    const _onGetSupmanagersSuccess=(res:any)=>{
       console.log(res)
       setMyLoading(true)
     }
    const _onGetSupmanagersError=(res:any)=>{
        console.log(res)
    }
   
    const _onGetSuppliersSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetSuppliersError=(res:any)=>{
         console.log(res)
     }

    useEffect(()=>{
        props.getSupmanagersAction(_onGetSupmanagersSuccess,_onGetSupmanagersError)
        
         props.getSuppliersAction(_onGetSuppliersSuccess,_onGetSuppliersError)
           
        
        
    },[])

    return (
            <>
            {myloading?
              CAN(UserAction.Read,EntityUSERMODAbilty.SUPMANAGERS)? <SupmanagersViews props={props}/>:<NotAuthorizedPage/>
            :
            <MyLoadingPinner/>}
            </> 
            )
    
}



interface StateProps {
    supmanagers: any,
    suppliers:any,
}

const mapStateToProps = (state:StateProps) => {
    const { getsupmanagers} = state.supmanagers;
  const {getsuppliers } = state.suppliers;
    return { getsupmanagers,getsuppliers}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getSupmanagersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSupmanagersAction(onSuccess,onError)),  
        getSuppliersAction: (onSuccess:any,onError:any)=> dispatch(C5_getSuppliersAction(onSuccess,onError)),

  
    
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SupmanagersPage);


