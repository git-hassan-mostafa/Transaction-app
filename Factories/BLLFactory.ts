import CustomerManager from "../BLL/CustomerManager";
import DALFactory from "@/Factories/DALFactory";
import InternalDebtManager from "../BLL/InternalDebtManager";
import ItemManager from "../BLL/ItemManager";
import HelpersFactory from "./HelpersFactory";

export default class BLLFactory {
  static CustomerManager() {
    return new CustomerManager(
      DALFactory.CustomerDataAccess(),
      HelpersFactory.Mapper()
    );
  }

  static ItemManager() {
    return new ItemManager(
      DALFactory.ItemsDataAccess(),
      HelpersFactory.Mapper()
    );
  }
  static InternalDebtManager() {
    return new InternalDebtManager(
      DALFactory.InternalDebtsDataAccess(),
      DALFactory.InternalDebtsItemsDataAccess(),
      DALFactory.CustomerDataAccess(),
      HelpersFactory.Mapper()
    );
  }
}
