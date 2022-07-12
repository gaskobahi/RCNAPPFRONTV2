import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { EntityUSERMODAbilty, UserAction } from '../../Ability/Actions';
import CAN from "../../Ability/can";

const SideBar=(props:any)=>{
  let {username}=props && props.getuserprofile;
    return(
        <>
          {/*<!-- Brand Logo -->*/}
          <a className="brand-link">
            <img src="adminlte/dist/img/AdminLTELogo.png" alt="RCNAPP Logo" className="brand-image img-circle elevation-3" />
            <span className="brand-text font-weight-light">RCN APP</span>
          </a>
      
          {/*<!-- Sidebar -->*/}
          <div className="sidebar">
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="true">
                
                <li className="nav-item ">
                  <Link to={"./"} className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="nav-item " >
                    {CAN(UserAction.Read,EntityUSERMODAbilty.MOD_PROCUREMENTS) && (
                      <a  className="nav-link ">
                        <i className="nav-icon fas fa-shopping-cart"></i>
                        <p>
                          PROCUREMENTS
                          <i className="right fas fa-angle-left"></i>
                        </p>
                      </a>
                    )}
                  <ul className="nav nav-treeview ">  
                      <hr/>              
                        <li className="nav-item">
                            {CAN(UserAction.Read,EntityUSERMODAbilty.PROCUREMENTS) && (
                              <Link  to={"./Procurements"} className="nav-link ">
                                <i className="far fa-circle nav-icon"></i>
                                  <p>
                                    Procurements
                                    <span className="badge badge-info right">{props.getprocurementsStats.total}</span>
                                  </p>
                              </Link>
                              )}
                        </li>
                        <li className="nav-item">
                          {CAN(UserAction.Read,EntityUSERMODAbilty.STACKS) && (
                            <Link  to={"./Stacks"} className="nav-link ">
                              <i className="far fa-circle nav-icon"></i>
                                <p>
                                  Stacks
                                  <span className="badge badge-info right">{props.getstacks && props.getstacks.length}</span>
                                </p>
                              </Link>
                          )}
                        </li>
                      <hr/>
                        <li className="nav-item">
                            {CAN(UserAction.Read,EntityUSERMODAbilty.FTRANSFERTS) && (
                              <Link  to={"./Ftransferts"} className="nav-link ">
                                <i className="far fa-circle nav-icon"></i>
                                  <p>
                                    File Transferts
                                    <span className="badge badge-info right">{props.getftransferts && props.getftransferts.length}</span>
                                  </p>
                              </Link>
                              )}
                        </li>
                        <li className="nav-item">
                            {CAN(UserAction.Read,EntityUSERMODAbilty.RCNCONTROLS) && (
                              <Link  to={"./Rcncontrols"} className="nav-link ">
                                <i className="far fa-circle nav-icon"></i>
                                  <p>
                                      RCN Controls
                                    <span className="badge badge-info right">{props.getrcncontrols && props.getrcncontrols.length}</span>
                                  </p>
                              </Link>
                              )}
                        </li>
                        <li className="nav-item">
                            {CAN(UserAction.Read,EntityUSERMODAbilty.YIELDINSPECTIONS) && (
                              <Link  to={"./Yieldinspections"} className="nav-link ">
                                <i className="far fa-circle nav-icon"></i>
                                  <p>
                                      Yield Inspections
                                    <span className="badge badge-info right">{props.getyieldinspections && props.getyieldinspections.length}</span>
                                  </p>
                              </Link>
                              )}
                        </li>
                        <li className="nav-item">
                            {CAN(UserAction.Read,EntityUSERMODAbilty.TDECHARGMENTS) && (
                              <Link  to={"./Tdechargments"} className="nav-link ">
                                <i className="far fa-circle nav-icon"></i>
                                  <p>
                                    Ticket Dechargments
                                    <span className="badge badge-info right">{props.gettdechargments && props.gettdechargments.length}</span>
                                  </p>
                              </Link>
                              )}
                        </li>
                      <hr/>
                    
                        <li className="nav-item">
                          {CAN(UserAction.Read,EntityUSERMODAbilty.SUPPLIERS) && (
                            <Link  to={"./Suppliers"} className="nav-link ">
                              <i className="far fa-circle nav-icon"></i>
                                <p>
                                  Suppliers
                                  <span className="badge badge-info right">{props.getsuppliersStats.total}</span>
                                </p>
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {CAN(UserAction.Read,EntityUSERMODAbilty.SUPMANAGERS) && (
                            <Link  to={"./Supmanagers"} className="nav-link ">
                              <i className="far fa-circle nav-icon"></i>
                                <p>
                                  Supplier Managers
                                  <span className="badge badge-info right">{/*props.getsuppliersStats.total*/}</span>
                                </p>
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {CAN(UserAction.Read,EntityUSERMODAbilty.CARRIERS) && (
                            <Link  to={"./Carriers"} className="nav-link ">
                              <i className="far fa-circle nav-icon"></i>
                                <p>
                                  Carriers
                                  <span className="badge badge-info right">{props.getcarriers && props.getcarriers.length}</span>
                                </p>
                            </Link>
                            )}
                        </li>
                        <li className="nav-item">
                          {CAN(UserAction.Read,EntityUSERMODAbilty.DRIVERS) && (
                            <Link  to={"./Drivers"} className="nav-link ">
                              <i className="far fa-circle nav-icon"></i>
                                <p>
                                  Drivers
                                  <span className="badge badge-info right">{props.getdrivers && props.getdrivers.length}</span>
                                </p>
                            </Link>
                            )}
                        </li>
                      <hr/>
                      <li className="nav-item">
                          {CAN(UserAction.Read,EntityUSERMODAbilty.VEHICLES) && (
                            <Link  to={"./Vehicles"} className="nav-link ">
                              <i className="far fa-circle nav-icon"></i>
                                <p>
                                  Vehicles
                                  <span className="badge badge-info right">{props.getvehicles && props.getvehicles.length}</span>
                                </p>
                            </Link>
                            )}
                        </li>
                        <li className="nav-item">
                          {CAN(UserAction.Read,EntityUSERMODAbilty.TRAILERS) && (
                            <Link  to={"./Trailers"} className="nav-link ">
                              <i className="far fa-circle nav-icon"></i>
                                <p>
                                  Trailers
                                  <span className="badge badge-info right">{props.gettrailers && props.gettrailers.length}</span>
                                </p>
                            </Link>
                            )}
                        </li>
                      <li className="nav-item">
                          {CAN(UserAction.Read,EntityUSERMODAbilty.VEHICLEBRANDS) && (
                            <Link  to={"./Vehiclebrands"} className="nav-link ">
                              <i className="far fa-circle nav-icon"></i>
                                <p>
                                  Vehicle Brands
                                  <span className="badge badge-info right">{props.getvehiclebrands && props.getvehiclebrands.length}</span>
                                </p>
                            </Link>
                            )}
                        </li>
                      
                        
                      <hr/>
                  </ul>
                </li>
                <li className="nav-item menu-close">
                    {CAN(UserAction.Read,EntityUSERMODAbilty.USERS) && (
                      <a  className="nav-link ">
                        <i className="nav-icon fas fa-users"></i>
                        <p>
                          USERS
                          <i className="right fas fa-angle-left"></i>
                        </p>
                      </a>
                    )}
                  <ul className="nav nav-treeview">
                  <li className="nav-item">
                    {CAN(UserAction.Read,EntityUSERMODAbilty.DEPARTMENTS) && (
                      <Link  to={"./Departments"} className="nav-link ">
                        <i className="far fa-circle nav-icon"></i>
                          <p>
                            Departments
                            <span className="badge badge-info right">{props.getdepartments && props.getdepartments.length}</span>
                          </p>
                        </Link>
                    )}
                    </li>
                    <li className="nav-item">
                      {CAN(UserAction.Read,EntityUSERMODAbilty.ROLES) && (
                        <Link  to={"./Roles"} className="nav-link ">
                          <i className="far fa-circle nav-icon"></i>
                            <p>
                              Roles
                              <span className="badge badge-info right">{props.getroles && props.getroles.length}</span>
                            </p>
                        </Link>
                      )}
                    </li>
                    <li className="nav-item">
                      {CAN(UserAction.Read,EntityUSERMODAbilty.USERS) && (
                        <Link  to={"./Users"} className="nav-link ">
                          <i className="far fa-circle nav-icon"></i>
                            <p>
                              Users
                              <span className="badge badge-info right">{props.getusers && props.getusers.length}</span>
                            </p>
                        </Link>
                        )}
                    </li>
                    <li className="nav-item">
                      {CAN(UserAction.Read,EntityUSERMODAbilty.OPERATORS) && (
                        <Link  to={"./Operators"} className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>
                            Operators
                          <span className="badge badge-info right">{props.getoperators && props.getoperators.length}</span>
                          </p>
                        </Link>
                      )}
                    </li>
                  </ul>
                </li>
                <li className="nav-item menu-close">
                    {CAN(UserAction.Read,EntityUSERMODAbilty.MOD_LOCATIONS) && (
                      <a  className="nav-link ">
                        <i className="nav-icon fa fa-map-marker" aria-hidden="false"></i>
                        <p>
                          LOCATIONS
                          <i className="right fas fa-angle-left"></i>
                        </p>
                      </a>
                    )}
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      {CAN(UserAction.Read,EntityUSERMODAbilty.PLACES) && (
                        <Link  to={"./Places"} className="nav-link ">
                          <i className="far fa-circle nav-icon"></i>
                            <p>
                              Places
                              <span className="badge badge-info right">{props.getplaces && props.getplaces.length}</span>
                            </p>
                        </Link>
                      )}
                    </li>
                    <li className="nav-item">
                    {CAN(UserAction.Read,EntityUSERMODAbilty.REGIONS) && (
                      <Link  to={"./Regions"} className="nav-link ">
                        <i className="far fa-circle nav-icon"></i>
                          <p>
                            Regions
                            <span className="badge badge-info right">{props.getregions && props.getregions.length}</span>
                          </p>
                        </Link>
                    )}
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/*<!-- /.sidebar-menu -->*/}
          </div>
          {/*<!-- /.sidebar -->*/}
        </>
    );
}

const mapStateToProps = (state:any) => {
  const { getuserprofile } = state.auth;
  const { getusers } = state.users;
  const { getroles } = state.roles;
  const { getoperators } = state.operators;
  const { getdepartments } = state.departments;


  const { getregions } = state.regions;
  const { getplaces } = state.places;

  const { getstacks } = state.stacks;
  const { getsuppliers,getsuppliersStats } = state.suppliers;
  const { getftransferts } = state.ftransferts;
  const { gettdechargments } = state.tdechargments;
  const { getrcncontrols } = state.rcncontrols;
  const { getyieldinspections } = state.yieldinspections;
  const { getprocurements,getprocurementsStats } = state.procurements;

  const { getvehiclebrands } = state.vehiclebrands;
  const { getvehicles } = state.vehicles;
  const { getcarriers } = state.carriers;
  const { getdrivers } = state.drivers;
  const { gettrailers } = state.trailers;

  
  


  return { getuserprofile,getusers ,getroles,
          getoperators,getdepartments,getregions,
          getplaces,getstacks,getsuppliers,
          getftransferts,gettdechargments,getrcncontrols,
          getyieldinspections,getprocurements,
          getvehiclebrands,getvehicles,
          getcarriers, getdrivers,gettrailers,

          getprocurementsStats,getsuppliersStats

  }
};

export default connect(mapStateToProps)(SideBar);
