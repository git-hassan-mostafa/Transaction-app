import { TableEnum } from "../Enums/TablesEnum";
import { supabase } from "../Supabase/client";
import { Provider } from "../Supabase/Models/Provider";

export default class ProviderDataAccess {
  table = TableEnum.Providers.toLowerCase();

  async getAllProviders(): Promise<Provider[] | null> {
    try {
      const { data, error } = await supabase.from(this.table).select("*");
      if (error) throw error;
      return data as Provider[];
    } catch (error) {
      console.error("error getAllProviders ", error);
      return null;
    }
  }

  async getProvider(id: number): Promise<Provider | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Provider;
    } catch (error) {
      console.error("error getProvider ", error);
      return null;
    }
  }

  async addProvider(provider: Provider): Promise<Provider | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(provider)
        .select()
        .single();
      if (error) throw error;
      return data as Provider;
    } catch (error) {
      console.error("error addProvider ", error);
      return null;
    }
  }

  async updateProvider(provider: Provider): Promise<Provider | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update(provider)
        .eq("id", provider.id)
        .select()
        .single();
      if (error) throw error;
      return data as Provider;
    } catch (error) {
      console.error("error updateProvider ", error);
      return null;
    }
  }

  async deleteProvider(id: number): Promise<boolean> {
    try {
      const { error } = await supabase.from(this.table).delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("error deleteProvider ", error);
      return false;
    }
  }
}
