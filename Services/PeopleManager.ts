import { PeopleDataAccess } from "@/DataBase/DAL/PeopleDataAccess";
import Mapper from "@/Shared/Helpers/Mapper";
import i18n from "@/Shared/I18n/I18n";
import { IResultType } from "@/Shared/Types/IResultType";
import IPerson from "@/Models/People/IPerson";
import { Person } from "@/DataBase/Supabase/Models/Person";

export default class PeopleManager {
  constructor(
    private peopleDataAccess: PeopleDataAccess,
    private mapper: Mapper
  ) {}

  async getAllPeople() {
    const peopleDB = await this.peopleDataAccess.getAllPeople();
    if (!peopleDB) return null;
    return this.mapper.mapToIPersonAll(peopleDB);
  }

  async getPerson(id: number): Promise<IPerson | null> {
    const personDB = await this.peopleDataAccess.getPerson(id);
    if (!personDB) return null;
    return this.mapper.mapToIPerson(personDB);
  }

  async addPerson(person: IPerson): Promise<IResultType<IPerson>> {
    const personDB = this.mapper.mapToPerson(person);
    const result = await this.peopleDataAccess.addPerson(personDB);
    if (!result || !result.id)
      return {
        success: true,
        data: this.mapper.mapToIPerson(result || ({} as Person)),
        message: i18n.t("error-adding-person"),
      };
    return {
      success: true,
      data: this.mapper.mapToIPerson(result || ({} as Person)),
      message: i18n.t("person-added-successfully"),
    };
  }

  async updatePerson(person: IPerson): Promise<IResultType<number>> {
    const personDB = this.mapper.mapToPerson(person);
    const result = await this.peopleDataAccess.updatePerson(personDB);
    if (!result)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-updating-person"),
      };
    return {
      success: true,
      data: result.id,
      message: i18n.t("person-updated-successfully"),
    };
  }

  async deletePerson(id: number): Promise<IResultType<boolean>> {
    const result = await this.peopleDataAccess.deletePerson(id);
    if (!result)
      return {
        success: false,
        data: false,
        message: i18n.t("error-deleting-person"),
      };
    return {
      success: true,
      data: result,
      message: i18n.t("person-deleted-successfully"),
    };
  }
}
