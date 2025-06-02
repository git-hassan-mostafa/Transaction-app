import CustomerDataAccess from "../DAL/CustomersDataAccess";
import InternalDebtsItemsDataAccess from "../DAL/InternalDebtsItemsDataAccess";
import InternalDebtsDataAccess from "../DAL/InternalDebtsDataAccess";
import ItemsDataAccess from "../DAL/ItemsDataAccess";
import { PeopleDataAccess } from "@/DAL/PeopleDataAccess";
import ProviderDataAccess from "@/DAL/ProviderDataAccess";

export default class DALFactory {
  static CustomerDataAccess() {
    return new CustomerDataAccess();
  }

  static ItemsDataAccess() {
    return new ItemsDataAccess();
  }
  static InternalDebtsDataAccess() {
    return new InternalDebtsDataAccess();
  }

  static InternalDebtsItemsDataAccess() {
    return new InternalDebtsItemsDataAccess();
  }

  static ProviderDataAccess() {
    return new ProviderDataAccess();
  }

  static PeopleDataAccess() {
    return new PeopleDataAccess();
  }
}
