import { useEffect, useState } from "react";
import IEditPeopleProps from "@/ViewModels/People/IPersonFormProps";
import IPerson from "@/ViewModels/People/IPerson";
import useService from "@/Global/Context/ServiceProvider";

export default function useEditPeopleService(props: IEditPeopleProps) {
  //services
  const { peopleManager } = useService();

  //states
  const [person, setPerson] = useState<IPerson>({} as IPerson);

  useEffect(() => {
    getPerson();
  }, []);

  async function getPerson() {
    const personDB = await peopleManager.getPerson(props.id);
    if (!personDB) return;
    setPerson(personDB);
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
    const result = await peopleManager.updatePerson(person);
    if (result.success) props.updateFromPeopleList(person);
  }

  return {
    person,
    setPersonName,
    updatePersonName,
    setPersonPhoneNumber,
    updatePersonPhoneNumber,
  };
}
