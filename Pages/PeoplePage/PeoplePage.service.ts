import Mapper from "@/Global/Helpers/MapService";
import { PeopleManager } from "@/Global/Services/people.service";
import IPerson from "@/Global/ViewModels/People/IPerson";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function usePeoplePageService() {
  //services
  const peopleManager = new PeopleManager();
  const mapper = new Mapper();
  //states
  const [people, setPeople] = useState<IPerson[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllPeople();
  }, []);

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  async function getAllPeople() {
    const peopleDB = await peopleManager.getAllPeople();
    const people = peopleDB?.map((c) => mapper.mapToIPerson(c) as IPerson);
    setPeople(people as IPerson[]);
  }

  function addToPeopleList(value: IPerson) {
    setPeople((prev) => [...prev, value]);
  }

  function updateFromPeopleList(value: IPerson) {
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
