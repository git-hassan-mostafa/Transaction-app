import AbstractManager from "./AbstractManager";
import Customer from "../Models/Customer";
import SqlBuilder from "../Helpers/SqlBuilder";

export default class CustomerManager extends AbstractManager {
  constructor() {
    super();
  }

  async getAllCustomers() {
    const sqlBuilder = new SqlBuilder<Customer>(this.db, "customers");
    const customers = await sqlBuilder.select().executeAsync();
    return customers;
  }

  async addCustomer(customer: Customer) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, "customers");
      sqlBuilder.insert(customer);
    } catch (error) {
      console.error("error ", error);
    }
  }
}
