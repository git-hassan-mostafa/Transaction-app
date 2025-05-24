import useGlobalContext from "@/Global/Context/ContextProvider";
import Mapper from "@/Global/Helpers/MapService";
import SortList from "@/Global/Helpers/SortList";
import i18n from "@/Global/I18n/I18n";
import { PeopleManager } from "@/Global/Services/people.service";
import IPerson from "@/Global/ViewModels/People/IPerson";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function usePeopleService() {
  //services
  const peopleManager = new PeopleManager();
  const mapper = new Mapper();

  //states
  const [people, setPeople] = useState<IPerson[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // context
  const { toggleSnackBar } = useGlobalContext();

  //constructor
  sortPeople();
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
    Alert.alert(
      i18n.t("delete-person"),
      i18n.t("are-you-sure-you-want-to-delete-this-person"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("Confirm"), onPress: () => deletePerson(id) },
      ]
    );
  }

  async function deletePerson(id: number) {
    const result = await peopleManager.deletePerson(id);
    if ((result?.changes || 0) > 0) {
      deleteFromPeopleList(id);
      toggleSnackBar({
        text: i18n.t("person-deleted-successfully"),
        type: "success",
        visible: true,
      });
    } else
      toggleSnackBar({
        text: i18n.t("error-deleting-person"),
        visible: true,
        type: "error",
      });
  }

  function sortPeople() {
    SortList(people, (e) => e.personName);
  }
  return {
    people,
    modalVisible,
    toggleModal,
    addToPeopleList,
    deleteFromPeopleList,
    updateFromPeopleList,
    handleDeletePerson,
  };
}
