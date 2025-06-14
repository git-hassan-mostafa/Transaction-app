import AbstractDataAccess from "./AbstractDataAccess";
import SqlBuilder from "../Global/Helpers/SqlBuilder";
import { SQLiteRunResult } from "expo-sqlite";
import Provider from "../Models/Provider";

export default class ProviderDataAccess extends AbstractDataAccess {
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
      return null;
    }
  }

  async getProvider(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const provider = await sqlBuilder
        .select()
        .where({ ProviderId: id })
        .firstAsync();
      return provider;
    } catch (error) {
      console.log("error getProvider ", error);
      return null;
    }
  }

  async addProvider(provider: Provider) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const result = await sqlBuilder.insert(provider);
      return result;
    } catch (error) {
      console.log("error addProvider ", error);
      return null;
    }
  }

  async updateProvider(provider: Provider) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const result = await sqlBuilder
        .update(provider)
        .where({ ProviderId: provider.ProviderId })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error updateProvider ", error);
      return null;
    }
  }

  async deleteProvider(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error deleteProvider ", error);
      return null;
    }
  }
}
