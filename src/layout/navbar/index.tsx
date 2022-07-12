import * as React from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { GLOBALTOKEN } from '../../services/HttpService';

const Navbar=(props:any)=>{
  let {username,role}=props && props.getuserprofile;
  let navigate=useNavigate();

  const _logout=()=>{
    localStorage.removeItem(GLOBALTOKEN);
    setTimeout(() => {
      navigate("/login", { replace: true })  
    },500);
  }
  
    return(
        <>
          {/*<!-- Left navbar links -->*/}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
            </li>
          </ul>
      
          {/*<!-- Right navbar links -->*/}
          <ul className="navbar-nav ml-auto">
          
            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                <i className="fas fa-expand-arrows-alt"></i>
              </a>
            </li>
            {/*<li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                <i className="fas fa-th-large"></i>
              </a>
            </li>*/}
              {/* user profile */}
              <li className="nav-item dropdown user-menu">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                  <img src="adminlte/dist/img/useravatar.png" className="user-image img-circle elevation-2" alt="User Image"/>
                  <span className="d-none d-md-inline">{username && username}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <li className="user-header bg-primary">
                  <img src="adminlte/dist/img/useravatar.png" className="img-circle elevation-2" alt="User Image"/>
                  <p>
                  {username && username} - {role && role.name}
                    {/*<small>Member since Nov. 2012</small>*/}
                  </p>
                </li>
                {/*
                <li className="user-body">
                  <div className="row">
                    <div className="col-4 text-center">
                    <a href="#">Followers</a>
                    </div>
                    <div className="col-4 text-center">
                    <a href="#">Sales</a>
                    </div>
                    <div className="col-4 text-center">
                    <a href="#">Friends</a>
                    </div>
                    </div>
                </li>
                */}

                <li className="user-footer">
              <Link  to={"./Profile"} className="btn btn-default btn-flat">Profile</Link>
              <a onClick={_logout} className="btn btn-default btn-flat float-right">SignOut</a>
              </li>
                </ul>
            </li>
          </ul>
        </>
    );
}
const mapStateToProps = (state:any) => {
  const { getuserprofile } = state.auth;
  return { getuserprofile }
};

/*
const mapDispatchToProps = (dispatch:any)=>{
  return {
    LogoutAction: () => dispatch(C5_LogoutAction()),
  }
}*/

export default connect(mapStateToProps)(Navbar);