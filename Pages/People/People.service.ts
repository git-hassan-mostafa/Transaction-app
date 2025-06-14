import useGlobalContext from "@/Global/Context/ContextProvider";
import { PeopleDataAccess } from "@/DAL/PeopleDataAccess";
import Mapper from "@/Global/Helpers/MapService";
import SortList from "@/Global/Helpers/Functions/SortList";
import i18n from "@/Global/I18n/I18n";
import IPerson from "@/ViewModels/People/IPerson";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Global/Context/ServiceProvider";
import IEditModalType from "@/Global/Types/IEditModalType";

export default function usePeopleService() {
  //services
  const { peopleManager } = useService();

  //states
  const [people, setPeople] = useState<IPerson[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalOptions, setEditModalOptions] = useState<IEditModalType>({
    visible: false,
    id: -1,
  });
  // context
  const context = useGlobalContext();

  //constructor
  sortPeople();
  useEffect(() => {
    getAllPeople();
  }, []);

  function sortPeople() {
    SortList(people, (e) => e.personName);
  }

  async function getAllPeople() {
    const peopleDB = await peopleManager.getAllPeople();
    if (!peopleDB) return;
    setPeople(peopleDB);
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
        { text: i18n.t("confirm"), onPress: () => deletePerson(id) },
      ]
    );
  }

  async function deletePerson(id: number) {
    const result = await peopleManager.deletePerson(id);
    if (!result.success)
      return context.toggleSnackBar({
        text: result.message,
        visible: true,
        type: "error",
      });
    deleteFromPeopleList(id);
    context.toggleSnackBar({
      text: result.message,
      type: "success",
      visible: true,
    });
  }

  async function onEdit(id: number) {
    toggleEditModal(id);
  }

  function toggleEditModal(id: number = -1) {
    setEditModalOptions((prev) => ({ visible: !prev.visible, id }));
  }

  function toggleAddModal() {
    setModalVisible((prev) => !prev);
  }

  return {
    people,
    modalVisible,
    editModalOptions,
    toggleAddModal,
    addToPeopleList,
    deleteFromPeopleList,
    updateFromPeopleList,
    handleDeletePerson,
    onEdit,
    toggleEditModal,
  };
}
