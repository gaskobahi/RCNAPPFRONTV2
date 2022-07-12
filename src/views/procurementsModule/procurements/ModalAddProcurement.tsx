import {
  Container,
  makeStyles,
  Modal,
  Card,
  Grid,
  Divider,
  CardContent,
  CardHeader,
  TextField,
  Tooltip,
  Fab,
  FormControlLabel,
  Switch,
  Input,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import LoadingButton from '@mui/lab/LoadingButton';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
//import { useAlert } from 'react-alert'
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toast } from 'react-toastify';
import moment from 'moment';

//import {C5_CreateProcurementAction} from '../../redux/actions/Procurements/ProcurementsActions';
//import {C5_EditProcurementAction} from '../../redux/actions/Procurements/ProcurementsActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { emailRegExp, phoneRegExp, regexCoords } from "../../../Helpers/helpMenuTree";
import { C5_CreateProcurementAction, C5_getProcurementsAction, C5_getProcurementsv2Action, C5_getSearchProcurementsAction, C5_UpdateProcurementAction } from "../../../redux/actions/ProcurementsModule/procurements";
import CAN from "../../../Ability/can";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import ModalAddStack from "../stacks/ModalAddStack";
import { C5_getStacksAction } from "../../../redux/actions/ProcurementsModule/stacks";
import { Autocomplete } from "@mui/material";
import ModalAddTdechargment from "../tdechargments/ModalAddTdechargment";
import ModalAddRcncontrol from "../rcncontrols/ModalAddRcncontrol";
import ModalAddYieldinspection from "../yieldinspections/ModalAddYieldinspection";
import { usePrevious } from "../../../Helpers/custom";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    width: 400,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));



  interface ModalAddProcurementProps {
    openProcurementModal: boolean;
    closeAddModal: () => void;
    procurement: any;
    sProcurement:any;
    getprocurementsv2: any;
    getstacks:any
    gettdechargments:any;
    getrcncontrols:any;
    getyieldinspections:any;
    isAddMode: boolean;
    createProcurementAction:(data:any,res:any,res1:any)=>void;
    updateProcurementAction:(id:string,data:any,res:any,res1:any)=>void;
    //getProcurementsAction:(res:any,res1:any)=>void;  
    searchProcurementsAction:(sdata:any,res:any,res1:any)=>void;  
    getProcurementsv2Action:(res:any,res1:any)=>void;   
 
    //getStacksAction:(res:any,res1:any)=>void; 
    
  }
  



const ModalAddProcurement = (props:ModalAddProcurementProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);
 const [file, setFile] = useState(null);



 const [openAddStackModal, setopenAddStackModal]=useState(false);
 const [openAddTdechargmentModal, setopenAddTdechargmentModal]=useState(false);
 const [openAddRcncontrolModal, setopenAddRcncontrolModal]=useState(false);
 const [openAddYieldinspectionModal, setopenAddYieldinspectionModal]=useState(false);

 
 
 
  const procurement:any = props?.procurement;
  const getprocurementsv2:any = props?.getprocurementsv2;
  const sProcurement:any=props?.sProcurement;
  const prevProcurement:any =usePrevious(procurement);

  const isAddMode=props?.isAddMode;
  
  let prcmntRcncontrolArrayCode: Array<string>=[];
  getprocurementsv2.map((rcnct:any)=>prcmntRcncontrolArrayCode.push(rcnct.rcncontrolId))

  let prcmntTdecgmentArrayCode: Array<string> =[];
  getprocurementsv2.map((tdch:any)=>prcmntTdecgmentArrayCode.push(tdch.tdechargmentId))

  let prcmntYieldinspectArrayCode: Array<string> =[];
  getprocurementsv2.map((yild:any)=>prcmntYieldinspectArrayCode.push(yild.yieldinspectionId))
    
  const formSchema = Yup.object().shape({
      bags: Yup.number(),
      recnetwt: Yup.number(),
      
      date:Yup.string().required('Date is mandatory'),
      stackId: Yup.string().trim()
      .required('Stack is mandatory'),
      moisture: Yup.number()
      .typeError('MOISTURE must be a number')
      .required('MOISTURE is mandatory')
      .min(0,'MOISTURE  must be greater than or equal to 0')
      .max(11,'MOISTURE  must be less than or equal to 11'),
      nc: Yup.number()
      .typeError('NET CUT must be a number')
      .positive('NET CUT must be a positive number')
      .required('NET CUT is mandatory'),
      browns: Yup.number()
      .typeError('BROWNS must be a number')
      .required('BROWNS is mandatory')
      .min(0,'BROWNS must be greater than or equal to 0')
      .max(100,'BROWNS must be less than or equal to 100'),
      voids: Yup.number()
      .typeError('VOIDS must be a number')
      .required(' VOIDS is mandatory')
      .min(0,'VOIDS must be greater than or equal to 0')
      .max(100,'VOIDS must be less than or equal to 100'),
      immature: Yup.number()
      .typeError('IMMAT must be a number')
      .required('IMMAT is mandatory')
      .min(0,'IMMAT must be greater than or equal to 0')
      .max(100,'IMMAT must be less than or equal to 100'),
      imkernels: Yup.number()
      .typeError('IM KERN must be a number')
      .positive('IM KERN must be a positive number')
      .required('IM KERNis mandatory'),
      spotted: Yup.number()
      .typeError('SPOT must be a number')
      .required('SPOT is mandatory')
      .min(0,'SPOT must be greater than or equal to 0')
      .max(100,'SPOT must be less than or equal to 100'),
      sptkernels: Yup.number()
      .typeError('SPOT KERN must be a number')
      .positive('SPOT KERN must be a positive number')
      .required('SPOT KERN is mandatory'),
      gk: Yup.number()
      .typeError('GK must be a number')
      .positive('GK KERN must be a positive number')
      .required('GK KERN is mandatory'),
      tdechargmentId: Yup.string().trim()
      .required('Ticket Dechargment is mandatory'),
      rcncontrolId: Yup.string().trim()
      .required('RCN Control is mandatory'),
      yieldinspectionId: Yup.string().trim()
      .required('Yield Inspection is mandatory'),
      
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  createProcurement=(data:any)=> {
      const onCreateProcurementSuccess=(res:any)=>{
            const onPSuccesGet=(res:any)=>{
           
              setIsLoading(false)
              props.closeAddModal() 
              reset();
            }
          toast.success("created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.searchProcurementsAction(sProcurement,onPSuccesGet,onErrorGet);
          props.getProcurementsv2Action(onSuccesGet,onErrorGet)
      }
      const onCreateProcurementError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      
     props.createProcurementAction(data,onCreateProcurementSuccess,onCreateProcurementError)
  }


  const  EditProcurement=(data:any)=> {
   const onUpdateProcurementSuccess=(res:any)=>{
      const onPSuccesGet=(res:any)=>{
        setIsLoading(false)
        props.closeAddModal()
        reset();  
      }
      toast.success("updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.searchProcurementsAction(sProcurement,onPSuccesGet,onErrorGet);
      props.getProcurementsv2Action(onSuccesGet,onErrorGet)
    }
  
    const onUpdateProcurementError=(res:any)=>{
      console.log(res)
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)
    }

      if(
        moment(prevProcurement.date).format("YYYY-MM-DDTHH:mm")!=moment(data.date).format("YYYY-MM-DDTHH:mm") ||
        prevProcurement.stackId!=data.stackId || prevProcurement.moisture!=data.moisture || 
        prevProcurement.nc!=data.nc || prevProcurement.browns!=data.browns ||
        prevProcurement.voids!=data.voids || prevProcurement.immature!=data.immature ||
        prevProcurement.imkernels!=data.imkernels || prevProcurement.spotted!=data.spotted ||
        prevProcurement.sptkernels!=data.sptkernels || prevProcurement.gk!=data.gk ||
        prevProcurement.tdechargmentId!=data.tdechargmentId || prevProcurement.rcncontrolId!=data.rcncontrolId ||
        prevProcurement.stackId!=data.stackId || prevProcurement.yieldinspectionId!=data.yieldinspectionId
      ){
          props.updateProcurementAction(data.id,data,onUpdateProcurementSuccess,onUpdateProcurementError)
      }else{
        setIsLoading(false);
        props.closeAddModal();
      }
  }

 

  const _showAddStackModal=()=>{
    setopenAddStackModal(true)
  }

  const _showAddTdechargmentModal=()=>{
    setopenAddTdechargmentModal(true)
  }

  const _showAddRcncontrolModal=()=>{
    setopenAddRcncontrolModal(true)
  }
  const _showAddYieldinspectionModal=()=>{
    setopenAddYieldinspectionModal(true)
  }
  

  const onSubmit = (data:any,e:any) =>{
    setIsLoading(true)
    e.preventDefault();
      return isAddMode ? createProcurement(data):EditProcurement(data)
  }
  
  const _onTdechargementChange=(e:any)=>{
    //alert(e.target.value)
    //setValue('bags',e.target.files[0])
   // setValue('recnetwt',e.target.files[0])
      if(e.target.value){
          const bags= props.gettdechargments? props.gettdechargments.find((tdch:any) => tdch.id === e.target.value)?.bags:0;
          const recnetwt= props.gettdechargments? props.gettdechargments.find((tdch:any) => tdch.id === e.target.value)?.recnetwt:0;
          setValue('bags',bags)
          setValue('recnetwt',recnetwt)
      }else{
          setValue('bags',0)
          setValue('recnetwt',0)
      }

  


  }

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddStackModal=()=>setopenAddStackModal(false)
  const _closeAddTdechargmentModal=()=>setopenAddTdechargmentModal(false)
  const _closeAddRcncontrolModal=()=>setopenAddRcncontrolModal(false)
  const _closeAddYieldinspectionModal=()=>setopenAddYieldinspectionModal(false)




  useEffect(() => { 
    if (!isAddMode) {
        setValue('id', procurement.id)
        setValue('date', moment(procurement.date).format("YYYY-MM-DDTHH:mm"))
        setValue('stackId', procurement.stackId)
        setValue('bags', procurement.bags)
        setValue('recnetwt', procurement.recnetwt)
        setValue('moisture', procurement.moisture)
        setValue('nc', procurement.nc)
        setValue('browns', procurement.browns)
        setValue('voids', procurement.voids)
        setValue('immature', procurement.immature)
        setValue('imkernels', procurement.imkernels)
        setValue('spotted', procurement.spotted)
        setValue('sptkernels', procurement.sptkernels)
        setValue('gk', procurement.gk)
        setValue('tdechargmentId', procurement.tdechargmentId)
        setValue('rcncontrolId', procurement.rcncontrolId)
        setValue('stackId', procurement.stackId)
        setValue('yieldinspectionId', procurement.yieldinspectionId)
    }else{
      setValue('date', moment(new Date()).format("YYYY-MM-DDTHH:mm"))
      setValue('bags', 0)
      setValue('recnetwt', 0)
    }

  }, [isAddMode]);

  return (
    <>
      <Modal open= {props.openProcurementModal}>
        <Container maxWidth="md">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Procurement":"Edit Procurement : "+props.procurement.serial}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={6} >
                        <TextField autoFocus 
                         fullWidth
                          inputProps={{inputFormat:"YYYY-MM-DDTHH:mm"}} 
                          label="Date *"
                          type="datetime-local"
                          size="small"
                          variant="outlined"
                           {...register("date")}
                          helperText={errors.date?.message}
                          error={errors.date?true :false} />
                      </Grid>
                     
                      <Grid item md={4} xs={6} >
                        <TextField fullWidth label="Bags (Q) *" variant="outlined"
                            placeholder='Enter bags'{...register("bags")}
                            size="small"
                            disabled
                            />
                      </Grid>
                      <Grid item md={4} xs={6} >
                        <TextField fullWidth label="NET WEIGHT (KG) *" variant="outlined"
                            {...register("recnetwt")}
                            size="small"
                            disabled
                            />
                      </Grid>
                      <Grid item md={3} xs={4}>
                        <TextField
                            select
                            label="Select Stack *"
                            {...register("stackId")}
                            SelectProps={{native: true,}}
                            autoComplete="on"
                            size="small" fullWidth variant="outlined"
                            helperText={errors.stackId?.message}
                            error={errors.stackId?true :false}
                          >
                              <option value=""></option>
                              { props.getstacks && props.getstacks.map((data:any,index:any) =>{
                                    return <option value={data.id} key={index}>{data.code}</option>
                                })}
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={2}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.STACKS) && (
                            <Tooltip title="Add Stack" aria-label="add" onClick={_showAddStackModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                      <Grid item md={4} xs={6} >
                        <TextField fullWidth label="MOISTURE (%) *" variant="outlined"
                            placeholder='Enter CUTTING MOISTURE '{...register("moisture")}
                            size="small"
                            helperText={errors.moisture?.message}
                            error={errors.moisture?true :false}/>
                      </Grid>
                      <Grid item md={4} xs={6} >
                        <TextField fullWidth label="NET CUT (NOS) *" variant="outlined"
                            placeholder='Enter NET CUT '{...register("nc")}
                            size="small"
                            helperText={errors.nc?.message}
                            error={errors.nc?true :false}/>
                      </Grid>
                      <Grid item md={4} xs={6} >
                        <TextField fullWidth label="BROWNS (%) *" variant="outlined"
                            placeholder='Enter BROWNS '{...register("browns")}
                            size="small"
                            helperText={errors.browns?.message}
                            error={errors.browns?true :false}/>
                      </Grid>
                      <Grid item md={4} xs={6} >
                        <TextField fullWidth label="VOIDS (%) *" variant="outlined"
                            placeholder='Enter VOIDS '{...register("voids")}
                            size="small"
                            helperText={errors.voids?.message}
                            error={errors.voids?true :false}/>
                      </Grid>
                      <Grid item md={4} xs={6} >
                        <TextField fullWidth label="IMMATURE (%) *" variant="outlined"
                            placeholder='Enter IMMATURE '{...register("immature")}
                            size="small"
                            helperText={errors.immature?.message}
                            error={errors.immature?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={6} >
                        <TextField fullWidth label="IM KERNELS (g) *" variant="outlined"
                            placeholder='Enter IMMATURE KERNELS  '{...register("imkernels")}
                            size="small"
                            helperText={errors.imkernels?.message}
                            error={errors.imkernels?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={6} >
                        <TextField fullWidth label="SPOTTED (%) *" variant="outlined"
                            placeholder='Enter SPOTTED  '{...register("spotted")}
                            size="small"
                            helperText={errors.spotted?.message}
                            error={errors.spotted?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={6} >
                        <TextField fullWidth label="SPOT KERNELS (g) *" variant="outlined"
                            placeholder='Enter SPOTTED KERNELS  '{...register("sptkernels")}
                            size="small"
                            helperText={errors.sptkernels?.message}
                            error={errors.sptkernels?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={6} >
                        <TextField fullWidth label="GK (g) *" variant="outlined"
                            placeholder='Enter GK'{...register("gk")}
                            size="small"
                            helperText={errors.gk?.message}
                            error={errors.gk?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={4}>
                        <TextField
                            select
                            label="Select Ticket Decharg. *"
                            {...register("tdechargmentId")}
                            onChange={(e)=>_onTdechargementChange(e)}
                            SelectProps={{native: true,}}
                            autoComplete="on"
                            size="small" fullWidth variant="outlined"
                            helperText={errors.tdechargmentId?.message}
                            error={errors.tdechargmentId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.gettdechargments && props.gettdechargments.map((data:any,index:any) =>{
                                  var td:boolean;
                                  if(!isAddMode){
                                    data?.id==procurement.tdechargmentId?td=false:td=prcmntTdecgmentArrayCode.includes(data.id);
                                  }else{
                                    td=prcmntTdecgmentArrayCode.includes(data.id);
                                  }
                                  if(!td){
                                    return <option value={data.id} key={index}>{data.code+" => "+data.ftransfertCode}</option>
                                  }
                                })
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={2}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.TDECHARGMENTS) && (
                            <Tooltip title="Add Ticket Dechargment" aria-label="add" onClick={_showAddTdechargmentModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                      <Grid item md={3} xs={4}>
                        <TextField
                            select
                            label="Select RCN Control *"
                            {...register("rcncontrolId")}
                            SelectProps={{native: true,}}
                            autoComplete="on"
                            size="small" fullWidth variant="outlined"
                            helperText={errors.rcncontrolId?.message}
                            error={errors.rcncontrolId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getrcncontrols && props.getrcncontrols.map((data:any,index:any) =>{
                                  if(data.ftranfertIsaccepted){
                                      var td:boolean;
                                      if(!isAddMode){
                                        data?.id==procurement.rcncontrolId?td=false:td=prcmntRcncontrolArrayCode.includes(data.id);
                                      }else{
                                        td=prcmntRcncontrolArrayCode.includes(data.id);
                                      }
                                      if(!td){
                                        return <option value={data.id} key={index}>{data.code}</option>
                                      }
                                  }
                                })
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={2}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.RCNCONTROLS) && (
                            <Tooltip title="Add RCN Control" aria-label="add" onClick={_showAddRcncontrolModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                      <Grid item md={3} xs={4}>
                        <TextField
                            select
                            label="Select Yield Inspection *"
                            {...register("yieldinspectionId")}
                            SelectProps={{native: true,}}
                            autoComplete="on"
                            size="small" fullWidth variant="outlined"
                            helperText={errors.yieldinspectionId?.message}
                            error={errors.yieldinspectionId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getyieldinspections && props.getyieldinspections.map((data:any,index:any) =>{
                                    if(data.ftranfertIsaccepted){
                                        var td:boolean;
                                        if(!isAddMode){
                                          data?.id==procurement.yieldinspectionId?td=false:td=prcmntYieldinspectArrayCode.includes(data.id);
                                        }else{
                                          td=prcmntYieldinspectArrayCode.includes(data.id);
                                        }
                                        if(!td){
                                          return <option value={data.id} key={index}>{data.code}</option>
                                        }
                                  }
                                })
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={2}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.YIELDINSPECTIONS) && (
                            <Tooltip title="Add Yield Inspection" aria-label="add" onClick={_showAddYieldinspectionModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                    </Grid>
                    <br/>
                    <Divider/>
                    <Grid container md={12} xs={12}  justifyContent='flex-end' style={{marginTop:10}}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                          <LoadingButton  type="submit" variant="contained" color="success"    loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading}>
                                Save 
                          </LoadingButton>
                    </Grid>
                 </CardContent>
              </Card>
              </form>
        
        </Container>
      </Modal>
      {openAddStackModal?
      <ModalAddStack openStackModal={openAddStackModal} closeAddModal={_closeAddStackModal} stack={''} isAddMode={true}/>
            :''}
      {openAddTdechargmentModal?
      <ModalAddTdechargment openTdechargmentModal={openAddTdechargmentModal} closeAddModal={_closeAddTdechargmentModal} tdechargment={''} isAddMode={true}/>
            :''}
       {openAddRcncontrolModal?
      <ModalAddRcncontrol openRcncontrolModal={openAddRcncontrolModal} closeAddModal={_closeAddRcncontrolModal} rcncontrol={''} isAddMode={true}/>
            :''}
      {openAddYieldinspectionModal?
      <ModalAddYieldinspection openYieldinspectionModal={openAddYieldinspectionModal} closeAddModal={_closeAddYieldinspectionModal} yieldinspection={''} isAddMode={true}/>
            :''}
            
    </>
  );
};


const mapStateToProps = (state:any) => {
  const { getprocurementsv2 } = state.procurements;
  const { getstacks } = state.stacks;
  const { gettdechargments } = state.tdechargments;
  const { getrcncontrols } = state.rcncontrols;
  const { getyieldinspections } = state.yieldinspections;

  return {getprocurementsv2,getstacks,gettdechargments,getrcncontrols,getyieldinspections}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createProcurementAction: (data:any,onSuccess:any,onError:any)=> dispatch(C5_CreateProcurementAction(data,onSuccess,onError)),
    updateProcurementAction: (id:string,data:any,onSuccess:any,onError:any)=> dispatch(C5_UpdateProcurementAction(id,data,onSuccess,onError)),
    getProcurementsAction: (onSuccess:any,onError:any)=> dispatch(C5_getProcurementsAction(onSuccess,onError)),
    getProcurementsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getProcurementsv2Action(onSuccess,onError)),
    searchProcurementsAction: (searchdata:any,onSuccess:any,onError:any)=> dispatch(C5_getSearchProcurementsAction(searchdata,onSuccess,onError)),

    

  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddProcurement);