import Person from "@/Models/Person";
import { useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import IAddPeopleProps from "@/ViewModels/People/IAddPersonProps";
import IPerson from "@/ViewModels/People/IPerson";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import { PeopleManager } from "@/DAL/people.service";

export default function useAddPeopleService({
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
        text: i18n.t("please-enter-the-name"),
      });
      return;
    }
    if (!person.personPhoneNumber) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-the-phone-number"),
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
        text: i18n.t("error-adding-person"),
        type: "error",
      });
    person.id = result?.lastInsertRowId;
    addToPeopleList(person);
    toggleModal();
    toggleSnackBar({
      visible: true,
      text: i18n.t("person-added-successfully"),
      type: "success",
    });
  }

  return { person, validation, setPersonName, setPersonPhoneNumber, addPerson };
}
