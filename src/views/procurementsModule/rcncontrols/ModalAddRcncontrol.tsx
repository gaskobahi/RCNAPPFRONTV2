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
  Button,
 
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
//import { useAlert } from 'react-alert'

import { connect, useDispatch } from 'react-redux';
import {toast } from 'react-toastify';
import moment from 'moment';

//import {C5_CreateRcncontrolAction} from '../../redux/actions/Rcncontrols/RcncontrolsActions';
//import {C5_EditRcncontrolAction} from '../../redux/actions/Rcncontrols/RcncontrolsActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreateRcncontrolAction, C5_getRcncontrolsAction, C5_getRcncontrolsv2Action, C5_UpdateRcncontrolAction } from "../../../redux/actions/ProcurementsModule/rcncontrols";
import CAN from "../../../Ability/can";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import ModalAddFtransfert from "../ftransferts/ModalAddFtransfert";
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



  interface ModalAddRcncontrolProps {
    openRcncontrolModal: boolean;
    closeAddModal: () => void;
    rcncontrol: any;
    getrcncontrols: any;
    getrcncontrolsv2:any;
    getftransferts:any
    isAddMode: boolean;
    createRcncontrolAction:(data:FormData,res:any,res1:any)=>void;
    updateRcncontrolAction:(id:string,data:any,res:any,res1:any)=>void;
    getRcncontrolsAction:(res:any,res1:any)=>void;  
    getRcncontrolsv2Action:(res:any,res1:any)=>void;   
 
    //getFtransfertsAction:(res:any,res1:any)=>void; 
    
  }
  



