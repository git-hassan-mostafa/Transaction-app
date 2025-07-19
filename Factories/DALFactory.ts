import CustomerDataAccess from "../DataBase/DAL/CustomersDataAccess";
import InternalDebtsProductsDataAccess from "../DataBase/DAL/InternalDebtsProductsDataAccess";
import InternalDebtsDataAccess from "../DataBase/DAL/InternalDebtsDataAccess";
import ProductsDataAccess from "../DataBase/DAL/ProductsDataAccess";
import { PeopleDataAccess } from "@/DataBase/DAL/PeopleDataAccess";
import ProviderDataAccess from "@/DataBase/DAL/ProviderDataAccess";
import InternalDebtsPaymentsDataAccess from "@/DataBase/DAL/InternalDebtsPaymentsDataAccess";

export default class DALFactory {
  static CreateCustomerDataAccess() {
    return new CustomerDataAccess();
  }

  static CreateProductsDataAccess() {
    return new ProductsDataAccess();
  }
  static CreateInternalDebtsDataAccess() {
    return new InternalDebtsDataAccess();
  }

  static CreateInternalDebtsProductsDataAccess() {
    return new InternalDebtsProductsDataAccess();
  }

  static CreateInternalDebtsPaymentsDataAccess() {
    return new InternalDebtsPaymentsDataAccess();
  }

  static CreateProviderDataAccess() {
    return new ProviderDataAccess();
  }

  static CreatePeopleDataAccess() {
    return new PeopleDataAccess();
  }
}
