import AbstractDataAccess from "./AbstractDataAccess";
import SqlBuilder from "../Global/Helpers/SqlBuilder";
import { SQLiteRunResult } from "expo-sqlite";
import Product from "../Models/Product";

export default class ProductsDataAccess extends AbstractDataAccess {
  table = "Products";
  constructor() {
    super();
  }

  async getAllProducts() {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const products = await sqlBuilder.select().executeAsync();
      return products as Product[];
    } catch (error) {
      console.log("error getAllProducts", error);
      return null;
    }
  }

  async getProduct(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const product = await sqlBuilder
        .select()
        .where({ ProductId: id })
        .firstAsync();
      return product;
    } catch (error) {
      console.log("error getProduct", error);
      return null;
    }
  }

  async addProduct(product: Product) {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const result = await sqlBuilder.insert(product);
      return result;
    } catch (error) {
      console.log("error addProduct", error);
      return null;
    }
  }

  async updateProduct(product: Product) {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const result = await sqlBuilder
        .update(product)
        .where({ ProductId: product.ProductId })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error updateProduct", error);
    }
  }

  async updateProviderId(id: number, providerId: number) {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const result = await sqlBuilder
        .updateField("Product_ProviderId", providerId)
        .where({ ProductId: id })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error updateProviderId", error);
    }
  }

  async deleteProduct(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error deleteProduct", error);
    }
  }
}
