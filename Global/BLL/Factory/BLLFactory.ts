import CustomerService from "../CustomerService";
import DALFactory from "../../DAL/DALFactory";
import HelpersFactory from "../../Helpers/HelpersFactory";

export default class BLLFactory {
  static CustomerService() {
    return new CustomerService(
      DALFactory.CustomerManager(),
      HelpersFactory.Mapper()
    );
  }
}
