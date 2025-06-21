import CustomerManager from "../BLL/CustomerManager";
import DALFactory from "@/Factories/DALFactory";
import InternalDebtManager from "../BLL/InternalDebtManager";
import ProductManager from "../BLL/ProductManager";
import HelpersFactory from "./HelpersFactory";
import { PeopleManager } from "@/BLL/PeopleManager";
import ProviderManager from "@/BLL/ProviderManager";

export default class BLLFactory {
  static CustomerManager() {
    return new CustomerManager(
      DALFactory.CustomerDataAccess(),
      HelpersFactory.Mapper()
    );
  }

  static ProductManager() {
    return new ProductManager(
      DALFactory.ProductsDataAccess(),
      DALFactory.ProviderDataAccess(),
      HelpersFactory.Mapper()
    );
  }
  static InternalDebtManager() {
    return new InternalDebtManager(
      DALFactory.InternalDebtsDataAccess(),
      DALFactory.InternalDebtsProductsDataAccess(),
      DALFactory.CustomerDataAccess(),
      HelpersFactory.Mapper()
    );
  }

  static PeopleManager() {
    return new PeopleManager(
      DALFactory.PeopleDataAccess(),
      HelpersFactory.Mapper()
    );
  }

  static ProviderManager() {
    return new ProviderManager(
      DALFactory.ProviderDataAccess(),
      HelpersFactory.Mapper()
    );
  }
}
