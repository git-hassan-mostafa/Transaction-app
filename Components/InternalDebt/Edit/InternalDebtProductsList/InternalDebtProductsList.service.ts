import useGlobalContext from "@/Global/Context/ContextProvider";
import InnerDebtItem_InnerDebt_Item from "@/Models/RelationModels/InnerDebtItem_InnerDebt_Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IItem from "@/ViewModels/Items/IItem";
import IInnerDebtItem_IInnerDebt_IItem from "@/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import i18n from "@/Global/I18n/I18n";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import IInternalDebtProductsListProps from "@/ViewModels/InnerDebts/IInnerDebtsItemsListProps";
import BLLFactory from "@/Factories/BLLFactory";

export default function useInternalDebtProductsListService(
  innerDebtId: number
): IInternalDebtProductsListProps {
  //managers
  const internalDebtsManager = BLLFactory.InternalDebtManager();
  const itemsManager = BLLFactory.ItemManager();

  //states
  const [items, setItems] = useState<IItem[]>([]);
  const [dropDownItems, setDropDownItems] = useState<IDropDownItem[]>([]);
  const [innerDebtsItems, setInnerDebtsItems] = useState<
    IInnerDebtItem_IInnerDebt_IItem[]
  >([]);

  const [showAddItem, setShowAddItem] = useState(false);
  var newInnerDebtsItem: IInnerDebtItem_IInnerDebt_IItem =
    {} as IInnerDebtItem_IInnerDebt_IItem;

  //context
  const { toggleSnackBar } = useGlobalContext();

  useEffect(() => {
    getAllItems();
    getAllInnerDebtsItems();
  }, []);

  async function getAllInnerDebtsItems() {
    const innerDebtsItemsDB = await internalDebtsManager.getInternalDebtsItems(
      innerDebtId
    );
    setInnerDebtsItems(innerDebtsItemsDB);
  }

  async function getAllItems() {
    const itemsDB = await itemsManager.getAllItems();
    const dropDownItems = itemsManager.getDropDownItems(itemsDB);
    setItems(itemsDB);
    setDropDownItems(dropDownItems);
  }

  function setNewItemQuantity(value: string) {
    newInnerDebtsItem.innerDebtItemQuantity = Number(value);
  }

  function setInnerDebtsItem(id: number) {
    const currentItem = items.find((i) => i.itemId === id);
    newInnerDebtsItem.innerDebtItem_ItemId = id;
    newInnerDebtsItem.itemName = currentItem?.itemName || "";
  }

  function toggleAddItem(value: boolean) {
    setShowAddItem(value);
  }

  async function handleAddItem() {
    const currentItem = items.find(
      (i) => i.itemId === newInnerDebtsItem.innerDebtItem_ItemId
    );
    newInnerDebtsItem.innerDebtItem_InnerDebtId = innerDebtId;
    newInnerDebtsItem.innerDebtItemTotalPrice =
      newInnerDebtsItem.innerDebtItemQuantity *
      (Number(currentItem?.itemPrice) || 0);

    if (!handleExistingItem()) {
      const result = await internalDebtsManager.addInternalDebtItem(
        newInnerDebtsItem
      );
      if (!result.success) {
        return toggleSnackBar({
          visible: true,
          text: result.message,
          type: "error",
        });
      }
      if (result.data) {
        newInnerDebtsItem.innerDebtItemId = result.data;
        setInnerDebtsItems((prev) => [...prev, newInnerDebtsItem]);
      }
    }

    setShowAddItem(false);
  }

  function handleDeleteItem(id: number) {
    Alert.alert(
      i18n.t("remove-product"),
      i18n.t("are-you-sureyou-want-to-remove-this-product"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteInnerDebtItem(id) },
      ]
    );
  }

  async function deleteInnerDebtItem(id: number) {
    const result = await internalDebtsManager.deleteInternalDebtItem(id);
    if (result?.success) {
      return setInnerDebtsItems((prev) =>
        prev.filter((i) => i.innerDebtItemId !== id)
      );
    }
    return toggleSnackBar({
      visible: true,
      text: result.message,
      type: "error",
    });
  }

  function handleExistingItem() {
    const currentItem = items.find(
      (i) => i.itemId === newInnerDebtsItem.innerDebtItem_ItemId
    );
    const itemAlreadyExists = innerDebtsItems.some(
      (i) => i.innerDebtItem_ItemId === currentItem?.itemId
    );
    if (itemAlreadyExists) {
      setInnerDebtsItems((prev) => {
        const existingItem = prev.find(
          (i) => i.innerDebtItem_ItemId === currentItem?.itemId
        );
        if (!existingItem) return prev;
        existingItem.innerDebtItemQuantity +=
          newInnerDebtsItem.innerDebtItemQuantity;
        existingItem.innerDebtItemTotalPrice =
          existingItem.innerDebtItemTotalPrice +
          newInnerDebtsItem.innerDebtItemQuantity *
            (Number(currentItem?.itemPrice) || 0);
        return prev;
      });
      Alert.alert(
        i18n.t("warning"),
        i18n.t("product-alreadyexists-quantity-updated")
      );
    }
    return itemAlreadyExists;
  }

  return {
    items,
    dropDownItems,
    innerDebtsItems,
    newInnerDebtsItem,
    setInnerDebtsItem,
    setNewItemQuantity,
    showAddItem,
    handleAddItem,
    toggleAddItem,
    handleDeleteItem,
  };
}
