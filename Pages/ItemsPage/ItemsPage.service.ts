import useGlobalContext from "@/Global/Context/ContextProvider";
import Mapper from "@/Global/Helpers/MapService";
import i18n from "@/Global/I18n/I18n";
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
    Alert.alert(
      i18n.t("delete-product"),
      i18n.t("are-you-sure-you-want-to-delete-this-product"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteItem(id) },
      ]
    );
  }

  async function deleteItem(id: number) {
    const result = await itemManager.deleteItem(id);
    if ((result?.changes || 0) > 0) {
      deleteFromItemsList(id);
      toggleSnackBar({
        text: i18n.t("product-deleted-successfully"),
        type: "success",
        visible: true,
      });
    } else
      toggleSnackBar({
        text: i18n.t("error-deleting-product"),
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
