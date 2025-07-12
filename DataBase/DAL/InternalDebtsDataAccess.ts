import { TableEnum } from "../Enums/TablesEnum";
import { supabase } from "../Supabase/client";
import { InternalDebt } from "../Supabase/Models/InternalDebt";

export default class InternalDebtsDataAccess {
  table = TableEnum.InternalDebts;

  async getAllInternalDebts(): Promise<InternalDebt[] | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select(
          "*, customers(*), internaldebtproducts(*, products(*)), internaldebtpayments(*)"
        );
      if (error) throw error;
      return data as InternalDebt[];
    } catch (error) {
      console.error("error getAllInternalDebts", error);
      return null;
    }
  }

  async getInternalDebt(id: number): Promise<InternalDebt | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select(
          "*, customers(*), internaldebtproducts(*, products(*)), internaldebtpayments(*)"
        )
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as InternalDebt;
    } catch (error) {
      console.error("error getInternalDebt", error);
      return null;
    }
  }

  async addInternalDebt(
    internalDebt: InternalDebt
  ): Promise<InternalDebt | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(internalDebt)
        .select(
          "*, customers(*), internaldebtproducts(*, products(*)), internaldebtpayments(*)"
        )
        .single();
      if (error) throw error;
      return data as InternalDebt;
    } catch (error) {
      console.error("error addInternalDebt", error);
      return null;
    }
  }

  async updateInternalDebt(
    internalDebt: InternalDebt
  ): Promise<InternalDebt | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update(internalDebt)
        .eq("id", internalDebt.id)
        .select(
          "*, customers(*), internaldebtproducts(*, products(*)), internaldebtpayments(*)"
        )
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("error updateInternalDebt", error);
      return null;
    }
  }

  async deleteInternalDebt(id: number): Promise<boolean> {
    try {
      const { error } = await supabase.from(this.table).delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("error deleteInternalDebt", error);
      return false;
    }
  }
}
