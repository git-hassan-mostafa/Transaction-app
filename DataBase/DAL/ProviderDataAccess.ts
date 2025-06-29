import AbstractDataAccess from "./AbstractDataAccess";
import SqlBuilder from "../Helpers/SqlBuilder";
import { SQLiteRunResult } from "expo-sqlite";
import Provider from "../Models/Provider";
import { TableEnum } from "../Enums/TablesEnum";

export default class ProviderDataAccess extends AbstractDataAccess {
  table = TableEnum.Providers;
  constructor() {
    super();
  }

  async getAllProviders() {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const providers = await sqlBuilder.select().executeAsync();
      return providers as Provider[];
    } catch (error) {
      console.error("error getAllProviders ", error);
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
      console.error("error getProvider ", error);
      return null;
    }
  }

  async addProvider(provider: Provider) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const result = await sqlBuilder.insert(provider);
      return result;
    } catch (error) {
      console.error("error addProvider ", error);
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
      console.error("error updateProvider ", error);
      return null;
    }
  }

  async deleteProvider(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Provider>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.error("error deleteProvider ", error);
      return null;
    }
  }
}
