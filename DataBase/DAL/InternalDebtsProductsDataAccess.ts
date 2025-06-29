import AbstractDataAccess from "./AbstractDataAccess";
import SqlBuilder from "../Helpers/SqlBuilder";
import InternalDebtProduct from "../Models/InternalDebtProduct";
import InternalDebtProduct_InternalDebt_Product from "../Models/RelationModels/InternalDebtProduct_InternalDebt_Product";
import {
  ForeignKeysEnum,
  PrimaryKeysEnum,
  TableEnum,
} from "../Enums/TablesEnum";

export default class InternalDebtsProductsDataAccess extends AbstractDataAccess {
  table = TableEnum.InternalDebtProducts;
  constructor() {
    super();
  }

  async getAllInternalDebtProducts() {
    try {
      const sqlBuilder =
        new SqlBuilder<InternalDebtProduct_InternalDebt_Product>(
          this.db,
          this.table
        );
      const products = await sqlBuilder
        .select()
        .leftJoin(
          [this.table, TableEnum.InternalDebts],
          [
            ForeignKeysEnum.InternalDebtProduct_InternalDebtId,
            PrimaryKeysEnum.InternalDebtId,
          ]
        )
        .leftJoin(
          [this.table, TableEnum.Products],
          [
            ForeignKeysEnum.InternalDebtProduct_ProductId,
            PrimaryKeysEnum.ProductId,
          ]
        )
        .executeAsync();
      return products;
    } catch (error) {
      console.error("error getInternalDebtProducts", error);
      return null;
    }
  }

  async getInternalDebtProducts(internalDebtId: number) {
    try {
      const sqlBuilder =
        new SqlBuilder<InternalDebtProduct_InternalDebt_Product>(
          this.db,
          this.table
        );
      const products = await sqlBuilder
        .select()
        .leftJoin(
          [this.table, TableEnum.InternalDebts],
          [
            ForeignKeysEnum.InternalDebtProduct_InternalDebtId,
            PrimaryKeysEnum.InternalDebtId,
          ]
        )
        .leftJoin(
          [this.table, TableEnum.Products],
          [
            ForeignKeysEnum.InternalDebtProduct_ProductId,
            PrimaryKeysEnum.ProductId,
          ]
        )
        .where({
          [`${this.table}.InternalDebtProduct_InternalDebtId`]: internalDebtId,
        })
        .executeAsync();
      return products;
    } catch (error) {
      console.error("error getInternalDebtProducts", error);
      return null;
    }
  }

  async getAllInternalDebtsProductsList() {
    try {
      const sqlBuilder =
        new SqlBuilder<InternalDebtProduct_InternalDebt_Product>(
          this.db,
          this.table
        );
      const products = await sqlBuilder
        .select()
        .leftJoin(
          [this.table, TableEnum.InternalDebts],
          [
            ForeignKeysEnum.InternalDebtProduct_InternalDebtId,
            PrimaryKeysEnum.InternalDebtId,
          ]
        )
        .leftJoin(
          [this.table, TableEnum.Products],
          [
            ForeignKeysEnum.InternalDebtProduct_ProductId,
            PrimaryKeysEnum.ProductId,
          ]
        )
        .executeAsync();
      return products;
    } catch (error) {
      console.error("error getAllInternalDebtsProductsList", error);
      return null;
    }
  }

  async addInternalDebtProduct(
    internalDebtProducts: Partial<InternalDebtProduct>
  ) {
    try {
      const sqlBuilder = new SqlBuilder<InternalDebtProduct>(
        this.db,
        this.table
      );
      const result = await sqlBuilder.insert(internalDebtProducts);
      return result;
    } catch (error) {
      console.error("error addInternalDebtProducts", error);
      return null;
    }
  }

  async addInternalDebtProducts(internalDebtProducts: InternalDebtProduct[]) {
    try {
      const sqlBuilder = new SqlBuilder<InternalDebtProduct>(
        this.db,
        this.table
      );
      const result = await sqlBuilder.insertAll(internalDebtProducts);
      return result;
    } catch (error) {
      console.error("error addInternalDebtProducts", error);
      return null;
    }
  }

  async deleteInternalDebtProducts(internalDebtProductIds: number[]) {
    try {
      const sqlBuilder = new SqlBuilder<InternalDebtProduct>(
        this.db,
        this.table
      );
      const result = await sqlBuilder.deleteAll(internalDebtProductIds);
      return result;
    } catch (error) {
      console.error("error deleteInternalDebtProduct", error);
      return null;
    }
  }
}
