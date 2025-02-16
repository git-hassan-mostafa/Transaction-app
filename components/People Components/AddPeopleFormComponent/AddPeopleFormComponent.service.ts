import Person from "@/Global/Models/Person";
import { useState } from "react";
import useContextProvider from "@/Global/ContextApi/ContextApi";
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

  const { toggleSnackBar } = useContextProvider();

  function setPersonName(value: string) {
    setPerson((prev) => {
      return { ...prev, name: value };
    });
  }

  function setPersonPhoneNumber(value: string) {
    setPerson((prev) => {
      return { ...prev, phoneNumber: value };
    });
  }

  async function addPerson() {
    if (!person.name) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال اسم الزبون",
        type: "error",
      });
      return;
    }
    if (!person.phoneNumber) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال رقم الهاتف ",
        type: "error",
      });
      return;
    }
    const newPerson: Person = {
      Name: person?.name.trim(),
      PhoneNumber: person.phoneNumber.trim(),
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
