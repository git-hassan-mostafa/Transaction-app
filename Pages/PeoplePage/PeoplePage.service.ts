import useContextProvider from "@/Global/ContextApi/ContextApi";
import Person from "@/Global/Models/Person";
import { useEffect, useState } from "react";

export default function usePeoplePageService() {
  const [people, setPeople] = useState<Person[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { peopleManager } = useContextProvider();

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

  return {
    people,
    toggleModal,
    modalVisible,
    addToPeopleList,
    deleteFromPeopleList,
    updateFromPeopleList,
  };
}
