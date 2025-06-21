import AbstractDataAccess from "./AbstractDataAccess";
import SqlBuilder from "../Global/Helpers/SqlBuilder";
import InternalDebtProduct from "../Models/InternalDebtProduct";
import InternalDebtProduct_InternalDebt_Product from "../Models/RelationModels/InternalDebtProduct_InternalDebt_Product";

export default class InternalDebtsProductsDataAccess extends AbstractDataAccess {
  table = "InternalDebtProducts";
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
        .leftJoin("InternalDebts")
        .leftJoin("Products")
        .executeAsync();
      return products;
    } catch (error) {
      console.log("error getInternalDebtProducts", error);
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
        .leftJoin("InternalDebts")
        .leftJoin("Products")
        .where({
          [`${this.table}.InternalDebtProduct_InternalDebtId`]: internalDebtId,
        })
        .executeAsync();
      return products;
    } catch (error) {
      console.log("error getInternalDebtProducts", error);
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
        .leftJoin("InternalDebts")
        .leftJoin("Products")
        .executeAsync();
      return products;
    } catch (error) {
      console.log("error getAllInternalDebtsProductsList", error);
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
      console.log("error addInternalDebtProducts", error);
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
      console.log("error addInternalDebtProducts", error);
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
      console.log("error deleteInternalDebtProduct", error);
      return null;
    }
  }
}
