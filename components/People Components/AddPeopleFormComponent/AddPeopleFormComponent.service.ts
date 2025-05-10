import Person from "@/Global/Models/Person";
import { useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import IAddPeopleProps from "@/Global/ViewModels/People/IAddPersonProps";
import { PeopleManager } from "@/Global/Services/people.service";
import IPerson from "@/Global/ViewModels/People/IPerson";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";

export default function useAddPeopleFormComponentService({
  addToPeopleList,
  toggleModal,
}: IAddPeopleProps) {
  //services
  const peopleManager = new PeopleManager();

  //states
  const [person, setPerson] = useState<IPerson>({} as IPerson);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
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
      setValidation({
        visible: true,
        text: "please enter the name",
      });
      return;
    }
    if (!person.personPhoneNumber) {
      setValidation({
        visible: true,
        text: "please enter the phone number",
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
        text: "Failed to add person",
        type: "error",
      });
    person.id = result?.lastInsertRowId;
    addToPeopleList(person);
    toggleModal();
    toggleSnackBar({
      visible: true,
      text: "Person added successfully",
      type: "success",
    });
  }

  return { person, validation, setPersonName, setPersonPhoneNumber, addPerson };
}
