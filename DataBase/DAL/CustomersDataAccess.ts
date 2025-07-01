import AbstractDataAccess from "./AbstractDataAccess";
import Customer from "../Models/Customer";
import SqlBuilder from "../Helpers/SqlBuilder";
import { SQLiteRunResult } from "expo-sqlite";
import Customer_InternalDebt_InternalDebtProduct_Product from "../Models/RelationModels/Customer_InternalDebt_InternalDebtProduct_Product";
import {
  ForeignKeysEnum,
  PrimaryKeysEnum,
  TableEnum,
} from "../Enums/TablesEnum";

export default class CustomerDataAccess extends AbstractDataAccess {
  table = TableEnum.Customers;
  constructor() {
    super();
  }

  async getAllCustomers() {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, this.table);
      const customers = await sqlBuilder.select().executeAsync();
      return customers as Customer[];
    } catch (error) {
      console.error("error getAllCustomers", error);
      return null;
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
      console.error("error getCustomer", error);
      return null;
    }
  }

  async addCustomer(customer: Customer) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, this.table);
      const result = await sqlBuilder.insert(customer);
      return result;
    } catch (error) {
      console.error("error addCustomer", error);
      return null;
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
      console.error("error updateCustomer", error);
      return null;
    }
  }

  async deleteCustomer(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Customer>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.error("error deleteCustomer", error);
      return null;
    }
  }

  async getAllCustomersWithBorrowed() {
    try {
      const sqlBuilder =
        new SqlBuilder<Customer_InternalDebt_InternalDebtProduct_Product>(
          this.db,
          this.table
        );
      const result = await sqlBuilder
        .select()
        .leftJoin(
          [this.table, TableEnum.InternalDebts],
          [PrimaryKeysEnum.CustomerId, ForeignKeysEnum.InternalDebt_CustomerId]
        )
        .leftJoin(
          [TableEnum.InternalDebts, TableEnum.InternalDebtProducts],
          [
            PrimaryKeysEnum.InternalDebtId,
            ForeignKeysEnum.InternalDebtProduct_InternalDebtId,
          ]
        )
        .leftJoin(
          [TableEnum.InternalDebtProducts, TableEnum.Products],
          [
            ForeignKeysEnum.InternalDebtProduct_ProductId,
            PrimaryKeysEnum.ProductId,
          ]
        )
        .executeAsync();
      return result as Customer_InternalDebt_InternalDebtProduct_Product[];
    } catch (error) {
      console.error("error getAllCustomersWithBorrowed", error);
      return null;
    }
  }

  async getAllCustomersBorrowList() {
    try {
      const sqlBuilder =
        new SqlBuilder<Customer_InternalDebt_InternalDebtProduct_Product>(
          this.db,
          this.table
        );
      const result = await sqlBuilder
        .select()
        .rightJoin(
          [this.table, TableEnum.InternalDebts],
          [PrimaryKeysEnum.CustomerId, ForeignKeysEnum.InternalDebt_CustomerId]
        )
        .rightJoin(
          [TableEnum.InternalDebts, TableEnum.InternalDebtProducts],
          [
            PrimaryKeysEnum.InternalDebtId,
            ForeignKeysEnum.InternalDebtProduct_InternalDebtId,
          ]
        )
        .leftJoin(
          [TableEnum.InternalDebtProducts, TableEnum.Products],
          [
            ForeignKeysEnum.InternalDebtProduct_ProductId,
            PrimaryKeysEnum.ProductId,
          ]
        )
        .executeAsync();
      return result as Customer_InternalDebt_InternalDebtProduct_Product[];
    } catch (error) {
      console.error("error getAllCustomersBorrowList", error);
    }
  }

  async getCustomerBorrowList(id: number) {
    try {
      const sqlBuilder =
        new SqlBuilder<Customer_InternalDebt_InternalDebtProduct_Product>(
          this.db,
          this.table
        );
      const result = await sqlBuilder
        .select()
        .rightJoin(
          [this.table, TableEnum.InternalDebts],
          [PrimaryKeysEnum.CustomerId, ForeignKeysEnum.InternalDebt_CustomerId]
        )
        .rightJoin(
          [TableEnum.InternalDebts, TableEnum.InternalDebtProducts],
          [
            PrimaryKeysEnum.InternalDebtId,
            ForeignKeysEnum.InternalDebtProduct_InternalDebtId,
          ]
        )
        .leftJoin(
          [TableEnum.InternalDebtProducts, TableEnum.Products],
          [
            ForeignKeysEnum.InternalDebtProduct_ProductId,
            PrimaryKeysEnum.ProductId,
          ]
        )
        .where({ CustomerId: id })
        .executeAsync();
      return result as Customer_InternalDebt_InternalDebtProduct_Product[];
    } catch (error) {
      console.error("error getCustomerBorrowList", error);
    }
  }
}
