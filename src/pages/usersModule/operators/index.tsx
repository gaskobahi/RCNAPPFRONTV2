import React, { useEffect } from 'react';
import OperatorsViews from '../../../views/usersModule/operators';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getOperatorsAction } from '../../../redux/actions/UsersModule/operators';
import { C5_getRolesAction } from '../../../redux/actions/UsersModule/roles';
import { C5_getDepartmentsAction } from '../../../redux/actions/UsersModule/departments';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';

 const OperatorsPage=(props:any)=>{
    const dispatch= useDispatch();

    const _onGetOperatorsSuccess=(res:any)=>{
       console.log(res)
     }
    const _onGetOperatorsError=(res:any)=>{
        console.log(res)
    }
   
    const _onGetDepartmentsOperatorsSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetDepartmentsError=(res:any)=>{
         console.log(res)
     }

    useEffect(()=>{
        props.getOperatorsAction(_onGetOperatorsSuccess,_onGetOperatorsError)
        props.getDepartmentsAction(_onGetDepartmentsOperatorsSuccess,_onGetDepartmentsError)
        
    },[])

    return (
             <>
             {CAN(UserAction.Read,EntityUSERMODAbilty.OPERATORS)? (
                <OperatorsViews props={props}/>):"You are not authorized on this page"
                 }  
             </>    
            )
    
}



interface StateProps {
    operators: any
}

const mapStateToProps = (state:StateProps) => {
    const { getoperators} = state.operators;
    return { getoperators}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getOperatorsAction: (onSuccess:any,onError:any)=> dispatch(C5_getOperatorsAction(onSuccess,onError)),
        getRolesAction: (onSuccess:any,onError:any)=> dispatch(C5_getRolesAction(onSuccess,onError)),
        getDepartmentsAction: (onSuccess:any,onError:any)=> dispatch(C5_getDepartmentsAction(onSuccess,onError))
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OperatorsPage);


