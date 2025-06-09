import AbstractDataAccess from "./AbstractDataAccess";
import SqlBuilder from "../Global/Helpers/SqlBuilder";
import InnerDebtItem from "../Models/InnerDebtItem";
import InnerDebtItem_InnerDebt_Item from "../Models/RelationModels/InnerDebtItem_InnerDebt_Item";

export default class InternalDebtsItemsDataAccess extends AbstractDataAccess {
  table = "InnerDebtItems";
  constructor() {
    super();
  }

  async getAllInnerDebtItems() {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebtItem_InnerDebt_Item>(
        this.db,
        this.table
      );
      const items = await sqlBuilder
        .select()
        .leftJoin("InnerDebts")
        .leftJoin("Items")
        .executeAsync();
      return items;
    } catch (error) {
      console.log("error getInnerDebtItems", error);
      return null;
    }
  }

  async getInnerDebtItems(innerDebtId: number) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebtItem_InnerDebt_Item>(
        this.db,
        this.table
      );
      const items = await sqlBuilder
        .select()
        .leftJoin("InnerDebts")
        .leftJoin("Items")
        .where({ [`${this.table}.InnerDebtItem_InnerDebtId`]: innerDebtId })
        .executeAsync();
      return items;
    } catch (error) {
      console.log("error getInnerDebtItems", error);
      return null;
    }
  }

  async getAllInnerDebtsItemsList() {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebtItem_InnerDebt_Item>(
        this.db,
        this.table
      );
      const items = await sqlBuilder
        .select()
        .leftJoin("InnerDebts")
        .leftJoin("Items")
        .executeAsync();
      return items;
    } catch (error) {
      console.log("error getAllInnerDebtsItemsList", error);
      return null;
    }
  }

  async addInnerDebtItem(innerDebtItems: Partial<InnerDebtItem>) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebtItem>(this.db, this.table);
      const result = await sqlBuilder.insert(innerDebtItems);
      return result;
    } catch (error) {
      console.log("error addInnerDebtItems", error);
      return null;
    }
  }

  async addInnerDebtItems(innerDebtItems: InnerDebtItem[]) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebtItem>(this.db, this.table);
      const result = await sqlBuilder.insertAll(innerDebtItems);
      return result;
    } catch (error) {
      console.log("error addInnerDebtItems", error);
      return null;
    }
  }

  async deleteInnerDebtItems(innerDebtItemIds: number[]) {
    try {
      const sqlBuilder = new SqlBuilder<InnerDebtItem>(this.db, this.table);
      const result = await sqlBuilder.deleteAll(innerDebtItemIds);
      return result;
    } catch (error) {
      console.log("error deleteInnerDebtItem", error);
      return null;
    }
  }
}
