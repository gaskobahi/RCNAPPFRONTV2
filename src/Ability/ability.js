import { AbilityBuilder } from "@casl/ability";
import {EntityUSERMODAbilty,UserAction, USERROLES} from './Actions'

 export const   defineRulesFor=(role)=> {
 
  const { can,cannot, rules } = new AbilityBuilder();
  switch (role && role.name) {
    case USERROLES.SUPERADMIN:
      can("manage", "all");
     // cannot(UserAction.Create,EntityUSERMODAbilty.PROCUREMENTS)
      break;

    case USERROLES.ADMIN:
      can("manage", "all");
    

      cannot(UserAction.Update,EntityUSERMODAbilty.USERS);
      cannot(UserAction.Create,EntityUSERMODAbilty.USERS);
      cannot(UserAction.Delete,EntityUSERMODAbilty.USERS);

      cannot(UserAction.Delete,EntityUSERMODAbilty.ROLES);
      cannot(UserAction.Update,EntityUSERMODAbilty.ROLES);
      cannot(UserAction.Create,EntityUSERMODAbilty.ROLES);

     

      //cannot(UserAction.Delete,EntityUSERMODAbilty.OPERATORS);

     // can(UserAction.Create,EntityUSERMODAbilty.DEPARTMENTS)
      //can(UserAction.Delete,EntityUSERMODAbilty.DEPARTMENTS);

      //Procurement
     // can(UserAction.Read,EntityUSERMODAbilty.MOD_PROCUREMENTS);
      //can(UserAction.Read,EntityUSERMODAbilty.PROCUREMENTS);

      can(UserAction.Update,EntityUSERMODAbilty.PROCUREMENTS)
      can(UserAction.Confirm,EntityUSERMODAbilty.PROCUREMENTS)
      can(UserAction.Delete,EntityUSERMODAbilty.PROCUREMENTS);

      cannot(UserAction.Delete,EntityUSERMODAbilty.REGIONS);
      cannot(UserAction.Create,EntityUSERMODAbilty.REGIONS)

      cannot(UserAction.Create,EntityUSERMODAbilty.PLACES)
      cannot(UserAction.Delete,EntityUSERMODAbilty.PLACES)

     // cannot(UserAction.Read,EntityUSERMODAbilty.MOD_PROCUREMENTS)

     // can(UserAction.Delete,EntityUSERMODAbilty.PROCUREMENTS)

     //cannot(UserAction.Read,EntityUSERMODAbilty.RCNCONTROLS)
     //cannot(UserAction.Read,EntityUSERMODAbilty.YIELDINSPECTIONS)
     //cannot(UserAction.Read,EntityUSERMODAbilty.TDECHARGMENTS)
    // cannot(UserAction.Read,EntityUSERMODAbilty.FTRANSFERTS)

      cannot("manage",EntityUSERMODAbilty.FTRANSFERTS );
      cannot("manage",EntityUSERMODAbilty.TDECHARGMENTS );
      cannot("manage",EntityUSERMODAbilty.RCNCONTROLS );
      cannot("manage",EntityUSERMODAbilty.YIELDINSPECTIONS );
      cannot("manage",EntityUSERMODAbilty.PROCUREMENTS );

      can(UserAction.Read,EntityUSERMODAbilty.FTRANSFERTS );
      can(UserAction.Read,EntityUSERMODAbilty.TDECHARGMENTS );
      can(UserAction.Read,EntityUSERMODAbilty.RCNCONTROLS );
      can(UserAction.Read,EntityUSERMODAbilty.YIELDINSPECTIONS );
      can(UserAction.Read,EntityUSERMODAbilty.PROCUREMENTS );

      
      break;
    case USERROLES.GUEST:
      can(UserAction.Read,'all');
      can(UserAction.ReadStatistic,EntityUSERMODAbilty.PROCUREMENTS);

      break;

    case USERROLES.PRMTADMIN:
      can(UserAction.Read,EntityUSERMODAbilty.MOD_PROCUREMENTS);
      can("manage",EntityUSERMODAbilty.PROCUREMENTS);
      can("manage",EntityUSERMODAbilty.RCNCONTROLS);
      can("manage",EntityUSERMODAbilty.YIELDINSPECTIONS);
      can("manage",EntityUSERMODAbilty.TDECHARGMENTS);
      can("manage",EntityUSERMODAbilty.FTRANSFERTS);
      can("manage",EntityUSERMODAbilty.STACKS);
      can("manage",EntityUSERMODAbilty.SUPPLIERS);



      cannot("manage",EntityUSERMODAbilty.USERS);
      cannot("manage",EntityUSERMODAbilty.DEPARTMENTS);
      cannot("manage",EntityUSERMODAbilty.ROLES);
      cannot("manage",EntityUSERMODAbilty.OPERATORS);


      break;

    case USERROLES.PRMTUSER:
      can(UserAction.Read,EntityUSERMODAbilty.MOD_PROCUREMENTS);
      can("manage",EntityUSERMODAbilty.PROCUREMENTS);
      can("manage",EntityUSERMODAbilty.RCNCONTROLS);
      can("manage",EntityUSERMODAbilty.YIELDINSPECTIONS);
      can("manage",EntityUSERMODAbilty.TDECHARGMENTS);
      can("manage",EntityUSERMODAbilty.FTRANSFERTS);
      can(UserAction.Read,EntityUSERMODAbilty.STACKS);
      can("manage",EntityUSERMODAbilty.SUPPLIERS);
      can("manage",EntityUSERMODAbilty.COOPERATIVES);
      cannot(UserAction.Confirm,EntityUSERMODAbilty.PROCUREMENTS);
      cannot(UserAction.ReadStatistic,EntityUSERMODAbilty.PROCUREMENTS);
      cannot(UserAction.ExportFile,EntityUSERMODAbilty.PROCUREMENTS);

      cannot("manage",EntityUSERMODAbilty.USERS);
      cannot("manage",EntityUSERMODAbilty.DEPARTMENTS);
      cannot("manage",EntityUSERMODAbilty.ROLES);
      cannot("manage",EntityUSERMODAbilty.OPERATORS);

      cannot("manage",EntityUSERMODAbilty.PLACES);
      can(UserAction.Read,EntityUSERMODAbilty.PLACES);

      cannot("manage",EntityUSERMODAbilty.REGIONS);
      can(UserAction.Read,EntityUSERMODAbilty.REGIONS);
      
      break;

      case USERROLES.PRMTGUEST:
        can(UserAction.Read,EntityUSERMODAbilty.MOD_PROCUREMENTS);
        can(UserAction.Read,EntityUSERMODAbilty.MOD_LOCATIONS);

        can(UserAction.Read,EntityUSERMODAbilty.PROCUREMENTS);
        can(UserAction.Read,EntityUSERMODAbilty.RCNCONTROLS);
        can(UserAction.Read,EntityUSERMODAbilty.YIELDINSPECTIONS);
        can(UserAction.Read,EntityUSERMODAbilty.TDECHARGMENTS);
        can(UserAction.Read,EntityUSERMODAbilty.FTRANSFERTS);
        can(UserAction.Read,EntityUSERMODAbilty.STACKS);
        can(UserAction.Read,EntityUSERMODAbilty.SUPPLIERS);

        cannot(UserAction.Confirm,EntityUSERMODAbilty.PROCUREMENTS);
        cannot(UserAction.ReadStatistic,EntityUSERMODAbilty.PROCUREMENTS);
        cannot(UserAction.ExportFile,EntityUSERMODAbilty.PROCUREMENTS);

        cannot("manage",EntityUSERMODAbilty.USERS);
        cannot("manage",EntityUSERMODAbilty.DEPARTMENTS);
        cannot("manage",EntityUSERMODAbilty.ROLES);
        cannot("manage",EntityUSERMODAbilty.OPERATORS);
  
        can(UserAction.Read,EntityUSERMODAbilty.VEHICLEBRANDS);
        can(UserAction.Read,EntityUSERMODAbilty.CARRIERS);
        can(UserAction.Read,EntityUSERMODAbilty.DRIVERS);
        can(UserAction.Read,EntityUSERMODAbilty.TRAILERS);
        can(UserAction.Read,EntityUSERMODAbilty.VEHICLES);



        can(UserAction.Read,EntityUSERMODAbilty.PLACES);
        can(UserAction.Read,EntityUSERMODAbilty.REGIONS);
        break;
      
      
    default:
      cannot('manage','all');
  }

  return rules;
}
export default defineRulesFor;
