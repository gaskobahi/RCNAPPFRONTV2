import * as React from 'react';
import AppBody from './body';
import BreadCumb from './breadcumb';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer'
import { connect } from 'react-redux';

import { C5_UserProfileAction } from '../redux/actions/Auth/AuthActions';
import { SETREFRESPROFILE } from '../Helpers/custom/myparameters';
import { loadTree } from '../Helpers/helpMenuTree';
import { C5_getStatfindLast6MonthAllProcurementsAction, C5_getStatfindLast7AllProcurementsAction, C5_getStatsProcurementsAction } from '../redux/actions/ProcurementsModule/procurements';
import { C5_getStatsSuppliersAction } from '../redux/actions/ProcurementsModule/suppliers';
import { clearTimeout } from 'timers';

interface actions {
  userProfileAction: (onSuccess:any,onError:any)  => Promise<void>;
  getStatsProcurementsAction: (onSuccess:any,onError:any)  => Promise<void>;
  getStatsSuppliersAction: (onSuccess:any,onError:any)  => Promise<void>;
  getStatfindLast7AllProcurementsAction: (onSuccess:any,onError:any)  => Promise<void>;
  getStatfindLast6MonthAllProcurementsAction: (onSuccess:any,onError:any)  => Promise<void>;

  
  
  

  getuserprofile:any;
  getprocurementsStats:any;
  getsuppliersStats:any;
  getprocurmentStatfindLast7All:any;
  getprcmtStatSumRecNtWt6Month:any;

}
  
interface IState {
  progress: boolean;
  isMount:boolean;
}

class Layout extends React.Component<actions,IState> {
    //isMount: boolean;
   
    constructor(props:any) {
      super(props);
      //this.isMount=false;
      this.state={
        progress:true,
        isMount:false,
      }
    }


   _onGetProfileSuccess=(res:any)=>{
    this.setState({progress:false})
    this.setState({isMount:true})

   }
    _onGetProfileError=(res:any)=>{
      this.setState({progress:false})
    }

    _onGetSuccess=(res:any)=>{
      console.log(res)
    }
    _onGetError=(res:any)=>{
        console.log(res)
    }

    _onGetStatsPSuccess=(res:any)=>{
     
    }
    _onGetStatsPError=(res:any)=>{
    }
  
    
    componentDidMount=()=>{
      //reloadPage();
      if(!this.props.getsuppliersStats){
        this.props.getStatsSuppliersAction(this._onGetSuccess,this._onGetError)
      }

      if(!this.props.getprocurementsStats){
        this.props.getStatsProcurementsAction(this._onGetStatsPSuccess,this._onGetStatsPError)
      }
      if(!this.props.getprocurmentStatfindLast7All){
        this.props.getStatfindLast7AllProcurementsAction(this._onGetSuccess,this._onGetError)
      }
      if(!this.props.getprcmtStatSumRecNtWt6Month){
        this.props.getStatfindLast6MonthAllProcurementsAction(this._onGetSuccess,this._onGetError)
      }
      
      
      if(!this.props.getuserprofile){
        this.props.userProfileAction(this._onGetProfileSuccess,this._onGetProfileError);
      }

      //refresh user profile
      setInterval(() => {
        this.props.userProfileAction(this._onGetProfileSuccess,this._onGetProfileError);
      },SETREFRESPROFILE);

    }
   

  render(){
   
          return (
              <div className="wrapper">
                  <nav className="main-header navbar navbar-expand navbar-light">

                  <Navbar/> 
                  </nav>
                  <aside className="main-sidebar sidebar-dark-primary elevation-4">
                      <Sidebar/>
                  </aside>

                  <div className="content-wrapper">
                    <div className="content-header">
                      <div className="container-fluid">
                        <BreadCumb props={this.props}/>
                      </div>  
                    </div> 
                    <section className="content">
                      <div className="container-fluid">
                      <AppBody/> 
                      </div>         
                    </section>
                  </div>
                 
                  <aside className="control-sidebar control-sidebar-dark">
                  {/* <!-- Control sidebar content goes here -->*/}
                  </aside>
                   <Footer/>
              </div>
             )
   }
  
};


interface StateProps {
  auth: any,
  procurements:any,
  suppliers:any,
}

const mapStateToProps = (state:StateProps) => {
  //console.log(state)
  const { getuserprofile } = state.auth;
  const {getprocurementsStats,getprocurmentStatfindLast7All,getprcmtStatSumRecNtWt6Month} = state.procurements;
  const {getsuppliersStats}=state.suppliers;

  return { 
    getuserprofile,getprocurementsStats,
    getsuppliersStats,getprocurmentStatfindLast7All,
    getprcmtStatSumRecNtWt6Month
  }
};

const mapDispatchToProps = (dispatch:any)=>{
  return {
    userProfileAction: (onSuccess:any,onError:any) => dispatch(C5_UserProfileAction(onSuccess,onError)),
    getStatsProcurementsAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatsProcurementsAction(onSuccess,onError)),
    getStatfindLast7AllProcurementsAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatfindLast7AllProcurementsAction(onSuccess,onError)),  
    getStatfindLast6MonthAllProcurementsAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatfindLast6MonthAllProcurementsAction(onSuccess,onError)),    
  
    getStatsSuppliersAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatsSuppliersAction(onSuccess,onError)),
    

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);






