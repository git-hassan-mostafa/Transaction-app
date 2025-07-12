import { TableEnum } from "../Enums/TablesEnum";
import { Product } from "../Supabase/Models/Product";
import { supabase } from "../Supabase/client";

export default class ProductsDataAccess {
  table = TableEnum.Products;

  async getAllProducts(): Promise<Product[] | null> {
    try {
      const { data, error } = await supabase.from(this.table).select("*");
      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error("error getAllProducts", error);
      return null;
    }
  }

  async getProduct(id: number): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.error("error getProduct", error);
      return null;
    }
  }

  async addProduct(product: Product): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(product)
        .select()
        .single();
      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.error("error addProduct", error);
      return null;
    }
  }

  async updateProduct(product: Product): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update(product)
        .eq("id", product.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("error updateProduct", error);
      return null;
    }
  }

  async updateProviderId(id: number, providerId: number): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.table)
        .update({ ProviderId: providerId })
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.error("error updateProviderId", error);
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const { error } = await supabase.from(this.table).delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("error deleteProduct", error);
      return false;
    }
  }

  async isProductUsed(id: number): Promise<boolean> {
    try {
      const { count, error } = await supabase
        .from(TableEnum.InternalDebtProducts)
        .select("id", { count: "exact", head: true })
        .eq("productid", id);
      if (error) throw error;
      return (count ?? 0) > 0;
    } catch (error) {
      console.error("error isProductUsed", error);
      return false;
    }
  }
}
