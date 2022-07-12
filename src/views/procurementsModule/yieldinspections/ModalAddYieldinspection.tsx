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

//import {C5_CreateYieldinspectionAction} from '../../redux/actions/Yieldinspections/YieldinspectionsActions';
//import {C5_EditYieldinspectionAction} from '../../redux/actions/Yieldinspections/YieldinspectionsActions';



import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { emailRegExp, phoneRegExp, regexCoords } from "../../../Helpers/helpMenuTree";
import { C5_CreateYieldinspectionAction, C5_getYieldinspectionsAction, C5_getYieldinspectionsv2Action, C5_UpdateYieldinspectionAction } from "../../../redux/actions/ProcurementsModule/yieldinspections";
import CAN from "../../../Ability/can";
import { EntityUSERMODAbilty, UserAction } from "../../../Ability/Actions";
import ModalAddFtransfert from "../ftransferts/ModalAddFtransfert";
import { C5_getFtransfertsAction } from "../../../redux/actions/ProcurementsModule/ftransferts";
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



  interface ModalAddYieldinspectionProps {
    openYieldinspectionModal: boolean;
    closeAddModal: () => void;
    yieldinspection: any;
    getyieldinspections: any;
    getyieldinspectionsv2:any;
    getftransferts:any
    isAddMode: boolean;
    createYieldinspectionAction:(data:FormData,res:any,res1:any)=>void;
    updateYieldinspectionAction:(id:string,data:any,res:any,res1:any)=>void;
    getYieldinspectionsAction:(res:any,res1:any)=>void;  
    getYieldinspectionsv2Action:(res:any,res1:any)=>void;   
 
    //getFtransfertsAction:(res:any,res1:any)=>void; 
    
  }
  



const ModalAddYieldinspection = (props:ModalAddYieldinspectionProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);
 const [file, setFile] = useState(null);



 const [openAddFtransfertModal, setopenAddFtransfertModal] =useState(false);

  const yieldinspection:any = props?.yieldinspection;
  const getyieldinspectionsv2:any = props?.getyieldinspectionsv2;
  const prevYieldinspection:any =usePrevious(yieldinspection);

  const isAddMode=props?.isAddMode;
  
  let yieldinspectionArrayCode: Array<string> =[];
  getyieldinspectionsv2 && getyieldinspectionsv2.map((yiel:any)=>yieldinspectionArrayCode.push(yiel.ftransfertId))

 
    
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
      .concat(isAddMode ? Yup.mixed().required('Yield Inspection file is mandatory'):Yup.mixed())
      
     
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createYieldinspection=(data:any)=> {
      const onCreateYieldinspectionSuccess=(res:any)=>{
          reset();
          const onErrorGet=(res:any)=>{console.log(res)}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getYieldinspectionsAction(onSuccesGet,onErrorGet)
          props.getYieldinspectionsv2Action(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateYieldinspectionError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }

      let formData = new FormData();
      formData.append('photo',data.photo);
      formData.append('date',data.date);
      formData.append('code',data.code);
      formData.append('ftransfertId',data.ftransfertId);
   

      props.createYieldinspectionAction(formData,onCreateYieldinspectionSuccess,onCreateYieldinspectionError)
  }

  const onSuccesGet=(res:any)=>{console.log(res)}
  const onErrorGet=(res:any)=>{console.log(res)}

  const  EditYieldinspection=(data:any)=> {
   const onUpdateYieldinspectionSuccess=(res:any)=>{
      reset();
      setIsLoading(false)
      toast.success(" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getYieldinspectionsAction(onSuccesGet,onErrorGet)
      props.getYieldinspectionsv2Action(onSuccesGet,onErrorGet)
      props.closeAddModal()   
    }
  
    const onUpdateYieldinspectionError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)
    }
    let formData = new FormData();
      if(data.photo){formData.append('photo',data.photo)}
      formData.append('date',data.date);
      formData.append('code',data.code);
      formData.append('ftransfertId',data.ftransfertId);
      
      if(!data.photo==undefined || moment(prevYieldinspection.date).format("YYYY-MM-DDTHH:mm")!=moment(data.date).format("YYYY-MM-DDTHH:mm") ||
      prevYieldinspection.code!=data.code || prevYieldinspection.ftransfertId!=data.ftransfertId){
        props.updateYieldinspectionAction(data.id,formData,onUpdateYieldinspectionSuccess,onUpdateYieldinspectionError)
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
      return isAddMode ? createYieldinspection(data):EditYieldinspection(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  const _closeAddFtransfertModal=()=>setopenAddFtransfertModal(false)

   const onInputChange=(e:any)=>{
     setValue('photo',e.target.files[0])

   }

   const _getYieldinspectionCode=(e:any)=>{
    //setValue('code',e.target.value)
    //props.getftransferts && props.getftransferts.map((data:any,index:any) =>{}
    const code= props.getftransferts? props.getftransferts.find((yiel:any) => yiel.id === e.target.value)?.code:'';
    setValue('code',code)
  }

  useEffect(() => { 
    if (!isAddMode) {
        setValue('id', yieldinspection.id)
        setValue('code', yieldinspection.code)
        setValue('date', moment(yieldinspection.date).format("YYYY-MM-DDTHH:mm"))
        setValue('ftransfertId', yieldinspection.ftransfertId)
    }else{
      setValue('date', moment(new Date()).format("YYYY-MM-DDTHH:mm"))
    }

  }, [isAddMode]);
  console.log(yieldinspectionArrayCode)
  console.log(props.getyieldinspectionsv2)

  

  return (
    <>
      <Modal open= {props.openYieldinspectionModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Yield Inspection":"Edit Yield Inspection : "+props.yieldinspection.code}/>
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
                            SelectProps={{ native: true,}}
                            autoComplete="on"
                            size="small"
                            fullWidth
                            variant="outlined"
                            helperText={errors.ftransfertId?.message}
                            error={errors.ftransfertId?true :false}
                            onChange={(e)=>_getYieldinspectionCode(e)}
                          >
                              <option value=""></option>
                              {
                                props.getftransferts && props.getftransferts.map((data:any,index:any) =>{
                                  var td:boolean;
                                  if(!isAddMode){
                                    data?.id==yieldinspection.ftransfertId?td=false:td=yieldinspectionArrayCode.includes(data.id);
                                  }else{
                                    td=yieldinspectionArrayCode.includes(data.id);
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
  const { getyieldinspections,getyieldinspectionsv2 } = state.yieldinspections;
  const { getftransferts } = state.ftransferts;

  return {getftransferts,getyieldinspections,getyieldinspectionsv2}
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createYieldinspectionAction: (data:FormData,onSuccess:any,onError:any)=> dispatch(C5_CreateYieldinspectionAction(data,onSuccess,onError)),
    updateYieldinspectionAction: (id:string,data:FormData,onSuccess:any,onError:any)=> dispatch(C5_UpdateYieldinspectionAction(id,data,onSuccess,onError)),
    getYieldinspectionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getYieldinspectionsAction(onSuccess,onError)),
    getYieldinspectionsv2Action: (onSuccess:any,onError:any)=> dispatch(C5_getYieldinspectionsv2Action(onSuccess,onError)),

  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddYieldinspection);