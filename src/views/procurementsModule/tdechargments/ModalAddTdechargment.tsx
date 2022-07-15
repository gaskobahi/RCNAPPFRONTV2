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
  Button,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toast } from 'react-toastify';
import moment from 'moment';

//import {C5_CreateTdechargmentAction} from '../../redux/actions/Tdechargments/TdechargmentsActions';
//import {C5_EditTdechargmentAction} from '../../redux/actions/Tdechargments/TdechargmentsActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreateTdechargmentAction, C5_getTdechargmentsAction, C5_getTdechargmentsv2Action, C5_UpdateTdechargmentAction } from "../../../redux/actions/ProcurementsModule/tdechargments";
import CAN from "../../../Ability/can";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import ModalAddFtransfert from "../ftransferts/ModalAddFtransfert";
import { Autocomplete } from "@mui/material";
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



  interface ModalAddTdechargmentProps {
    openTdechargmentModal: boolean;
    closeAddModal: () => void;
    tdechargment: any;
    gettdechargmentsv2: any;
    getftransferts:any
    isAddMode: boolean;
    createTdechargmentAction:(data:FormData,res:any,res1:any)=>void;
    updateTdechargmentAction:(id:string,data:any,res:any,res1:any)=>void;
    getTdechargmentsAction:(res:any,res1:any)=>void;  
    getTdechargmentsv2Action:(res:any,res1:any)=>void;  
    //getFtransfertsAction:(res:any,res1:any)=>void; 
  }
  



