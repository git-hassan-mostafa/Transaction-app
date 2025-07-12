import { useEffect, useState } from "react";
import IEditPeopleProps from "@/Models/People/IPersonFormProps";
import IPerson from "@/Models/People/IPerson";
import useService from "@/Shared/Context/ServiceProvider";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import i18n from "@/Shared/I18n/I18n";
import useGlobalContext from "@/Shared/Context/ContextProvider";

export default function usePeopleFormService(props: IEditPeopleProps) {
  //services
  const { peopleManager } = useService();

  //states
  const [person, setPerson] = useState<IPerson>(props.formData);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  const context = useGlobalContext();

  useEffect(() => {
    props.dirtyChecker.setOriginalState(props.formData);

    return () => {
      props.dirtyChecker.dispose();
    };
  }, []);

  useEffect(() => {
    props.dirtyChecker.setState(person);
  }, [person]);

  function setPersonName(value: string) {
    setPerson((prev) => {
      return { ...prev, Name: value };
    });
  }

  function setPersonPhoneNumber(value: string) {
    setPerson((prev) => {
      return { ...prev, PhoneNumber: value };
    });
  }

  async function save() {
    if (!validatePerson(person)) return;
    await props.save(person, validatePerson);
  }

  function validatePerson(person: IPerson) {
    if (!person.Name) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-the-name"),
      });
      return false;
    }
    if (!person.PhoneNumber) {
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
