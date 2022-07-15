import React, { useEffect } from 'react';





import {Routes,Route, Navigate} from "react-router-dom";
import Layout from './layout';
import LoginPage from './pages/auth';
import ProfilePage from './pages/auth/profile';
import Home from './pages/Home';
import UsersPage from './pages/usersModule/users';
import OperatorsPage from './pages/usersModule/operators';
import RolesPage from './pages/usersModule/roles';
import DepartmentsPage from './pages/usersModule/departments';

import RegionsPage from './pages/locationsModule/regions';
import PlacesPage from './pages/locationsModule/places';

import SuppliersPage from './pages/procurementsModule/suppliers';
import SupmanagersPage from './pages/procurementsModule/supmanagers';
import VehiclebrandsPage from './pages/procurementsModule/vehiclebrands';
import VehiclesPage from './pages/procurementsModule/vehicles';
import CarriersPage from './pages/procurementsModule/carriers';
import DriversPage from './pages/procurementsModule/drivers';
import TrailersPage from './pages/procurementsModule/trailers';





import StacksPage from './pages/procurementsModule/stacks';
import FtransfertsPage from './pages/procurementsModule/ftransferts';
import TdechargmentsPage from './pages/procurementsModule/tdechargments';
import RcncontrolsPage from './pages/procurementsModule/rcncontrols';
import YieldinspectionsPage from './pages/procurementsModule/yieldinspections';
import ProcurementsPage from './pages/procurementsModule/procurements';

import { loadTree } from './Helpers/helpMenuTree';




import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';


const MainRoutes=(props:any)=>{


    return (
        <Routes>
            <Route path="/" element={<ProtectedRoutes/>}>          
                <Route path="/" element={<Layout/>}>   
                    <Route path="/" element={<Navigate replace to="/Dashboard"/>}/>     
                    <Route path="/Dashboard" element={<Home/>} />
                    <Route path="/Users" element={<UsersPage/>}>   
                    </Route>
                    <Route path="Profile" element={<ProfilePage/>}/>
                    <Route path="/Operators" element={<OperatorsPage/>}/>
                    <Route path="/Departments" element={<DepartmentsPage/>}/>
                    <Route path="/Roles" element={<RolesPage/>}/>

                    <Route path="/Regions" element={<RegionsPage/>}/>
                    <Route path="/Places" element={<PlacesPage/>}/>

                    <Route path="/Suppliers" element={<SuppliersPage/>}/>
                    <Route path="/Supmanagers" element={<SupmanagersPage/>}/>
                    <Route path="/Vehiclebrands" element={<VehiclebrandsPage/>}/>
                    <Route path="/Vehicles" element={<VehiclesPage/>}/>
                    <Route path="/Carriers" element={<CarriersPage/>}/>
                    <Route path="/Drivers" element={<DriversPage/>}/>
                    <Route path="/Trailers" element={<TrailersPage/>}/>


                    <Route path="/Stacks" element={<StacksPage/>}/>
                    <Route path="/Ftransferts" element={<FtransfertsPage/>}/>
                    <Route path="/Tdechargments" element={<TdechargmentsPage/>}/>
                    <Route path="/Rcncontrols" element={<RcncontrolsPage/>}/>
                    <Route path="/Yieldinspections" element={<YieldinspectionsPage/>}/>
                    <Route path="/Procurements" element={<ProcurementsPage/>}/>


                    
                </Route>
            </Route>  
            <Route path="login" element={<PublicRoutes/>}>
                   <Route path="/login" element={<LoginPage/>}/>
            </Route>
            
            <Route path="*" element={<Navigate to={"/login"}/>} />  

        </Routes>

        
     )

}
export default MainRoutes;
