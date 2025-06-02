import { useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import IAddPeopleProps from "@/ViewModels/People/IAddPersonProps";
import IPerson from "@/ViewModels/People/IPerson";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";

export default function useAddPeopleService(props: IAddPeopleProps) {
  //services

  const { peopleManager } = useService();

  //states
  const [person, setPerson] = useState<IPerson>({} as IPerson);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
  const context = useGlobalContext();

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
    if (!validatePerson()) return;
    const result = await peopleManager.addPerson(person);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    person.id = result.data;
    props.addToPeopleList(person);
    props.toggleModal();
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
  }

  function validatePerson() {
    if (!person.personName) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-the-name"),
      });
      return false;
    }
    if (!person.personPhoneNumber) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-the-phone-number"),
      });
      return false;
    }
    return true;
  }
  return { person, validation, setPersonName, setPersonPhoneNumber, addPerson };
}
