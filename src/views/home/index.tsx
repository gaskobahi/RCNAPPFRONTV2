import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MyWidgetV2 from '../../components/widget/MyWidgetV2';
import MyWidget from '../../components/widget/MyWidget';
import MyProcurementStatList from '../../components/mystatTable/myProcurementStatList';
import MyChart from '../../components/chart/MyChart';


import LineWeightIcon from '@mui/icons-material/LineWeight';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import moment from 'moment';

import './home.scss'
import { C5_getStatfindLast6MonthAllProcurementsAction, C5_getStatfindLast7AllProcurementsAction, C5_getStatsProcurementsAction } from '../../redux/actions/ProcurementsModule/procurements';
import { C5_getStatsSuppliersAction } from '../../redux/actions/ProcurementsModule/suppliers';
import { HOMEPAGESETINTERVALREFRESHDATAVALUE, SETINTERVALREFRESHDATAVALUE } from '../../Helpers/custom/myparameters';

interface EnhancedDataProps {
  getprocurementsStats: any;
  getprocurmentStatfindLast7All:any;
  getprcmtStatSumRecNtWt6Month:any
  getsuppliersStats:any;

  getStatsProcurementsAction:any;
  getStatfindLast7AllProcurementsAction:any;
  getStatsSuppliersAction:any;
  getStatfindLast6MonthAllProcurementsAction:any
  }



const  HomeView =(props:EnhancedDataProps)=>{
    let {getprocurementsStats,getprocurmentStatfindLast7All,getprcmtStatSumRecNtWt6Month,getsuppliersStats,}=props;
    const styles = {
      largeIcon: {
        width: 40,
        height: 40,
      },
    }
    let StatisticsIcon:any={
          PrmtCUMNetWTicon: (
            <LineWeightIcon
              className="icon"
              style={{
                height: styles.largeIcon.height,
                 width: styles.largeIcon.width,
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
          PrmtStdBagsicon: (
            <ShoppingBagIcon
              className="icon"
              style={{
                height: styles.largeIcon.height,
                 width: styles.largeIcon.width,
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
    }
 
 const onSuccess=(res:any)=>{console.log(res);}
 const onError=(res:any)=>{console.log(res); }
 
   
 useEffect(() => {
  const updateInfo = setInterval(() => {
    props.getStatsProcurementsAction(onSuccess,onError)
    props.getStatfindLast7AllProcurementsAction(onSuccess,onError)
    props.getStatfindLast6MonthAllProcurementsAction(onSuccess,onError)
    props.getStatsSuppliersAction(onSuccess,onError)
    }, HOMEPAGESETINTERVALREFRESHDATAVALUE);
   return () => clearInterval(updateInfo);

 }, []);

   let titlee= "Last 12 Months (Procurements) "+moment().format("YYYY")+'- Weight(Kgs)'
   let total:number

    return (
          <>
            <div className="row">
                <div className="col-lg-3 col-md-5"> <MyWidget type="Procurements" value={getprocurementsStats.total?getprocurementsStats.total:0}/></div>
                <div className="col-lg-2 col-md-3"> <MyWidgetV2 type="Standard bags" myIcon={StatisticsIcon.PrmtStdBagsicon} value={getprocurementsStats.stdBags? getprocurementsStats.stdBags.toFixed(1):0}/></div>
                <div className="col-lg-2 col-md-4"> <MyWidgetV2 type="CUMUL NET WEIGHT" myIcon={StatisticsIcon.PrmtCUMNetWTicon} isSymbol="Kgs" value={getprocurementsStats.Trecnetwt? getprocurementsStats.Trecnetwt.toFixed(2):0}/></div>
                <div className="col-lg-2 col-md-6"> <MyWidgetV2 type="outturn" isSymbol="Lbs" value={getprocurementsStats.avgTotaloutturn? getprocurementsStats.avgTotaloutturn.toFixed(1):0}/></div>
                <div className="col-lg-3 col-md-6"> <MyWidget type="Suppliers" value={getsuppliersStats.total?getsuppliersStats.total:0}/></div>
            </div>
             <div className="row">
                   <div className="col-md-8">
                    <MyProcurementStatList rows={getprocurmentStatfindLast7All && getprocurmentStatfindLast7All}/>  
                    </div>
                    <div className="col-md-4">
                       <MyChart title={titlee} data={getprcmtStatSumRecNtWt6Month && getprcmtStatSumRecNtWt6Month} aspect={2 / 1} />
                    </div>
                   
                   
                    
             </div>
            </>
        )
    
        
}


    interface StateProps {
        procurements:{
          getprocurementsStats:any,
          getprocurmentStatfindLast7All:any,
          getprcmtStatSumRecNtWt6Month:any,
        };
        suppliers:{
          getsuppliersStats:any
        }
      }
      
      
      const mapStateToProps = (state:StateProps) => {
        const { getprocurementsStats,getprocurmentStatfindLast7All,getprcmtStatSumRecNtWt6Month} = state.procurements;
        const { getsuppliersStats} = state.suppliers;

        return {getprocurementsStats,getsuppliersStats,getprocurmentStatfindLast7All,getprcmtStatSumRecNtWt6Month,}
      };
      
      const mapDispatchToProps = (dispatch:any)=>{
        return {
          getStatsProcurementsAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatsProcurementsAction(onSuccess,onError)),
          getStatfindLast7AllProcurementsAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatfindLast7AllProcurementsAction(onSuccess,onError)),  
          getStatfindLast6MonthAllProcurementsAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatfindLast6MonthAllProcurementsAction(onSuccess,onError)),    
  
          getStatsSuppliersAction:(onSuccess:any,onError:any)=> dispatch(C5_getStatsSuppliersAction(onSuccess,onError)),
        }
      }
      
      export default connect(mapStateToProps,mapDispatchToProps)(HomeView);