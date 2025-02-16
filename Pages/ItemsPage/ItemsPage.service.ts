import MapService from "@/Global/Helpers/MapService";
import Item from "@/Global/Models/Item";
import ItemManager from "@/Global/Services/items.service";
import IItem from "@/Global/ViewModels/Items/IItem";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useItemsPageService() {
  //services
  const itemManager = new ItemManager();
  const mapService = new MapService();

  //states
  const [items, setItems] = useState<IItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllItems();
  }, []);

  function addToItemsList(value: IItem) {
    setItems((prev) => [...prev, value]);
  }

  function deleteFromItemsList(id: number) {
    setItems((prev) => prev.filter((c) => c.id !== id));
  }

  function updateFromItemsList(value: IItem) {
    setItems((prev) =>
      prev.map((item) => (item.id === value.id ? { ...item, ...value } : item))
    );
  }
  async function getAllItems() {
    const itemsDB = await itemManager.getAllItems();
    const items = itemsDB?.map((item) => mapService.mapToIItem(item));
    setItems(items as IItem[]);
  }

  async function handleDeleteItem(id: number) {
    Alert.alert("ازالة زبون", "هل أنت متأكد أنك تريد ازالة هذا المنتج؟", [
      {
        text: "الغاء",
        style: "cancel",
      },
      { text: "تأكيد", onPress: () => deleteItem(id) },
    ]);
  }

  async function deleteItem(id: number) {
    const result = await itemManager.deleteItem(id);
    if ((result?.changes || 0) > 0) deleteFromItemsList(id);
    else Alert.prompt("حصل خطأ ما", "حصل خطأ ما , الرجاء المحاولة مجددا.");
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  return {
    items,
    modalVisible,
    toggleModal,
    addToItemsList,
    deleteFromItemsList,
    updateFromItemsList,
    handleDeleteItem,
  };
}
