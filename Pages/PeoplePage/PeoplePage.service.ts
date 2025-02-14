import useContextProvider from "@/Global/ContextApi/ContextApi";
import Person from "@/Global/Models/Person";
import { PeopleManager } from "@/Global/Services/people.service";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function usePeoplePageService() {
  //services
  const peopleManager = new PeopleManager();

  //states
  const [people, setPeople] = useState<Person[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllPeople();
  }, []);

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  async function getAllPeople() {
    const customers = await peopleManager.getAllPeople();
    setPeople(customers as Person[]);
  }

  function addToPeopleList(value: Person) {
    setPeople((prev) => [...prev, value]);
  }

  function updateFromPeopleList(value: Person) {
    setPeople((prev) =>
      prev.map((person) =>
        person.id === value.id ? { ...person, ...value } : person
      )
    );
  }

  function deleteFromPeopleList(id: number) {
    setPeople((prev) => prev.filter((c) => c.id !== id));
  }

  function handleDeletePerson(id: number) {
    Alert.alert("ازالة شخص", "هل أنت متأكد أنك تريد ازالة هذا الشخص", [
      {
        text: "الغاء",
        style: "cancel",
      },
      { text: "تأكيد", onPress: () => deletePerson(id) },
    ]);
  }

  async function deletePerson(id: number) {
    const result = await peopleManager.deletePerson(id);
    if ((result?.changes || 0) > 0) deleteFromPeopleList(id);
    else Alert.prompt("حصل خطأ ما", "حصل خطأ ما , الرجاء المحاولة مجددا.");
  }
  return {
    people,
    toggleModal,
    modalVisible,
    addToPeopleList,
    deleteFromPeopleList,
    updateFromPeopleList,
    handleDeletePerson,
  };
}
