import * as React from 'react'
const Footer=(props:any)=>{
    return(
        <footer className="main-footer" >
            <strong>Copyright &copy; 2022 <a href="#">RCNApp </a>.</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 1.0.0
            </div>
        </footer>
    );
}
export default Footer;