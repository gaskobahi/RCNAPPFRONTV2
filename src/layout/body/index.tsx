import { useEffect } from "react";
import { Outlet} from "react-router-dom";
import { reloadPage } from "../../Helpers/helpMenuTree";
const AppBody=(props:any)=>{
    return(
            <Outlet/>
        )
}

export default AppBody;