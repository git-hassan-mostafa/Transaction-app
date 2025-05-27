import CustomerManager from "./customers.service";

export default class DALFactory {
  static CustomerManager() {
    return new CustomerManager();
  }
}
