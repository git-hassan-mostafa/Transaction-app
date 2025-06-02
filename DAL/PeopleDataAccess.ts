import { SQLiteRunResult } from "expo-sqlite";
import SqlBuilder from "../Global/Helpers/SqlBuilder";
import Person from "../Models/Person";
import AbstractDataAccess from "./AbstractDataAccess";

export class PeopleDataAccess extends AbstractDataAccess {
  table = "people";
  constructor() {
    super();
  }

  async getAllPeople() {
    try {
      const sqlBuilder = new SqlBuilder<Person>(this.db, this.table);
      const people = await sqlBuilder.select().executeAsync();
      if (!people) return null;
      return people as Person[];
    } catch (error) {
      console.log("error getAllPeople ", error);
      return null;
    }
  }

  async getPerson(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Person>(this.db, this.table);
      const customer = await sqlBuilder
        .select()
        .where({ PersonId: id })
        .firstAsync();
      return customer;
    } catch (error) {
      console.log("error getPerson ", error);
    }
  }

  async addPerson(person: Person) {
    try {
      const sqlBuilder = new SqlBuilder<Person>(this.db, this.table);
      const result = await sqlBuilder.insert(person);
      return result;
    } catch (error) {
      console.log("error addPerson ", error);
      return null;
    }
  }

  async updatePerson(person: Person) {
    try {
      const sqlBuilder = new SqlBuilder<Person>(this.db, this.table);
      const result = await sqlBuilder
        .update(person)
        .where({ PersonId: person.PersonId })
        .executeAsync();
      return result as SQLiteRunResult;
    } catch (error) {
      console.log("error updatePerson ", error);
    }
  }

  async deletePerson(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Person>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.log("error deletePerson ", error);
      return null;
    }
  }
}
