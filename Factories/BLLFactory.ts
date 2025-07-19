import CustomerManager from "../Services/CustomerManager";
import DALFactory from "@/Factories/DALFactory";
import InternalDebtManager from "../Services/InternalDebtManager";
import ProductManager from "../Services/ProductManager";
import HelpersFactory from "./HelpersFactory";
import ProviderManager from "@/Services/ProviderManager";
import PeopleManager from "../Services/PeopleManager";

export default class BLLFactory {
  static CustomerManager() {
    return new CustomerManager(
      DALFactory.CreateCustomerDataAccess(),
      HelpersFactory.Mapper()
    );
  }

  static ProductManager() {
    return new ProductManager(
      DALFactory.CreateProductsDataAccess(),
      DALFactory.CreateProviderDataAccess(),
      HelpersFactory.Mapper()
    );
  }
  static InternalDebtManager() {
    return new InternalDebtManager(
      DALFactory.CreateInternalDebtsDataAccess(),
      DALFactory.CreateInternalDebtsProductsDataAccess(),
      DALFactory.CreateInternalDebtsPaymentsDataAccess(),
      HelpersFactory.Mapper()
    );
  }

  static PeopleManager() {
    return new PeopleManager(
      DALFactory.CreatePeopleDataAccess(),
      HelpersFactory.Mapper()
    );
  }

  static ProviderManager() {
    return new ProviderManager(
      DALFactory.CreateProviderDataAccess(),
      HelpersFactory.Mapper()
    );
  }
}
