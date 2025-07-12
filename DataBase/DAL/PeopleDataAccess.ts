import { TableEnum } from "../Enums/TablesEnum";
import { supabase } from "../Supabase/client";
import { Person } from "../Supabase/Models/Person";

export class PeopleDataAccess {
  table = TableEnum.People;

  async getAllPeople(): Promise<Person[] | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data as Person[];
    } catch (error) {
      console.error("error getAllPeople ", error);
      return null;
    }
  }

  async getPerson(id: number): Promise<Person | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select("*")
        .eq("id", id)
        .single(); // ensures one result

      if (error) throw error;
      return data as Person;
    } catch (error) {
      console.error("error getPerson ", error);
      return null;
    }
  }

  async addPerson(person: Person): Promise<Person | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(person)
        .select()
        .single();

      if (error) throw error;
      return data as Person;
    } catch (error) {
      console.error("error addPerson ", error);
      return null;
    }
  }

  async updatePerson(person: Person): Promise<Person | null> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update(person)
        .eq("id", person.id)
        .select()
        .single();

      if (error) throw error;
      return data as Person;
    } catch (error) {
      console.error("error updatePerson ", error);
      return null;
    }
  }

  async deletePerson(id: number): Promise<boolean> {
    try {
      const { error } = await supabase.from(this.table).delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("error deletePerson ", error);
      return false;
    }
  }
}
