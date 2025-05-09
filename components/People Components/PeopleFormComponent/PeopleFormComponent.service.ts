import { useEffect, useState } from "react";
import Person from "@/Global/Models/Person";
import useGlobalContext from "@/Global/Context/ContextProvider";
import IPeopleFormProps from "@/Global/ViewModels/People/IPersonFormProps";
import { PeopleManager } from "@/Global/Services/people.service";
import MapService from "@/Global/Helpers/MapService";
import IPerson from "@/Global/ViewModels/People/IPerson";

export default function usePeopleFormComponentService({
  id,
  updateFromPeopleList,
}: IPeopleFormProps) {
  //services
  const peopleManager = new PeopleManager();
  const mapService = new MapService();

  //states
  const [person, setPerson] = useState<IPerson>({} as IPerson);

  useEffect(() => {
    getPerson();
  }, []);

  async function getPerson() {
    const personDB = await peopleManager.getPerson(id);
    if (!personDB) return;
    const person = mapService.mapToIPerson(personDB);
    setPerson(person);
    return personDB;
  }

  function setPersonName(value: string) {
    setPerson((prev) => {
      return { ...prev, personName: value };
    });
  }

  function setPersonPhoneNumber(value: string) {
    setPerson((prev) => {
      return { ...prev, personPhoneNumber: value };
    });
  }

  async function updatePersonName() {
    updatePerson();
  }

  async function updatePersonPhoneNumber() {
    updatePerson();
  }

  async function updatePerson() {
    person.id = id;
    person.personName = person.personName?.trim();
    person.personPhoneNumber = person.personPhoneNumber?.trim();
    const personDB = mapService.mapToPerson(person);
    const result = await peopleManager.updatePerson(personDB);
    if ((result?.changes || 0) > 0) updateFromPeopleList(person);
  }

  return {
    person,
    setPersonName,
    updatePersonName,
    setPersonPhoneNumber,
    updatePersonPhoneNumber,
  };
}