const ModalAddRcncontrol = (props:ModalAddRcncontrolProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);
 const [file, setFile] = useState(null);
 const dispatch = useDispatch();



 const [openAddFtransfertModal, setopenAddFtransfertModal] =useState(false);

  const rcncontrol:any = props?.rcncontrol;
  const getrcncontrolsv2:any = props?.getrcncontrolsv2;
  const prevRcncontrol:any =usePrevious(rcncontrol);

  const isAddMode=props?.isAddMode;
  
  let rcncontrolArrayCode: Array<string> =[];
  getrcncontrolsv2 && getrcncontrolsv2.map((rcn:any)=>rcncontrolArrayCode.push(rcn.ftransfertId))

    
  const formSchema = Yup.object().shape({
      date:Yup.string().required('Date is mandatory'),
      code: Yup.string().trim()
      .min(2, 'Code must be at 2 char short')
      .required('Code is mandatory')
      .max(15, 'Code must be at 15 char long'),
      ftransfertId: Yup.string().trim()
      .required('File Transfert is mandatory'),
      photo: Yup.mixed()
      .transform(x => x === '' ? null : x)
      .concat(isAddMode ? Yup.mixed().required('RCN Control file is mandatory'):Yup.mixed())
      
     
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createRcncontrol=(data:any)=> {
      const onCreateRcncontrolSuccess=(res:any)=>{
       
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getRcncontrolsAction(onSuccesGet,onErrorGet)
          props.getRcncontrolsv2Action(onSuccesGet,onErrorGet)
          /*socket.emit("REQUEST_CREATE_RCNCONTROL",props.getrcncontrols)
          socket.on("RESPONSE_CREATE_RCNCONTROL",data=>{*
          })*/
          props.closeAddModal() 
      }
      const onCreateRcncontrolError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }

      let formData = new FormData();
      formData.append('photo',data.photo);
      formData.append('date',data.date);
      formData.append('code',data.code);
      formData.append('ftransfertId',data.ftransfertId);
   

      props.createRcncontrolAction(formData,onCreateRcncontrolSuccess,onCreateRcncontrolError)
  }

  const onSuccesGet=(res:any)=>{
    console.log(res)
  }
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditRcncontrol=(data:any)=> {
   const onUpdateRcncontrolSuccess=(res:any)=>{
      reset();
      setIsLoading(false)
      toast.success(" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getRcncontrolsAction(onSuccesGet,onErrorGet)
      props.getRcncontrolsv2Action(onSuccesGet,onErrorGet)
      props.closeAddModal()   
    }
  
    const onUpdateRcncontrolError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)
    }
    let formData = new FormData();
      if(data.photo){formData.append('photo',data.photo)}
      formData.append('date',data.date);
      formData.append('code',data.code);
      formData.append('ftransfertId',data.ftransfertId);
      if(!data.photo==undefined || moment(prevRcncontrol.date).format("YYYY-MM-DDTHH:mm")!=moment(data.date).format("YYYY-MM-DDTHH:mm") ||
      prevRcncontrol.code!=data.code || prevRcncontrol.ftransfertId!=data.ftransfertId){
        props.updateRcncontrolAction(data.id,formData,onUpdateRcncontrolSuccess,onUpdateRcncontrolError)
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
    setIsLoading(false)
      return isAddMode ? createRcncontrol(data):EditRcncontrol(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddFtransfertModal=()=>setopenAddFtransfertModal(false)

   const onInputChange=(e:any)=>{
    setValue('photo',e.target.files[0],{ shouldValidate: true })
   }

   const _getRcncontrolCode=(e:any)=>{
    const code= props.getftransferts? props.getftransferts.find((rcn:any) => rcn.id === e.target.value)?.code:'';
    setValue('code',code)
  }

  useEffect(() => { 
    if (!isAddMode) {
        setValue('id', rcncontrol.id)
        setValue('code', rcncontrol.code)
        setValue('date', moment(rcncontrol.date).format("YYYY-MM-DDTHH:mm"))
        setValue('ftransfertId', rcncontrol.ftransfertId)
    }else{
      setValue('date', moment(new Date()).format("YYYY-MM-DDTHH:mm"))
    }

  }, [isAddMode]);
  

  return (
    <>
      <Modal open= {props.openRcncontrolModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add RCN Control":"Edit RCN Control : "+props.rcncontrol.code}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={6} >
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
                        <TextField fullWidth label="Code *" variant="outlined"
                           // placeholder='Enter code'
                            {...register("code")}
                            disabled
                            size="small"
                            //helperText={errors.code?.message}
                           // error={errors.code?true :false}
                           />
                      </Grid>
                      <Grid item md={11} xs={11}>
                        <TextField
                            select
                            label="Select File Transfert *"
                            {...register("ftransfertId")}
                            SelectProps={{native: true, }}
                            size="small"
                            fullWidth
                            variant="outlined"
                            autoComplete="on"
                            helperText={errors.ftransfertId?.message}
                            error={errors.ftransfertId?true :false}
                            onChange={(e)=>_getRcncontrolCode(e)}
                          >
                              <option value=""></option>
                              {
                                props.getftransferts && props.getftransferts.map((data:any,index:any) =>{
                                  var td:boolean;
                                  if(!isAddMode){
                                    data?.id==rcncontrol.ftransfertId?td=false:td=rcncontrolArrayCode.includes(data.id);
                                  }else{
                                    td=rcncontrolArrayCode.includes(data.id);
                                  }
                                  if(!td){
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
  const { getrcncontrols,getrcncontrolsv2 } = state.rcncontrols;
  const { getftransferts } = state.ftransferts;

  return {getftransferts,getrcncontrols,getrcncontrolsv2}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createRcncontrolAction: (data:FormData,onSuccess:any,onError:any)=> dispatch(C5_CreateRcncontrolAction(data,onSuccess,onError)),
    updateRcncontrolAction: (id:string,data:FormData,onSuccess:any,onError:any)=> dispatch(C5_UpdateRcncontrolAction(id,data,onSuccess,onError)),
    getRcncontrolsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRcncontrolsAction(onSuccess,onError)),
    getRcncontrolsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getRcncontrolsv2Action(onSuccess,onError)),

  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddRcncontrol);