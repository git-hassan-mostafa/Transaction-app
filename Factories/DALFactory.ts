import CustomerDataAccess from "../DataBase/DAL/CustomersDataAccess";
import InternalDebtsProductsDataAccess from "../DataBase/DAL/InternalDebtsProductsDataAccess";
import InternalDebtsDataAccess from "../DataBase/DAL/InternalDebtsDataAccess";
import ProductsDataAccess from "../DataBase/DAL/ProductsDataAccess";
import { PeopleDataAccess } from "@/DataBase/DAL/PeopleDataAccess";
import ProviderDataAccess from "@/DataBase/DAL/ProviderDataAccess";

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
