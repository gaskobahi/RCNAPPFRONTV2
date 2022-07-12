import React, { useEffect } from 'react';
import DepartmentsViews from '../../../views/usersModule/departments';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getDepartmentsAction } from '../../../redux/actions/UsersModule/departments';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';

 const DepartmentsPage=(props:any)=>{
    const dispatch= useDispatch();

    const _onGetDepartmentsSuccess=(res:any)=>{
       console.log(res)
     }
    const _onGetDepartmentsError=(res:any)=>{
        console.log(res)
    }
   
  
    useEffect(()=>{
        props.getDepartmentsAction(_onGetDepartmentsSuccess,_onGetDepartmentsError)
        
    },[])

    return (
             <>
                {CAN(UserAction.Read,EntityUSERMODAbilty.DEPARTMENTS)? (
                  <DepartmentsViews props={props}/>):"You are not authorized on this page"
                 }  
             </> 
            )
    
}



interface StateProps {
    departments: any
}

const mapStateToProps = (state:StateProps) => {
    const { getdepartments} = state.departments;
    return { getdepartments}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getDepartmentsAction: (onSuccess:any,onError:any)=> dispatch(C5_getDepartmentsAction(onSuccess,onError)),        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DepartmentsPage);


