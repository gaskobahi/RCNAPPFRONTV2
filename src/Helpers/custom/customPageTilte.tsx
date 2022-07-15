
export const redefineTitle=(title:string)=>{
    let pageTitle:string;
    switch (title) {
        case "Ftransferts":
            pageTitle="File Transferts";
        break;
        case "Tdechargments":
            pageTitle="Ticket Dechargments";
        break;
        case "Yieldinspections":
            pageTitle="Yield Inspections";
        break;
        case "Rcncontrols":
            pageTitle="RCN Controls";
        break;
        case "Procurements":
            pageTitle="Procurements";
        break;
        case "Supmanagers":
            pageTitle="Supplier Managers";
        break;
        case "Vehiclebrands":
            pageTitle="Vehicle Brands";
        break;
        
        
        
         default:pageTitle=title
     }
     return pageTitle
}