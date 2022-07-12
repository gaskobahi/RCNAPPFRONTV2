import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Chip, Fab, Grid, IconButton } from '@mui/material';
import Tooltip from '@material-ui/core/Tooltip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MyLoadingPinner from '../Loading';
interface MyConfirmExportExcelModalProps {
     title:string,
     children:string,
     open:boolean,
     setOpen:any,
     onConfirm?:any,
     submitExport?:any;
     exportbuttonLoading:boolean
  }
  

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const MyConfirmExportExcelModal = (props:MyConfirmExportExcelModalProps) => {
  const { title, children, open, setOpen,submitExport,exportbuttonLoading} = props;
  return (
    <Dialog
    maxWidth="sm" 
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog"><h5>{title}</h5></DialogTitle>
      <DialogContent style={{alignItems:"center"}}>

                <Grid container spacing={0} >
                  <Grid item xs={12}>
                    <Item>
                           <p><h6 style={{color:"red"}}>Parameters</h6></p>
                          <p style={{color:"blue",fontSize:14}}>{children}</p>
                            {exportbuttonLoading?
                              <MyLoadingPinner/>
                              :
                              <Fab color="success" size='medium'  onClick={submitExport}> 
                                <FileDownloadOutlinedIcon fontSize='large'/>
                            </Fab>
                            }
                    </Item>
                  </Grid>
                </Grid>
      </DialogContent>
     
    </Dialog>
  );
};
export default MyConfirmExportExcelModal;



