import { supabase } from "../Supabase/client";
import { TableEnum } from "../Enums/TablesEnum";
import { InternalDebtPayment } from "../Supabase/Models/InternalDebtPayemnt";

export default class InternalDebtPaymentsDataAccess {
  table = TableEnum.InternalDebtPayments;

  async getInternalDebtPayments(
    internalDebtId: number
  ): Promise<InternalDebtPayment[] | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select("*")
        .eq("internaldebtid", internalDebtId);
      if (error) throw error;
      return data as InternalDebtPayment[];
    } catch (error) {
      console.error("error getInternalDebtPayments", error);
      return null;
    }
  }

  async addInternalDebtPayments(
    internalDebtPayments: Partial<InternalDebtPayment>[]
  ): Promise<InternalDebtPayment[] | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(internalDebtPayments)
        .select("*");
      if (error) throw error;
      return data as InternalDebtPayment[];
    } catch (error) {
      console.error("error addInternalDebtPayments", error);
      return null;
    }
  }

  async deleteInternalDebtPayments(
    internalDebtPaymentIds: number[]
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.table)
        .delete()
        .in("id", internalDebtPaymentIds);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("error deleteInternalDebtPayments", error);
      return false;
    }
  }
}
