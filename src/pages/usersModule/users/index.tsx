import React, { useEffect } from 'react';
import UsersViews from '../../../views/usersModule/users';
import { connect, useDispatch } from 'react-redux';
import CAN from "../../../Ability/can";
import { C5_getUsersAction } from '../../../redux/actions/UsersModule/users';
import { C5_getRolesAction } from '../../../redux/actions/UsersModule/roles';
import { C5_getDepartmentsAction } from '../../../redux/actions/UsersModule/departments';
import { EntityUSERMODAbilty, UserAction } from '../../../Ability/Actions';

 const UsersPage=(props:any)=>{
    const dispatch= useDispatch();

    const _onGetUsersSuccess=(res:any)=>{
       console.log(res)
     }
    const _onGetUsersError=(res:any)=>{
        console.log(res)
    }
    const _onGetRolesUsersSuccess=(res:any)=>{
       console.log(res)
     }
    const _onGetRolesError=(res:any)=>{
        console.log(res)
    }

    const _onGetDepartmentsUsersSuccess=(res:any)=>{
        console.log(res)
      }
     const _onGetDepartmentsError=(res:any)=>{
         console.log(res)
     }

    useEffect(()=>{
        props.getUsersAction(_onGetUsersSuccess,_onGetUsersError)
        props.getRolesAction(_onGetRolesUsersSuccess,_onGetRolesError)
        props.getDepartmentsAction(_onGetDepartmentsUsersSuccess,_onGetDepartmentsError)
        
    },[])

    return (
            <>
                {CAN(UserAction.Read,EntityUSERMODAbilty.USERS)? (
                <UsersViews props={props}/>
                 ):"You are not authorized on this page"
                 }
             </>
    )
    
}



interface StateProps {
    users: any
}

const mapStateToProps = (state:StateProps) => {
    const { getusers } = state.users;
    return { getusers}
};

const mapDispatchToProps = (dispatch:any)=>{
    return {
        getUsersAction: (onSuccess:any,onError:any)=> dispatch(C5_getUsersAction(onSuccess,onError)),
        getRolesAction: (onSuccess:any,onError:any)=> dispatch(C5_getRolesAction(onSuccess,onError)),
        getDepartmentsAction: (onSuccess:any,onError:any)=> dispatch(C5_getDepartmentsAction(onSuccess,onError))
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersPage);


