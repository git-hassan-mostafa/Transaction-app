import AbstractManager from "./AbstractManager";
import SqlBuilder from "../Global/Helpers/SqlBuilder";
import { SQLiteRunResult } from "expo-sqlite";
import Item from "../Models/Item";

export default class ItemManager extends AbstractManager {
  table = "Items";
  constructor() {
    super();
  }

  async getAllItems() {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const items = await sqlBuilder.select().executeAsync();
      return items as Item[];
    } catch (error) {
      console.log("error getAllItems", error);
    }
  }

  async getItem(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const item = await sqlBuilder.select().where({ ItemId: id }).firstAsync();
      return item;
    } catch (error) {
      console.log("error getItem", error);
    }
  }

  async addItem(item: Item) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const result = await sqlBuilder.insert(item);
      return result;
    } catch (error) {
      console.log("error addItem", error);
    }
  }

  async updateItem(item: Item) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const result = await sqlBuilder
        .update(item)
        .where({ ItemId: item.ItemId })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error updateItem", error);
    }
  }

  async updateProviderId(id: number, providerId: number) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const result = await sqlBuilder
        .updateField("Item_ProviderId", providerId)
        .where({ ItemId: id })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error updateProviderId", error);
    }
  }

  async deleteItem(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error deleteItem", error);
    }
  }
}
