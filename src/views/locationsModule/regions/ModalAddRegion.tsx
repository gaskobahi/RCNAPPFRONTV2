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
} from "@material-ui/core";
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

import { connect } from 'react-redux';
import {toast } from 'react-toastify';


import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { C5_CreateRegionAction, C5_getRegionsAction, C5_UpdateRegionAction } from "../../../redux/actions/LocationsModule/regions";
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



  interface ModalAddRegionProps {
    openRegionModal: boolean;
    closeAddModal: () => void;
    region: any;
    isAddMode: boolean;
    createRegionAction:(data:any,res:any,res1:any)=>void;
    updateRegionAction:(id:string,data:any,res:any,res1:any)=>void;
    getRegionsAction:(res:any,res1:any)=>void;      
    
  }
  



const ModalAddRegion = (props:ModalAddRegionProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMsg]=useState();
  const [errorMessage,setErrorMsg]=useState();
 const [onClose, setonClose] = useState(false);


  const region:any = props?.region;
  const prevRegion:any =usePrevious(region);

  const isAddMode=props?.isAddMode;

  const handleClose = (event:any, reason:any) => {
    if (reason === "clickaway") {
      return;
    }
  };

    
  const formSchema = Yup.object().shape({
      code: Yup.string().trim()
      .min(2, 'Code must be at 2 char short')
      .required('Code is mandatory')
      .max(15, 'Code must be at 15 char long'),
      name: Yup.string().trim()
      .min(2, 'Name must be at 2 char short')
      .required('Name is mandatory')
      .max(20, 'Name must be at 20 char long'),
      description: Yup.string()
      .max(25, 'Description must be at 25 char long'),
  })


  const formOptions = { resolver: yupResolver(formSchema) }

  const { register, handleSubmit, resetField,reset, clearErrors, watch,getValues, setValue, formState,formState: { isDirty,isSubmitSuccessful,errors } } = useForm(formOptions)

  const [isloading,setIsLoading]=useState(false)


  const  createRegion=(data:any)=> {
      const onCreateRegionSuccess=(res:any)=>{
          reset();
      const onErrorGet=(res:any)=>{/*console.log(res)*/}
          setIsLoading(false)
          toast.success(data.code+" created successfully!",{position:toast.POSITION.BOTTOM_CENTER});
          props.getRegionsAction(onSuccesGet,onErrorGet)
          props.closeAddModal() 
      }
      const onCreateRegionError=(res:any)=>{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
        setIsLoading(false)
      }
      props.createRegionAction(data,onCreateRegionSuccess,onCreateRegionError)
  }

const onSuccesGet=(res:any)=>{/*console.log(res)*/}
const onErrorGet=(res:any)=>{/*console.log(res)*/}

  const  EditRegion=(data:any)=> {
   const onUpdateRegionSuccess=(res:any)=>{
      reset();
     
      setIsLoading(false)
      toast.success(data.code+" updated successfully!",{position:toast.POSITION.BOTTOM_CENTER});
      props.getRegionsAction(onSuccesGet,onErrorGet)

      props.closeAddModal()   
    }
  
    const onUpdateRegionError=(res:any)=>{
      toast.error(res.message,{position:toast.POSITION.TOP_CENTER});
      setIsLoading(false)

    }

    if(prevRegion.code!=data.code || prevRegion.name!=data.name || prevRegion.description!=data.description){
      props.updateRegionAction(data.id,data,onUpdateRegionSuccess,onUpdateRegionError)
    }else{
      setIsLoading(false);
      props.closeAddModal();
    }
  }


  const onSubmit = (data:any,e:any) =>{
      e.preventDefault();
      setIsLoading(true)
      return isAddMode ? createRegion(data):EditRegion(data)
  }
  

  const _cancel=()=>{
    props.closeAddModal(); 
  }

  
  useEffect(() => {
    if (!isAddMode) {
      setValue('id', region.id)
      setValue('code', region.code)
      setValue('name', region.name)
      setValue('description', region.description)
     }
  }, [isAddMode]);

 
  return (
    <>
      <Modal open= {props.openRegionModal}>
        <Container maxWidth="sm">
              <form className={classes.form} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                    subheader="" title= {isAddMode?"Add Region":"Edit Region : "+props.region.code}/>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={6} >
                        <TextField fullWidth label="Code *" variant="outlined"
                            placeholder='Enter Code'{...register("code")}
                            size="small"
                            helperText={errors.code?.message}
                            error={errors.code?true :false}/>
                      </Grid>
                      <Grid item md={6} xs={6} >
                          <TextField fullWidth label="Name *" variant="outlined" defaultValue=''
                              placeholder='Enter Name' autoFocus
                              {...register("name")}
                              size="small"
                              helperText={errors.name?.message}
                              error={errors.name?true :false}/>
                      </Grid>
                      <Grid item md={12} xs={12} >
                          <TextField fullWidth label="Description *" variant="outlined" 
                              placeholder='Enter Description' 
                             {...register("description")}
                             size="small"
                             helperText={errors.description?.message}
                             error={errors.description?true :false}
                            />
                      </Grid>
                      <Grid item md={12} xs={12}> </Grid>
                     </Grid>
                    <Divider/>
                    <Grid container item md={12} xs={12}  justifyContent='flex-end' style={{marginTop:10}}>  
                        <LoadingButton  variant="contained" onClick={_cancel} color="warning" style={{ marginRight: 20 }} loadingPosition="start" startIcon={<CancelIcon />}>
                                Cancel
                        </LoadingButton>
                          <LoadingButton  type="submit" variant="contained" color="success"    loadingPosition="start" startIcon={<SaveIcon />}
                            loading={isloading?true:false}>
                                Save 
                          </LoadingButton>
                      </Grid>
                 </CardContent>
              </Card>
              </form>
        
        </Container>
      </Modal>
    </>
  );
};


const mapStateToProps = (state:any) => {
  return { }
};

  
const mapDispatchToProps = (dispatch:any)=>{
  return {
    createRegionAction: (data:Object,onSuccess:any,onError:any)=> dispatch(C5_CreateRegionAction(data,onSuccess,onError)),
    updateRegionAction: (id:string,data:Object,onSuccess:any,onError:any)=> dispatch(C5_UpdateRegionAction(id,data,onSuccess,onError)),
    getRegionsAction: (onSuccess:any,onError:any)=> dispatch(C5_getRegionsAction(onSuccess,onError))

    
  }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ModalAddRegion);