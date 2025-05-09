import Person from "@/Global/Models/Person";
import { useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import IAddPeopleProps from "@/Global/ViewModels/People/IAddPersonProps";
import { PeopleManager } from "@/Global/Services/people.service";
import MapService from "@/Global/Helpers/MapService";
import IPerson from "@/Global/ViewModels/People/IPerson";

export default function useAddPeopleFormComponentService({
  addToPeopleList,
  toggleModal,
}: IAddPeopleProps) {
  //services
  const peopleManager = new PeopleManager();
  const mapService = new MapService();

  //states
  const [person, setPerson] = useState<IPerson>({} as IPerson);

  const { toggleSnackBar } = useGlobalContext();

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

  async function addPerson() {
    if (!person.personName) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال اسم الزبون",
        type: "error",
      });
      return;
    }
    if (!person.personPhoneNumber) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال رقم الهاتف ",
        type: "error",
      });
      return;
    }
    const newPerson: Person = {
      Name: person?.personName.trim(),
      PhoneNumber: person.personPhoneNumber.trim(),
    };
    const result = await peopleManager.addPerson(newPerson);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    person.id = result?.lastInsertRowId;
    addToPeopleList(person);
    toggleModal();
  }

  return { person, setPersonName, setPersonPhoneNumber, addPerson };
}
