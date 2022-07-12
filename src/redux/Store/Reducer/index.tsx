import {combineReducers } from "redux";
import AuthReducer from "./Auth/AuthReducer";

import RolesReducer from "./UsersModule/Roles";
import DepartmentsReducer from "./UsersModule/Departments";
import UsersReducer from "./UsersModule/Users";
import OperatorsReducer from "./UsersModule/Operators";

import RegionsReducer from "./LocationsModule/Regions";
import PlacesReducer from "./LocationsModule/Places";

import StacksReducer from "./ProcurementsModule/Stacks";
import SuppliersReducer from "./ProcurementsModule/Suppliers";
import FtransfertsReducer from "./ProcurementsModule/Ftransferts";
import TdechargmentsReducer from "./ProcurementsModule/Tdechargments";
import RcncontrolsReducer from "./ProcurementsModule/Rcncontrols";
import YieldinspectionsReducer from "./ProcurementsModule/Yieldinspections";
import ProcurementsReducer from "./ProcurementsModule/Procurements";
import SupmanagersReducer from "./ProcurementsModule/Supmanagers";
import VehiclebrandsReducer from "./ProcurementsModule/Vehiclebrands";
import VehiclesReducer from "./ProcurementsModule/Vehicles";
import CarriersReducer from "./ProcurementsModule/Carriers";
import DriversReducer from "./ProcurementsModule/Drivers";
import TrailersReducer from "./ProcurementsModule/Trailers";




 export   default  combineReducers({
    auth:AuthReducer,

    users:UsersReducer,
    operators:OperatorsReducer,
    roles:RolesReducer,
    departments:DepartmentsReducer,

    regions:RegionsReducer,
    places:PlacesReducer,

    stacks:StacksReducer,
    suppliers:SuppliersReducer,
    ftransferts:FtransfertsReducer,
    tdechargments:TdechargmentsReducer,
    rcncontrols:RcncontrolsReducer,
    yieldinspections:YieldinspectionsReducer,
    procurements:ProcurementsReducer,
    supmanagers:SupmanagersReducer,
    vehiclebrands:VehiclebrandsReducer,
    vehicles:VehiclesReducer,
    carriers:CarriersReducer,
    drivers:DriversReducer,
    trailers:TrailersReducer,
}) 
