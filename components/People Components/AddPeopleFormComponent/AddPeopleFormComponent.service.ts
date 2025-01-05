import Person from "@/Global/Models/Person";
import { useState } from "react";
import IAddPeopleProps from "./AddPeopleFormComponent.types";
import useContextProvider from "@/Global/ContextApi/ContextApi";

export default function useAddPeopleFormComponentService({
  addToPeopleList,
  toggleModal,
}: IAddPeopleProps) {
  const [person, setPerson] = useState<Person>({} as Person);

  const { peopleManager, toggleSnackBar } = useContextProvider();

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
      name: person?.name.trim(),
      phoneNumber: person.phoneNumber.trim(),
    };
    const result = await peopleManager.addPerson(newPerson);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    newPerson.id = result?.lastInsertRowId;
    addToPeopleList(newPerson);
    toggleModal();
  }

  return { person, setPersonName, setPersonPhoneNumber, addPerson };
}
