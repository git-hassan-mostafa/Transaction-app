import { useEffect, useState } from "react";
import { IPeopleProps } from "./PeopleFormComponent.types";
import Person from "@/Global/Models/Person";
import useContextProvider from "@/Global/ContextApi/ContextApi";
import { Alert } from "react-native";

export default function usePeopleFormComponentService({
  id,
  deleteFromPeopleList,
  updateFromPeopleList,
}: IPeopleProps) {
  const [person, setPerson] = useState<Person>({} as Person);
  const { peopleManager } = useContextProvider();

  useEffect(() => {
    getPerson();
  }, []);

  async function getPerson() {
    const person = await peopleManager.getPerson(id);
    if (!person) return;
    setPerson(person);
    return person;
  }

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

  async function updatePersonName() {
    updatePerson();
  }

  async function updatePersonPhoneNumber() {
    updatePerson();
  }

  async function updatePerson() {
    person.id = id;
    person.name = person.name?.trim();
    person.phoneNumber = person.phoneNumber?.trim();
    const result = await peopleManager.updatePerson(person);
    if ((result?.changes || 0) > 0) updateFromPeopleList(person);
  }

  function handleDeletePerson() {
    Alert.alert("ازالة شخص", "هل أنت متأكد أنك تريد ازالة هذا الشخص", [
      {
        text: "الغاء",
        style: "cancel",
      },
      { text: "تأكيد", onPress: deletePerson },
    ]);
  }

  async function deletePerson() {
    const result = await peopleManager.deletePerson(id);
    if ((result?.changes || 0) > 0) deleteFromPeopleList(id);
    else Alert.prompt("حصل خطأ ما", "حصل خطأ ما , الرجاء المحاولة مجددا.");
  }

  return {
    handleDeletePerson,
    person,
    setPersonName,
    updatePersonName,
    setPersonPhoneNumber,
    updatePersonPhoneNumber,
  };
}
