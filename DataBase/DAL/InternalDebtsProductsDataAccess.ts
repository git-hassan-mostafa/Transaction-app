import { supabase } from "../Supabase/client";
import { TableEnum } from "../Enums/TablesEnum";
import { InternalDebtProduct } from "../Supabase/Models/InternalDebtProduct";

export default class InternalDebtsProductsDataAccess {
  table = TableEnum.InternalDebtProducts;

  // async getAllInternalDebtProducts(): Promise<InternalDebtProduct[] | null> {
  //   try {
  //     const { data, error } = await supabase.from(this.table).select("*");
  //     if (error) throw error;
  //     return data as InternalDebtProduct[];
  //   } catch (error) {
  //     console.error("error getInternalDebtProducts", error);
  //     return null;
  //   }
  // }

  async getInternalDebtProducts(
    internalDebtId: number
  ): Promise<InternalDebtProduct[] | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select("*")
        .eq("internaldebtid", internalDebtId);
      if (error) throw error;
      return data as InternalDebtProduct[];
    } catch (error) {
      console.error("error getInternalDebtProducts", error);
      return null;
    }
  }

  async addInternalDebtProducts(
    internalDebtProducts: Partial<InternalDebtProduct>[]
  ): Promise<InternalDebtProduct[] | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(internalDebtProducts)
        .select("*, products(*)");
      if (error) throw error;
      return data as InternalDebtProduct[];
    } catch (error) {
      console.error("error addInternalDebtProducts", error);
      return null;
    }
  }

  async deleteInternalDebtProducts(
    internalDebtProductIds: number[]
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.table)
        .delete()
        .in("id", internalDebtProductIds);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("error deleteInternalDebtProduct", error);
      return false;
    }
  }
}
