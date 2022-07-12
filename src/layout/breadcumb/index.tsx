import * as React from 'react'
import { withRouter } from '../../Helpers/wrapperRouter';
import { redefineTitle } from '../../Helpers/custom/customPageTilte';


import {
    Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography
  } from "@material-ui/core";


const BreadCumb=(props:any)=>{
    const {navigate,location:{pathname}}=props;
    const pathnames=pathname.split("/").filter((x:any)=>x);

    return(
        <div className="row mb-2">
            <div className="col-sm-6">
            <h4 className="m-0">{redefineTitle(pathname.substr(1))}</h4>
            </div>
            {/*<!-- /.col -->*/}
            <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <MUIBreadcrumbs aria-label="breadcrumb">
            {pathnames.length > 0 ? (
                    <Link onClick={() => navigate("/Dashboard")}>Dashboard</Link>
                ) :
                 (
                    <Typography> Dashboard </Typography>
                )
            }
                {pathnames.map((name:any, index:any) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join(">")}`;
                    const isLast = index === pathnames.length - 1;
                    console.log(routeTo)

                    return isLast ? (
                        name=="Dashboard"?"":
                    <Typography key={name}>{name}</Typography>
                    ) : (
                    <Link onClick={() => navigate(routeTo)}>
                        {name}
                    </Link>
                    );
                })}
                </MUIBreadcrumbs>
            </ol>
            </div>
            {/*<!-- /.col -->*/} 
            
        </div>
    );
}
export default withRouter(BreadCumb);


{/*

() => history.push("/Dashboard")
  //const routeTo = '/${pathnames.slice(0,index+1).join("/")}';
 <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
            </div>
*/}