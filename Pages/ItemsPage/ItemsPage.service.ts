import useGlobalContext from "@/Global/Context/ContextProvider";
import Mapper from "@/Global/Helpers/MapService";
import ItemManager from "@/Global/Services/items.service";
import IItem from "@/Global/ViewModels/Items/IItem";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useItemsPageService() {
  //services
  const itemManager = new ItemManager();
  const mapper = new Mapper();

  //states
  const [items, setItems] = useState<IItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // context
  const { toggleSnackBar } = useGlobalContext();

  useEffect(() => {
    getAllItems();
  }, []);

  function addToItemsList(value: IItem) {
    setItems((prev) => [...prev, value]);
  }

  function deleteFromItemsList(id: number) {
    setItems((prev) => prev.filter((c) => c.itemId !== id));
  }

  function updateFromProductsList(value: IItem) {
    setItems((prev) =>
      prev.map((item) =>
        item.itemId === value.itemId ? { ...item, ...value } : item
      )
    );
  }
  async function getAllItems() {
    const itemsDB = await itemManager.getAllItems();
    const items = itemsDB?.map((item) => mapper.mapToIItem(item));
    setItems(items as IItem[]);
  }

  async function handleDeleteItem(id: number) {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Confirm", onPress: () => deleteItem(id) },
    ]);
  }

  async function deleteItem(id: number) {
    const result = await itemManager.deleteItem(id);
    if ((result?.changes || 0) > 0) {
      deleteFromItemsList(id);
      toggleSnackBar({
        text: "Item deleted successfully",
        type: "success",
        visible: true,
      });
    } else
      toggleSnackBar({
        text: "Error deleting inner debt",
        type: "error",
        visible: true,
      });
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
    updateFromProductsList,
    handleDeleteItem,
  };
}
