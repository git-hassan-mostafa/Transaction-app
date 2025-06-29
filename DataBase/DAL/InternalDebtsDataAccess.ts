import AbstractDataAccess from "./AbstractDataAccess";
import SqlBuilder from "../Helpers/SqlBuilder";
import { SQLiteRunResult } from "expo-sqlite";
import InternalDebt from "../Models/InternalDebt";
import { Customer_InternalDebt } from "../Models/RelationModels/Customer_InternalDebt";
import {
  ForeignKeysEnum,
  PrimaryKeysEnum,
  TableEnum,
} from "../Enums/TablesEnum";

export default class InternalDebtsDataAccess extends AbstractDataAccess {
  table = TableEnum.InternalDebts;
  constructor() {
    super();
  }

  async getAllInternalDebts() {
    try {
      const sqlBuilder = new SqlBuilder<Customer_InternalDebt>(
        this.db,
        this.table
      );
      const internalDebts = await sqlBuilder
        .select()
        .join(
          [this.table, TableEnum.Customers],
          [ForeignKeysEnum.InternalDebt_CustomerId, PrimaryKeysEnum.CustomerId]
        )
        .orderBy(PrimaryKeysEnum.InternalDebtId, "desc")
        .executeAsync();
      return internalDebts as Customer_InternalDebt[];
    } catch (error) {
      console.error("error getAllInternalDebts", error);
      return null;
    }
  }

  async getInternalDebt(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<InternalDebt>(this.db, this.table);
      const internaldebt = await sqlBuilder
        .select()
        .where({ InternalDebtId: id })
        .firstAsync();
      return internaldebt;
    } catch (error) {
      console.error("error getInternalDebt", error);
    }
  }

  async addInternalDebt(internalDebt: InternalDebt) {
    try {
      const sqlBuilder = new SqlBuilder<InternalDebt>(this.db, this.table);
      const result = await sqlBuilder.insert(internalDebt);
      return result;
    } catch (error) {
      console.error("error addInternalDebt", error);
    }
  }

  async updateInternalDebt(internalDebt: InternalDebt) {
    try {
      const sqlBuilder = new SqlBuilder<InternalDebt>(this.db, this.table);
      const result = await sqlBuilder
        .update(internalDebt)
        .where({ InternalDebtId: internalDebt.InternalDebtId })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.error("error updateInternalDebt", error);
    }
  }

  // not used ( to remove )
  async updateInternalDebtCustomer(id: number, customerId: number) {
    try {
      const sqlBuilder = new SqlBuilder<InternalDebt>(this.db, this.table);
      const result = await sqlBuilder
        .updateField("InternalDebt_CustomerId", customerId)
        .where({ InternalDebtId: id })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.error("error updateInternalDebtCustomer", error);
    }
  }

  async deleteInternalDebt(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<InternalDebt>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.error("error deleteInternalDebt", error);
      return null;
    }
  }
}
