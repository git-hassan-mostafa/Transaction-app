import { TableEnum } from "../Enums/TablesEnum";
import { supabase } from "../Supabase/client";
import { Customer } from "../Supabase/Models/Customer";

export default class CustomerDataAccess {
  table = TableEnum.Customers;

  async getAllCustomers(withDebts: boolean = true) {
    try {
      const { data, error } = withDebts
        ? await supabase
            .from(this.table)
            .select(
              `
          *,
          internaldebts (
            *,
            internaldebtproducts (
              *,
              products (*)
            ),
            internaldebtpayments (*)
    )`
            )
            .order("name", { ascending: true })
        : await supabase.from(this.table).select("*");
      if (error) throw error;
      return data as Customer[];
    } catch (error) {
      console.error("error getAllCustomers", error);
      return null;
    }
  }

  async getCustomer(id: number) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select(
          `
          *,
          internaldebts (
            *,
            internaldebtproducts (
              *,
              products (*)
            ),
            internaldebtpayments (*)
        )`
        )
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Customer;
    } catch (error) {
      console.error("error getCustomer", error);
      return null;
    }
  }

  async addCustomer(customer: Customer) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(customer)
        .select()
        .single();
      if (error) throw error;
      return data as Customer;
    } catch (error) {
      console.error("error addCustomer", error);
      return null;
    }
  }

  async updateCustomer(customer: Customer) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update(customer)
        .eq("id", customer.id)
        .select("*")
        .single();
      if (error) throw error;
      return data as Customer;
    } catch (error) {
      console.error("error updateCustomer", error);
      return null;
    }
  }

  async deleteCustomer(id: number) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .delete()
        .eq("id", id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("error deleteCustomer", error);
      return false;
    }
  }
}
