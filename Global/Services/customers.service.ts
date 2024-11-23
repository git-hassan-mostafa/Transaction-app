import AbstractManager from "./AbstractManager";
import Customer from "../Models/Customer";

export default class CustomerManager extends AbstractManager {
  constructor() {
    super();
  }

  async getAllCustomers() {
    const customers = await this.db.getAllAsync<Customer>(
      "select * from customers"
    );
    return customers;
  }
}
