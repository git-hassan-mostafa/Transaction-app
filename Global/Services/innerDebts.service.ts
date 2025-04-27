import AbstractManager from "./AbstractManager";
import SqlBuilder from "../Helpers/SqlBuilder";
import { SQLiteRunResult } from "expo-sqlite";
import InnerDebt from "../Models/InnerDebt";
import Customer from "../Models/Customer";
import { CustomerInnerDebt } from "../Models/RelationModels/CustomerInnerDebt";

export default class InnerDebtsManager extends AbstractManager {
  table = "InnerDebts";
  constructor() {
    super();
  }

  async getAllInnerDebts() {
    try {
      const sqlBuilder = new SqlBuilder<CustomerInnerDebt>(this.db, this.table);
      const innerDebts = await sqlBuilder
        .select()
        .join("Customers")
        .executeAsync();
      return innerDebts as CustomerInnerDebt[];
    } catch (error) {
      console.log("error ", error);
    }
  }

  async getInnerDebt(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebt>(this.db, this.table);
      const innerDebt = await sqlBuilder
        .select()
        .where({ InnerDebtId: id })
        .firstAsync();
      return innerDebt;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async addInnerDebt(innerDebt: InnerDebt) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebt>(this.db, this.table);
      const result = await sqlBuilder.insert(innerDebt);
      return result;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async updateInnerDebt(innerDebt: InnerDebt) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebt>(this.db, this.table);
      const result = await sqlBuilder
        .update(innerDebt)
        .where({ InnerDebtId: innerDebt.InnerDebtId })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async updateInnerDebtCustomer(id: number, customerId: number) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebt>(this.db, this.table);
      const result = await sqlBuilder
        .updateField("CustomerId", customerId)
        .where({ InnerDebtId: id })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async deleteInnerDebt(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebt>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error ", error);
    }
  }
}
