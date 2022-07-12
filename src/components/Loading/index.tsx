import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';




const  MyLoadingPinner=()=> {
  return (
    <Box sx={{ display: 'flex' }}
      height={80} 
      alignItems="center"
      justifyContent="center">
           <CircularProgress />
    </Box>
  );
}

export default MyLoadingPinner;
