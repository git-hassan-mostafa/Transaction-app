import AbstractManager from "./AbstractManager";
import Customer from "../Models/Customer";
import SqlBuilder from "../Global/Helpers/SqlBuilder";
import InnerDebt from "../Models/InnerDebt";
import { SQLiteRunResult } from "expo-sqlite";
import Customer_InnerDebt_InnerDebtItem_Item from "../Models/RelationModels/Customer_InnerDebt_InnerDebtItem_Item";

export default class CustomerManager extends AbstractManager {
  table = "customers";
  constructor() {
    super();
  }

  async getAllCustomers() {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, this.table);
      const customers = await sqlBuilder.select().executeAsync();
      return customers as Customer[];
    } catch (error) {
      console.log("error getAllCustomers", error);
    }
  }

  async getCustomer(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, this.table);
      const customer = await sqlBuilder
        .select()
        .where({ CustomerId: id })
        .firstAsync();
      return customer;
    } catch (error) {
      console.log("error getCustomer", error);
    }
  }

  async addCustomer(customer: Customer) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, this.table);
      const result = await sqlBuilder.insert(customer);
      return result;
    } catch (error) {
      console.log("error addCustomer", error);
    }
  }

  async updateCustomer(customer: Customer) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, this.table);
      const result = await sqlBuilder
        .update(customer)
        .where({ CustomerId: customer.CustomerId })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error updateCustomer", error);
      return null;
    }
  }

  async deleteCustomer(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error deleteCustomer", error);
      return null;
    }
  }

  async getCustomersBorrowList() {
    try {
      const sqlBuilder = new SqlBuilder<Customer_InnerDebt_InnerDebtItem_Item>(
        this.db,
        this.table
      );
      const result = await sqlBuilder
        .select()
        .rightJoin("InnerDebts")
        .rightJoin("InnerDebtItems", "InnerDebts")
        .leftJoin("Items", "InnerDebtItems")
        .executeAsync();
      return result as Customer_InnerDebt_InnerDebtItem_Item[];
    } catch (error) {
      console.error("error ", error);
    }
  }

  async getCustomerBorrowList(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Customer_InnerDebt_InnerDebtItem_Item>(
        this.db,
        this.table
      );
      const result = await sqlBuilder
        .select()
        .rightJoin("InnerDebts")
        .rightJoin("InnerDebtItems", "InnerDebts")
        .leftJoin("Items", "InnerDebtItems")
        .where({ CustomerId: id })
        .executeAsync();
      return result as Customer_InnerDebt_InnerDebtItem_Item[];
    } catch (error) {
      console.error("error ", error);
    }
  }
}
