import "./mytable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from 'moment';

const MyProcurementStatList = ({rows}:any) => {
  let titlee= "Latest 7 Procurements "+moment().format("YYYY")


  return (
    <div className="card">
    <div className="card-header border-transparent">
      <h3 className="card-title">{titlee}</h3>

      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-minus"></i>
        </button>
        <button type="button" className="btn btn-tool" data-card-widget="remove">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
      <div className="card-body p-0">
          <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">#</TableCell>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Stack</TableCell>
                <TableCell className="tableCell">File Transfert N°</TableCell>
                <TableCell className="tableCell">Supplier</TableCell>
                <TableCell className="tableCell">Bags</TableCell>
                <TableCell className="tableCell">Net Weight (Kg)</TableCell>
                <TableCell className="tableCell">Cum Bags</TableCell>
                <TableCell className="tableCell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length>0? rows.map((row:any,index:any) => {
                    row.serial= index + 1;
                  row.isConfirmed? row.status="Approved":row.status="Pending"
                return (
                  <TableRow key={row.id}>
                    <TableCell className="tableCell">{row.serial}</TableCell>
                    <TableCell className="tableCell" >
                      {row.date && moment(row.date).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell className="tableCell">{row.stack_code}</TableCell>
                    <TableCell className="tableCell">{row.ftransfertCode+" ("+row.ftransfertType+")"}</TableCell>
                    <TableCell className="tableCell">{row.supplier}</TableCell>
                    <TableCell className="tableCell">{row.bags}</TableCell>
                    <TableCell className="tableCell">{row.recnetwt}</TableCell>
                    <TableCell className="tableCell">{row.cumulbags}</TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${row.status}`}>{row.status}</span>
                    </TableCell>
                  </TableRow>
                )
              }):null}
            </TableBody>
          </Table>
          </TableContainer>
      </div>
    </div>
   
  );
};

export default MyProcurementStatList;
