import { useEffect, useState } from "react";
import IEditPeopleProps from "@/ViewModels/People/IPersonFormProps";
import IPerson from "@/ViewModels/People/IPerson";
import useService from "@/Global/Context/ServiceProvider";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import useGlobalContext from "@/Global/Context/ContextProvider";

export default function usePeopleFormService(props: IEditPeopleProps) {
  //services
  const { peopleManager } = useService();

  //states
  const [person, setPerson] = useState<IPerson>({} as IPerson);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  const context = useGlobalContext();

  useEffect(() => {
    fetchPerson();
  }, []);

  async function fetchPerson() {
    if (!props.id) return;
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

  function save() {
    if (props.id) updatePerson();
    else addPerson();
  }

  async function updatePerson() {
    if (!validatePerson) return;
    const result = await peopleManager.updatePerson(person);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
    props.toggleModal();
    props.updateFromPeopleList(person);
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

  return {
    person,
    validation,
    setPersonName,
    setPersonPhoneNumber,
    save,
  };
}