const ModalAddTdechargment = (props:ModalAddTdechargmentProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);
 const [file, setFile] = useState(null);



 const [openAddFtransfertModal, setopenAddFtransfertModal] =useState(false);

  const tdechargment:any = props?.tdechargment;
  const gettdechargmentsv2:any = props?.gettdechargmentsv2;
  const prevTdechargment:any =usePrevious(tdechargment);


  const isAddMode=props?.isAddMode;
  
  let tdechargmentArrayCode: Array<string> =[];
  gettdechargmentsv2 && gettdechargmentsv2.map((tdch:any)=>tdechargmentArrayCode.push(tdch.ftransfertId))

 
    
  const formSchema = Yup.object().shape({
      place: Yup.string().trim(),
      supplierFullname :Yup.string().trim(),

      date:Yup.string().required('Date is mandatory'),
      code: Yup.string().trim()
      .min(2, 'Ticket Number must be at 2 char short')
      .required('Ticket Number is mandatory')
      .max(15, 'Ticket Number must be at 15 char long'),
      bags: Yup.number()
      .typeError('Bags must be a number')
      .positive('Bags must be a positive number')
      .required('Bags is mandatory'),
      recnetwt: Yup.number()
      .typeError('Net Weight must be a number')
      .positive('Net Weight must be a positive number')
      .required('Net Weight is mandatory'),
      grosswt: Yup.number()
      .typeError('Gross Weight must be a number')
      .positive('Gross Weight must be a positive number')
      .required('Gross Weight is mandatory'),
      ftransfertId: Yup.string().trim()
      .required('File Transfert is mandatory'),
      photo: Yup.mixed()
      .transform(x => x === '' ? null : x)
      .concat(isAddMode ? Yup.mixed().required('Ticket Dechargment file is required'):Yup.mixed())
      
     
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createTdechargment=(data:any)=> {
      const onCreateTdechargmentSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getTdechargmentsAction(onSuccesGet,onErrorGet)
          props.getTdechargmentsv2Action(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateTdechargmentError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }

      let formData = new FormData();
      formData.append('photo',data.photo);
      formData.append('date',data.date);
      formData.append('code',data.code);
      formData.append('bags',data.bags);
      formData.append('recnetwt',data.recnetwt);
      formData.append('grosswt',data.grosswt);
      formData.append('ftransfertId',data.ftransfertId);
   

      props.createTdechargmentAction(formData,onCreateTdechargmentSuccess,onCreateTdechargmentError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditTdechargment=(data:any)=> {
   const onUpdateTdechargmentSuccess=(res:any)=>{
      reset();
      setIsLoading(false)
      toast.success(data.code+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getTdechargmentsAction(onSuccesGet,onErrorGet)
      props.getTdechargmentsv2Action(onSuccesGet,onErrorGet)

      
      props.closeAddModal()   
    }
  
    const onUpdateTdechargmentError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)
    }
    let formData = new FormData();
      if(data.photo){formData.append('photo',data.photo)}
      formData.append('date',data.date);
      formData.append('code',data.code);
      formData.append('bags',data.bags);
      formData.append('recnetwt',data.recnetwt);
      formData.append('grosswt',data.grosswt);
      formData.append('ftransfertId',data.ftransfertId);
      
      if(!data.photo==undefined || moment(prevTdechargment.date).format("YYYY-MM-DDTHH:mm")!=moment(data.date).format("YYYY-MM-DDTHH:mm") ||
       prevTdechargment.code!=data.code || prevTdechargment.bags!=data.bags || prevTdechargment.recnetwt!=data.recnetwt ||
       prevTdechargment.grosswt!=data.grosswt || prevTdechargment.ftransfertId!=data.ftransfertId){
           props.updateTdechargmentAction(data.id,formData,onUpdateTdechargmentSuccess,onUpdateTdechargmentError)
      }else{
          setIsLoading(false);
          props.closeAddModal();
      }
  }


  const _showAddFtransfertModal=()=>{
    setopenAddFtransfertModal(true)
  }


  const onSubmit = (data:any,e:any) =>{
    e.preventDefault();
      return isAddMode ? createTdechargment(data):EditTdechargment(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddFtransfertModal=()=>setopenAddFtransfertModal(false)

  const _onFtransfertChange=(e:any)=>{
      if(e.target.value){
          const stickerno= props.getftransferts? props.getftransferts.find((ft:any) => ft.id === e.target.value)?.stickerno:'';
          const supplierFullname= props.getftransferts? props.getftransferts.find((ft:any) => ft.id === e.target.value)?.supplier:'';
          setValue('stickerno',stickerno)
          setValue('supplierFullname',supplierFullname)
      }else{
          setValue('stickerno','-')
          setValue('supplierFullname','-')
      }

  


  }

   const onInputChange=(e:any)=>{
    setValue('photo',e.target.files[0],{ shouldValidate: true })
   }


  useEffect(() => { 
    if (!isAddMode) {
        setValue('id', tdechargment.id)
        setValue('date', moment(tdechargment.date).format("YYYY-MM-DDTHH:mm"))
        setValue('code', tdechargment.code)
        setValue('bags', tdechargment.bags)
        setValue('recnetwt', tdechargment.recnetwt)
        setValue('grosswt',tdechargment.grosswt)
        setValue('ftransfertId',tdechargment.ftransfertId)

        setValue('stickerno',tdechargment.ftransfertStickerno)
        setValue('supplierFullname',tdechargment.supplierFullname)


    }else{
      setValue('date',moment(new Date()).format("YYYY-MM-DDTHH:mm"))
       
      setValue('stickerno','-')
      setValue('supplierFullname','-')


    }

  }, [isAddMode]);

  return (
    <>
      <Modal open= {props.openTdechargmentModal}>
        <Container maxWidth="md">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Ticket Dechargment":"Edit Ticket Dechargment : "+props.tdechargment.code}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={4} >
                        <TextField autoFocus 
                          inputProps={{inputformat:"YYYY-MM-DDTHH:mm"}} 
                          label="Date *"
                          type="datetime-local"
                          size="small"
                          variant="outlined"
                           {...register("date")}
                          helperText={errors.date?.message}
                          error={errors.date?true :false} />
                      </Grid>
                      <Grid item md={5} xs={5} >
                        <TextField fullWidth label="Supplier " variant="outlined"
                            {...register("supplierFullname")}
                            size="small"
                            disabled
                            />
                      </Grid>
                      <Grid item md={3} xs={3} >
                        <TextField fullWidth label="File Tranfert Sticker No" variant="outlined"
                            {...register("stickerno")}
                            size="small"
                            disabled
                            />
                      </Grid>
                      <Grid item md={11} xs={11}>
                        <TextField
                            select
                            label="Select File Transfert *"
                            {...register("ftransfertId")}
                            SelectProps={{native: true, }}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            onChange={(e)=>_onFtransfertChange(e)}
                            helperText={errors.ftransfertId?.message}
                            error={errors.ftransfertId?true :false}
                          >
                              <option value=""></option>
                              {
                                props.getftransferts && props.getftransferts.map((data:any,index:any) =>{
                                  var td:boolean;
                                  if(!isAddMode){
                                    data?.id==tdechargment.ftransfertId?td=false:td=tdechargmentArrayCode.includes(data.id);
                                  }else{
                                    td=tdechargmentArrayCode.includes(data.id);
                                  }
                                  if(!td && data.isaccepted ){
                                    return <option value={data.id} key={index}>{data.code+' - '+moment(data.date).format("DD/MM/YYYY HH:mm")}</option>
                                  }
                                })
                              }
                         </TextField>
                      </Grid>
                      <Grid item md={1} xs={1}>
                      {CAN(UserAction.Create,EntityUSERMODAbilty.FTRANSFERTS) && (
                            <Tooltip title="Add File Transfert" aria-label="add" onClick={_showAddFtransfertModal}>
                                <Fab color="secondary" size='small'> 
                                  <AddIcon />
                                </Fab>
                          </Tooltip>
                         )}
                      </Grid>
                     
                      <Grid item md={3} xs={6} >
                        <TextField fullWidth label="Ticket Number *" variant="outlined"
                            placeholder='Enter Ticket Number'{...register("code")}
                            size="small"
                            helperText={errors.code?.message}
                            error={errors.code?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={6} >
                        <TextField fullWidth label="Bags *" variant="outlined"
                            placeholder='Enter Bags '{...register("bags")}
                            size="small"
                            helperText={errors.bags?.message}
                            error={errors.bags?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={6} >
                        <TextField fullWidth label="Net Weight *" variant="outlined"
                            placeholder='Enter Net Weight '{...register("recnetwt")}
                            size="small"
                            helperText={errors.recnetwt?.message}
                            error={errors.recnetwt?true :false}/>
                      </Grid>
                      <Grid item md={3} xs={6} >
                        <TextField fullWidth label="Gross Weight *" variant="outlined"
                            placeholder='Enter Gross Weight '{...register("grosswt")}
                            size="small"
                            helperText={errors.grosswt?.message}
                            error={errors.grosswt?true :false}/>
                      </Grid>
                     
                      <Grid item md={6} xs={6}>
                            <label htmlFor="files">
                              <Button variant="contained"  color="secondary" component="label"  >
                                Upload File
                              <input  id="files"  type='file' onChange={onInputChange} accept="application/pdf"  style={{ display: 'none' }}/>
                              </Button>
                            </label>
                              {errors.photo? 
                                  <p style={{color:'red'}}>{errors.photo?.message}</p>:''
                                }
                       </Grid>
                    </Grid>
                 
                       <Divider/>
                      <Grid container item md={12} xs={12}  justifyContent='flex-end' style={{marginTop:10}}>  
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
      {openAddFtransfertModal?
      <ModalAddFtransfert openFtransfertModal={openAddFtransfertModal} closeAddModal={_closeAddFtransfertModal} ftransfert={''} isAddMode={true}/>
            :''}
    </>
  );
};


const mapStateToProps = (state:any) => {
  const { gettdechargments,gettdechargmentsv2 } = state.tdechargments;

  
  const { getftransferts } = state.ftransferts;

  return {getftransferts,gettdechargments,gettdechargmentsv2}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createTdechargmentAction: (data:FormData,onSuccess:any,onError:any)=> dispatch(C5_CreateTdechargmentAction(data,onSuccess,onError)),
    updateTdechargmentAction: (id:string,data:FormData,onSuccess:any,onError:any)=> dispatch(C5_UpdateTdechargmentAction(id,data,onSuccess,onError)),
    getTdechargmentsAction: (onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentsAction(onSuccess,onError)),
    getTdechargmentsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getTdechargmentsv2Action(onSuccess,onError)),

  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddTdechargment);