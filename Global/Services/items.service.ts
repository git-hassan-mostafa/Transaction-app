import AbstractManager from "./AbstractManager";
import SqlBuilder from "../Helpers/SqlBuilder";
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
      console.log("error ", error);
    }
  }

  async getItem(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const item = await sqlBuilder.select().where({ id }).firstAsync();
      return item;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async addItem(item: Item) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const result = await sqlBuilder.insert(item);
      return result;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async updateItem(item: Item) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const result = await sqlBuilder
        .update(item)
        .where({ id: item.id })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async updateProviderId(id: number, providerId: number) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const result = await sqlBuilder
        .updateField("ProviderId", providerId)
        .where({ id: id })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error ", error);
    }
  }

  async deleteItem(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Item>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error ", error);
    }
  }
}
