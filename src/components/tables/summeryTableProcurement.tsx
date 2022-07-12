import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { NotFound } from '../../Helpers/custom';

interface Column {
  id: 'stack' | 'nbBags' | 'qte' | 'stdBags' | 'moisture'|'nc'|'kor'|'area';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'stack', label: 'Stack' },
  { id: 'nbBags', label: 'Nb Of Bags', align: 'right' },
  { id: 'qte', label: 'Quantity (Kgs)', align: 'right', format: (value: number) => value.toLocaleString('fr-FR'),  },
  {id: 'stdBags', label: 'Standard Bags',  align: 'right', format: (value: number) => value.toFixed(1), },
  {id: 'moisture',label: 'Moisture %', align: 'right',format: (value: number) => value.toFixed(0),},
  {id: 'nc',label: 'Nut Count', align: 'right',format: (value: number) => value.toFixed(0),},
  {id: 'kor',label: 'KOR (LBS)', align: 'right',format: (value: number) => value.toFixed(2),},
  {id: 'area',label: 'Area', align: 'right',},
  
  
  
];


interface SummeryTableProcurementProps {
  summeryprocurements:any;
}
export default function SummeryTableProcurement(props:SummeryTableProcurementProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let rows:any=[];
  rows=props?.summeryprocurements;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const TnbOfbags  =rows?.reduce((accumulator:any, object:any) => {
    return accumulator + object.nbBags;}, 0).toFixed(0);

  const Tqte  = rows?.reduce((accumulator:any, object:any) => {
      return accumulator + object.qte;}, 0).toFixed(2);
    
  const TstdBags  = rows?.reduce((accumulator:any, object:any) => {
    return accumulator + object.stdBags;}, 0).toFixed(1);  
  
  const Tmoisture  = rows?.reduce((accumulator:any, object:any) => {
    return accumulator + (object.qte*object.moisture)/Tqte;}, 0).toFixed(0);  

  const Tnc  =rows?.reduce((accumulator:any, object:any) => {
    return accumulator + (object.qte*object.nc)/Tqte;}, 0).toFixed(0);  
  
  const Tkor =rows?.reduce((accumulator:any, object:any) => {
    return accumulator + (object.qte*object.kor)/Tqte;}, 0).toFixed(2); 

  return (
    <Paper sx={{ width: '100%'}}>
    {
      rows.length>0?
          <>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" colSpan={8}>
                      Summery
                      </TableCell>
                      
                    </TableRow>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 57, minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                    
                  </TableHead>
              
                    <TableBody>
                      {rows && rows 
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row:any) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                  
                                );
                              })}
                            </TableRow>
                          
                            
                          
                          );
                        })}
                        <TableRow>
                            <TableCell align="left" >
                               <b>Total</b>
                            </TableCell>
                            <TableCell align="right">
                               <b>{TnbOfbags}</b>
                            </TableCell>
                            <TableCell align="right">
                               <b>{Tqte}</b>
                            </TableCell>
                            <TableCell align="right">
                              <b>{TstdBags}</b>
                            </TableCell>
                            <TableCell align="right">
                               <b>{Tmoisture}</b>
                            </TableCell>
                            <TableCell align="right">
                               <b>{Tnc}</b>
                            </TableCell>
                            <TableCell align="right">
                               <b>{Tkor}</b>
                            </TableCell>
                      </TableRow>
                    </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </>
        :
        <NotFound/>
      }
    </Paper>
  );
}
