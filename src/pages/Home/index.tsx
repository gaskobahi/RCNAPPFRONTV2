import React, { useEffect, useState } from 'react';
import {C5_getStatsProcurementsAction } from '../../redux/actions/ProcurementsModule/procurements';
import HomeViews from '../../views/home';
import { connect, useDispatch } from 'react-redux';
import { C5_getStatsSuppliersAction } from '../../redux/actions/ProcurementsModule/suppliers';

 const Home=(props:any)=>{
    const [isMount,setIsmount]=useState(false)
   


    return(
        <>
          <HomeViews />
        </>
    )
}

interface StateProps {
  procurements: any,
}


const mapStateToProps = (state:StateProps) => {
  return {}
};

const mapDispatchToProps = (dispatch:any)=>{
  return {
    getStatsProcurementsAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatsProcurementsAction(onSuccess,onError)),
    getStatsSuppliersAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatsSuppliersAction(onSuccess,onError)),  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

       
