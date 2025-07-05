import { SQLiteRunResult } from "expo-sqlite";
import SqlBuilder from "../Helpers/SqlBuilder";
import Person from "../Models/Person";
import AbstractDataAccess from "./AbstractDataAccess";
import { TableEnum } from "../Enums/TablesEnum";

export class PeopleDataAccess extends AbstractDataAccess {
  table = TableEnum.People;
  constructor() {
    super();
  }

  async getAllPeople() {
    try {
      const sqlBuilder = new SqlBuilder<Person>(this.db, this.table);
      const people = await sqlBuilder
        .select()
        .orderBy("Name", "desc")
        .executeAsync();
      if (!people) return null;
      return people as Person[];
    } catch (error) {
      console.error("error getAllPeople ", error);
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
      console.error("error getPerson ", error);
    }
  }

  async addPerson(person: Person) {
    try {
      const sqlBuilder = new SqlBuilder<Person>(this.db, this.table);
      const result = await sqlBuilder.insert(person);
      return result;
    } catch (error) {
      console.error("error addPerson ", error);
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
      console.error("error updatePerson ", error);
    }
  }

  async deletePerson(id: number) {
    try {
      const sqlBuilder = new SqlBuilder<Person>(this.db, this.table);
      const result = await sqlBuilder.delete(id);
      return result;
    } catch (error) {
      console.error("error deletePerson ", error);
      return null;
    }
  }
}
