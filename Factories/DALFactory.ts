import CustomerDataAccess from "../DAL/CustomersDataAccess";
import InternalDebtsProductsDataAccess from "../DAL/InternalDebtsProductsDataAccess";
import InternalDebtsDataAccess from "../DAL/InternalDebtsDataAccess";
import ProductsDataAccess from "../DAL/ProductsDataAccess";
import { PeopleDataAccess } from "@/DAL/PeopleDataAccess";
import ProviderDataAccess from "@/DAL/ProviderDataAccess";

export default class DALFactory {
  static CustomerDataAccess() {
    return new CustomerDataAccess();
  }

  static ProductsDataAccess() {
    return new ProductsDataAccess();
  }
  static InternalDebtsDataAccess() {
    return new InternalDebtsDataAccess();
  }

  static InternalDebtsProductsDataAccess() {
    return new InternalDebtsProductsDataAccess();
  }

  static ProviderDataAccess() {
    return new ProviderDataAccess();
  }

  static PeopleDataAccess() {
    return new PeopleDataAccess();
  }
}
