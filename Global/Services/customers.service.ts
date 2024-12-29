import AbstractManager from "./AbstractManager";
import Customer from "../Models/Customer";
import SqlBuilder from "../Helpers/SqlBuilder";
import InnerDebt from "../Models/InnerDebt";
import { SQLiteRunResult } from "expo-sqlite";

export default class CustomerManager extends AbstractManager {
  constructor() {
    super();
  }

  async getAllCustomers() {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, "customers");
      const customers = await sqlBuilder.select().executeAsync();
      return customers as Customer[];
    } catch (error) {
      console.log("error ", error);
    }
  }

  async getCustomer(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, "customers");
      const customer = await sqlBuilder.select().where({ id }).firstAsync();
      return customer;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async addCustomer(customer: Customer) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, "customers");
      const result = await sqlBuilder.insert(customer);
      return result;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async updateCustomer(customer: Customer) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, "customers");
      const result = await sqlBuilder
        .update(customer)
        .where({ id: customer.id })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async deleteCustomer(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, "customers");
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async getCustomerDebts(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebt>(this.db, "InnerDebts");
      const result = await sqlBuilder
        .select()
        .where({ customerId: id })
        .executeAsync();
      return result as InnerDebt[];
    } catch (error) {
      console.error("error ", error);
    }
  }
}
