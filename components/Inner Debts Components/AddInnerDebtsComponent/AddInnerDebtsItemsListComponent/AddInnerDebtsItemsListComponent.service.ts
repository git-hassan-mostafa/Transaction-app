import Mapper from "@/Global/Helpers/MapService";
import i18n from "@/Global/I18n/I18n";
import ItemManager from "@/Global/Services/items.service";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IItem from "@/Global/ViewModels/Items/IItem";
import IInnerDebtItem_IInnerDebt_IItem from "@/Global/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useAddInnerDebtsItemsListComponentService() {
  //managers
  const itemManager = new ItemManager();
  const mapper = new Mapper();
  //states
  const [items, setItems] = useState<IItem[]>([]);
  const [dropDownItems, setDropDownItems] = useState<IDropDownItem[]>([]);
  const [innerDebtsItems, setInnerDebtsItems] = useState<
    IInnerDebtItem_IInnerDebt_IItem[]
  >([]);
  const [showAddItem, setShowAddItem] = useState(false);
  var newInnerDebtsItem: IInnerDebtItem_IInnerDebt_IItem =
    {} as IInnerDebtItem_IInnerDebt_IItem;

  useEffect(() => {
    getAllItems();
  }, []);

  async function getAllItems() {
    const itemsDB = await itemManager.getAllItems();
    const items = itemsDB?.map((i) => mapper.mapToIItem(i)) || [];
    setItems(items as IItem[]);
    setDropDownItems(
      items.map((i) => ({ value: i.itemId, label: i.itemName }))
    );
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

  function handleAddItem() {
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
        return prev;
      });
      Alert.alert(
        i18n.t("warning"),
        i18n.t("product-alreadyexists-quantity-updated")
      );
    } else {
      newInnerDebtsItem.innerDebtItemId = Date.now();
      newInnerDebtsItem.innerDebtItemTotalPrice =
        newInnerDebtsItem.innerDebtItemQuantity * (currentItem?.itemPrice || 0);
      setInnerDebtsItems((prev) => [...prev, newInnerDebtsItem]);
    }
    setShowAddItem(false);

    // bug in quantity
  }

  function handleDeleteItem(id: number) {
    setInnerDebtsItems((prev) => prev.filter((i) => i.innerDebtItemId !== id));
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
