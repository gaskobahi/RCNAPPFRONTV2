export interface SearchFtransfert{
    startdate?:string;
    enddate?:string;
    value?:string;
}

export interface SearchTdechargment{
    startdate?:string;
    enddate?:string;
    value?:string;
}

export interface SearchRcncontrol{
    startdate?:string;
    enddate?:string;
    value?:string;
}

export interface SearchStack{
    value?:string;
}

export interface SearchSupplier{
    value?:string;
}
export interface SearchSupmanager{
    value?:string;
}


export interface SearchVehiclebrand{
    value?:string;
}

export interface SearchVehicle{
    value?:string;
}

export interface SearchCarrier{
    value?:string;
}


export interface SearchDriver{
    value?:string;
}

export interface SearchTrailer{
    value?:string;
}


export interface SearchYieldinspection{
    date?:string;
    startdate?:string;
    enddate?:string;
    value?:string;
}

export interface SearchProcurement{
    startdate?:string;
    enddate?:string;
    tdechargmentCode?:string;
    ftransfertType?:string;
    ftransfertCode?:string;
    stackCode?:string;
    isConfirmed:string;
}

export interface SummeryProcurement{
    startdate?:string;
    enddate?:string;
}


