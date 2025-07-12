import useGlobalContext from "@/Shared/Context/ContextProvider";
import { PeopleDataAccess } from "@/DataBase/DAL/PeopleDataAccess";
import Mapper from "@/Shared/Helpers/Mapper";
import SortList from "@/Shared/Helpers/Functions/SortList";
import i18n from "@/Shared/I18n/I18n";
import IPerson from "@/Models/People/IPerson";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Shared/Context/ServiceProvider";
import IFormModalType from "@/Shared/Types/IEditModalType";

export default function usePeopleService() {
  //services
  const { peopleManager } = useService();

  //states
  const [people, setPeople] = useState<IPerson[]>([]);
  const [modalOptions, setModalOptions] = useState<IFormModalType<IPerson>>({
    visible: false,
    formData: {} as IPerson,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // context
  const context = useGlobalContext();

  //constructor
  useEffect(() => {
    fetchAllPeople();
  }, []);

  async function fetchAllPeople() {
    setIsLoading(true);
    const peopleDB = await peopleManager.getAllPeople();
    if (!peopleDB) return;
    setPeople(peopleDB);
    setIsLoading(false);
  }

  async function save(
    person: IPerson,
    validationCallback: (person: IPerson) => boolean
  ) {
    if (!validationCallback(person)) return;
    if (person.Id) await updatePerson(person);
    else await addPerson(person);
  }

  async function addPerson(person: IPerson) {
    const result = await peopleManager.addPerson(person);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    addToPeopleList(result.data);
    toggleModal();
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
  }

  async function updatePerson(person: IPerson) {
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
    toggleModal();
    updateFromPeopleList(person);
  }

  function addToPeopleList(value: IPerson) {
    setPeople((prev) => [...prev, value]);
  }

  function updateFromPeopleList(value: IPerson) {
    setPeople((prev) =>
      prev.map((person) =>
        person.Id === value.Id ? { ...person, ...value } : person
      )
    );
  }

  function deleteFromPeopleList(id: number) {
    setPeople((prev) => prev.filter((c) => c.Id !== id));
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

  async function onEdit(formData: IPerson) {
    toggleModal(formData);
  }

  function toggleModal(formData: IPerson = {} as IPerson) {
    setModalOptions((prev) => ({ visible: !prev.visible, formData }));
  }

  return {
    people,
    modalOptions,
    isLoading,
    addToPeopleList,
    deleteFromPeopleList,
    updateFromPeopleList,
    handleDeletePerson,
    onEdit,
    toggleModal,
    save,
  };
}
