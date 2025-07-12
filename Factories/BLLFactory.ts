import CustomerManager from "../Pages/Customers/Services/CustomerManager";
import DALFactory from "@/Factories/DALFactory";
import InternalDebtManager from "../Pages/InternalDebts/Services/InternalDebtManager";
import ProductManager from "../Pages/Products/Services/ProductManager";
import HelpersFactory from "./HelpersFactory";
import { PeopleManager } from "@/Pages/People/Services/PeopleManager";
import ProviderManager from "@/Pages/Providers/Services/ProviderManager";

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
