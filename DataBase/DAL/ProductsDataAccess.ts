import AbstractDataAccess from "./AbstractDataAccess";
import SqlBuilder from "../Helpers/SqlBuilder";
import { SQLiteRunResult } from "expo-sqlite";
import Product from "../Models/Product";
import Product_InternalDebtProduct from "@/DataBase/Models/RelationModels/Product_InternalDebtProduct";
import {
  ForeignKeysEnum,
  PrimaryKeysEnum,
  TableEnum,
} from "../Enums/TablesEnum";

export default class ProductsDataAccess extends AbstractDataAccess {
  table = TableEnum.Products;
  constructor() {
    super();
  }

  async getAllProducts() {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const products = await sqlBuilder.select().executeAsync();
      return products as Product[];
    } catch (error) {
      console.error("error getAllProducts", error);
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
      console.error("error getProduct", error);
      return null;
    }
  }

  async addProduct(product: Product) {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const result = await sqlBuilder.insert(product);
      return result;
    } catch (error) {
      console.error("error addProduct", error);
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
      console.error("error updateProduct", error);
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
      console.error("error updateProviderId", error);
    }
  }

  async deleteProduct(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Product>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.error("error deleteProduct", error);
      return null;
    }
  }

  async isProductUsed(id: number): Promise<boolean> {
    try {
      const sqlBuilder = new SqlBuilder<Product_InternalDebtProduct>(
        this.db,
        this.table
      );
      const products = await sqlBuilder
        .select(["ProductId, InternalDebtProductId"])
        .rightJoin(
          [this.table, TableEnum.InternalDebtProducts],
          [
            PrimaryKeysEnum.ProductId,
            ForeignKeysEnum.InternalDebtProduct_ProductId,
          ]
        )
        .where({ ProductId: id })
        .firstAsync();
      return (products as Product_InternalDebtProduct) !== null;
    } catch (error) {
      console.error("error isProductUsed", error);
      return false;
    }
  }
}
