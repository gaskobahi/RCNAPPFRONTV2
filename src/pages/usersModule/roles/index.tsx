import React, { useEffect } from 'react';
import RolesViews from '../../../views/usersModule/roles';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getRolesAction } from '../../../redux/actions/UsersModule/roles';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';

 const RolesPage=(props:any)=>{
    const dispatch= useDispatch();

    const _onGetRolesSuccess=(res:any)=>{
       console.log(res)
     }
    const _onGetRolesError=(res:any)=>{
        console.log(res)
    }
   
  
    useEffect(()=>{
        props.getRolesAction(_onGetRolesSuccess,_onGetRolesError)
        
    },[])

    return (
             <>
             {CAN(UserAction.Read,EntityUSERMODAbilty.ROLES)? (
                <RolesViews props={props}/>):"You are not authorized on this page"
              }
            </>
            )
    
}



interface StateProps {
    roles: any
}

const mapStateToProps = (state:StateProps) => {
    const { getroles} = state.roles;
    return { getroles}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getRolesAction: (onSuccess:any,onError:any)=> dispatch(C5_getRolesAction(onSuccess,onError)),        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RolesPage);


