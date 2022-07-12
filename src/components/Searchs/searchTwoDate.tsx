import {  Fab, Grid, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import ImportExportIcon from '@mui/icons-material/ImportExport';

interface EnhancedSearchTwoDateProps {
    searchByStartDate:any;
    searchByEndDate:any;
    resetFilter:any,
    exportToExcel:any
  }
  
 export  const EnhancedSearchTwoDate = (props: EnhancedSearchTwoDateProps) => {
    const classes = useToolbarStyles();
    const {  searchByStartDate, searchByEndDate,resetFilter,exportToExcel} = props;
    const [searchStartdate,setSearchStartdate]=useState("");
    const [searchEnddate,setSearchEnddate]=useState("");
  
    
  
    const _searchStartDate =(e:any) => {
      setSearchStartdate(e.target.value);
      searchByStartDate(e.target.value);
     };
  
    const _searchEndDate =(e:any) => {
      setSearchEnddate(e.target.value);
      searchByEndDate(e.target.value);
     };

     const _ResetFilter =(e:any) => {
        setSearchEnddate('');
        setSearchStartdate('')
        resetFilter()
       };

       const _ExportToExcel =() => {
        exportToExcel()
       };

       
    
    return (
      <Toolbar
        className={classes.root}>
        <Typography className={classes.marginDataTabSearchToolbar}  component="div">
              <Grid container md={12} spacing={2}>
                  <Grid item md={4} xs={4}>
                      <TextField fullWidth autoFocus inputProps={{inputFormat:"YYYY-MM-DDTHH:mm"}} className={classes.textFieldMR} onChange={_searchStartDate} 
                            size='small' type="date" label="startDate" value={searchStartdate} />
                  </Grid>       
                  <Grid item md={4} xs={4}>           
                      <TextField fullWidth  inputProps={{inputFormat:"YYYY-MM-DDTHH:mm"}} className={classes.textFieldMR} onChange={_searchEndDate} 
                            size='small' type="date" label="endDate" value={searchEnddate}/>
                  </Grid> 
                  <Grid item md={2} xs={2}>           
                  <Button  size="small" color="secondary" onClick={_ResetFilter}>
                         Reset Filter
                  </Button>
                  </Grid> 
                  <Grid item md={2} xs={2}>           
                        <Tooltip title="Export To Excel "  aria-label="Export To Excel"  onClick={_ExportToExcel}>
                              <Fab color='inherit' size='small'> 
                                <ImportExportIcon />
                              </Fab>
                          </Tooltip>
                  </Grid> 
            </Grid>
        </Typography>
      </Toolbar>
    );
  };
  
const useToolbarStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  marginTopDataCard: {
    flex: '1 1 100%',
    marginTop:10
  },
  marginTopDataTabToolbar: {
    flex: '1 1 100%',
    marginTop:10,
    marginBottom:10
  },
  marginDataTabSearchToolbar: {
    flex: '1 1 100%',
    marginTop:10,
    marginBottom:20
  },
  
  
  textFieldMR:{
    marginRight: 10,
  }
}),
);