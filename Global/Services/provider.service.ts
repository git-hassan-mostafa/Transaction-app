import AbstractManager from "./AbstractManager";
import SqlBuilder from "../Helpers/SqlBuilder";
import InnerDebt from "../Models/InnerDebt";
import { SQLiteRunResult } from "expo-sqlite";
import Provider from "../Models/Provider";
import { OuterDebt } from "../Models/OuterDebt";

export default class ProviderManager extends AbstractManager {
  table = "providers";
  constructor() {
    super();
  }

  async getAllProviders() {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const providers = await sqlBuilder.select().executeAsync();
      return providers as Provider[];
    } catch (error) {
      console.log("error getAllProviders ", error);
    }
  }

  async getProvider(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const provider = await sqlBuilder.select().where({ Id: id }).firstAsync();
      return provider;
    } catch (error) {
      console.log("error getProvider ", error);
    }
  }

  async addProvider(provider: Provider) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const result = await sqlBuilder.insert(provider);
      return result;
    } catch (error) {
      console.log("error addProvider ", error);
    }
  }

  async updateProvider(provider: Provider) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const result = await sqlBuilder
        .update(provider)
        .where({ Id: provider.Id })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error updateProvider ", error);
    }
  }

  async deleteProvider(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error deleteProvider ", error);
    }
  }

  async getProviderDebts(id: number) {
    try {
      var OuterDebtsTable = "outerDebts";
      const sqlBuilder = new SqlBuilder<OuterDebt>(this.db, OuterDebtsTable);
      const result = await sqlBuilder
        .select()
        .where({ ProviderId: id })
        .executeAsync();
      return result as InnerDebt[];
    } catch (error) {
      console.error("error getProviderDebts ", error);
    }
  }
}
