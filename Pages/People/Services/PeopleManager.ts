import { PeopleDataAccess } from "@/DataBase/DAL/PeopleDataAccess";
import Mapper from "@/Shared/Helpers/MapService";
import i18n from "@/Shared/I18n/I18n";
import { IResultType } from "@/Shared/Types/IResultType";
import IPerson from "@/Models/People/IPerson";

export class PeopleManager {
  constructor(
    private peopleDataAccess: PeopleDataAccess,
    private mapper: Mapper
  ) {}

  async getAllPeople() {
    const peopleDB = await this.peopleDataAccess.getAllPeople();
    if (!peopleDB) return null;
    const people = this.mapper.mapToIPersonAll(peopleDB);
    return people;
  }

  async getPerson(id: number): Promise<IPerson | null> {
    const personDB = await this.peopleDataAccess.getPerson(id);
    if (!personDB) return null;
    const person = this.mapper.mapToIPerson(personDB);
    return person;
  }

  async addPerson(person: IPerson): Promise<IResultType<number>> {
    const newPerson = this.mapper.mapToPerson(person);
    const result = await this.peopleDataAccess.addPerson(newPerson);
    if (!result || !result.lastInsertRowId)
      return {
        success: true,
        data: -1,
        message: i18n.t("error-adding-person"),
      };
    return {
      success: true,
      data: result.lastInsertRowId,
      message: i18n.t("person-added-successfully"),
    };
  }

  async updatePerson(person: IPerson): Promise<IResultType<number>> {
    const personDB = this.mapper.mapToPerson(person);
    const result = await this.peopleDataAccess.updatePerson(personDB);
    if (!result || !result.changes)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-updating-person"),
      };
    return {
      success: true,
      data: result.changes,
      message: i18n.t("person-updated-successfully"),
    };
  }

  async deletePerson(id: number): Promise<IResultType<number>> {
    const result = await this.peopleDataAccess.deletePerson(id);
    if (!result || !result.changes)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-deleting-person"),
      };
    return {
      success: true,
      data: result.changes,
      message: i18n.t("person-deleted-successfully"),
    };
  }
}
