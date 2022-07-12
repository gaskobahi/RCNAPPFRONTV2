export enum UserAction{
    Create="create",
    Read="read",
    Update="update",
    Delete="delete",
    Confirm="Confirm",
    ResetPassword="resetpaswword",
    SettingsUser="SettingsUser",
    ExportFile="ExportUser",
    ReadStatistic="ExportUser",


  }
  

  export enum EntityUSERMODAbilty{
    USERS="users",
    OPERATORS="operators",
    ROLES="roles",
    DEPARTMENTS="departments",

    REGIONS="regions",
    PLACES="places",

    STACKS='stacks',
    SUPPLIERS='suppliers',
    FTRANSFERTS='ftransferts',
    TDECHARGMENTS='tdechargments',
    RCNCONTROLS='rcncontrols',
    YIELDINSPECTIONS='yieldinspections',
    PROCUREMENTS='procurements',
    SUPMANAGERS='supmanagers',
    VEHICLEBRANDS='vehiclebrands',
    VEHICLES='vehicles',
    CARRIERS="carriers",
    DRIVERS="drivers",
    TRAILERS="trailers",

    ///////MODULE ACCESS FOR SIDEBAR
    MOD_PROCUREMENTS='mod_procurements',
    MOD_RCNCONTROLS='mod_rcncontrols',
    MOD_LOCATIONS='mod_locations',
    MOD_USERS='mod_users',



  }

  export enum USERROLES{
    SUPERADMIN="SUPERADMIN",
    ADMIN="ADMIN",
    GUEST="GUEST",

    ///PRODUCTION-PROCUREMENT
    PRMTADMIN="PRMT-ADMIN",
    PRMTUSER="PRMT-USER",
    PRMTGUEST="PRMT-GUEST",
  }


  