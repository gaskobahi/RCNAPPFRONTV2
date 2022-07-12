import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Fab, Grid, IconButton } from '@mui/material';
import Tooltip from '@material-ui/core/Tooltip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface MyConfirmModalProps {
     title:string,
     children:string,
     open:boolean,
     setOpen:any,
     onConfirm?:any,
     buttonLoading:boolean
  }
  

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const MyConfirmModal = (props:MyConfirmModalProps) => {
  const { title, children, open, setOpen, onConfirm ,buttonLoading} = props;
  return (
    <Dialog
    maxWidth="sm" 
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog"><h4>{title}</h4></DialogTitle>
      <DialogContent style={{alignItems:"center"}}>

                <Grid container spacing={0} >
                  <Grid item xs={12}>
                    <Item>
                            <Fab color="error" size='large'> 
                                <HighlightOffIcon fontSize='large'/>
                            </Fab>
                       <h1>Are you sure ?</h1> <br/>
                       <p style={{color:"red" ,fontSize:20}}>{children}</p>

                    </Item>
                  </Grid>
                </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          No
        </Button>
          <LoadingButton
              loading={buttonLoading}
              loadingPosition="start"
              startIcon={<ConfirmationNumberIcon />}
              variant="contained"
              onClick={() => {
                onConfirm();
              }}
              color='success'
          >
            Yes
          </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
export default MyConfirmModal;



