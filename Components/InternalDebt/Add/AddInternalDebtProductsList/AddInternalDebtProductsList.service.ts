import InnerDebtItemsManager from "@/DAL/innerDebtItems.service";
import ItemManager from "@/DAL/items.service";
import Mapper from "@/Global/Helpers/MapService";
import i18n from "@/Global/I18n/I18n";
import InnerDebtItem_InnerDebt_Item from "@/Models/RelationModels/InnerDebtItem_InnerDebt_Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IInnerDebtsProductsListProps from "@/ViewModels/InnerDebts/IInnerDebtsItemsListProps";
import IItem from "@/ViewModels/Items/IItem";
import IInnerDebtItem_IInnerDebt_IItem from "@/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useAddInternalDebtProductsList(): IInnerDebtsProductsListProps {
  //managers
  const itemManager = new ItemManager();
  const innerDebtItemsManager = new InnerDebtItemsManager();
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
    newInnerDebtsItem.innerDebtItemId = Date.now();
    newInnerDebtsItem.innerDebtItemTotalPrice =
      newInnerDebtsItem.innerDebtItemQuantity *
      (Number(currentItem?.itemPrice) || 0);

    if (!handleExistingItem())
      setInnerDebtsItems((prev) => [...prev, newInnerDebtsItem]);
    setShowAddItem(false);
  }

  function handleDeleteItem(id: number) {
    setInnerDebtsItems((prev) => prev.filter((i) => i.innerDebtItemId !== id));
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

  async function refreshInnerDebtsItems(innerDebtId: number) {
    const innerDebtsItemsDB = await innerDebtItemsManager.getInnerDebtItems(
      innerDebtId
    );
    const mappedItems = (
      innerDebtsItemsDB as InnerDebtItem_InnerDebt_Item[]
    ).map((item) => {
      var i = mapper.mapTo_IInnerDebtItem_IInnerDebt_IItem(item);
      i.innerDebtItemTotalPrice =
        i.innerDebtItemQuantity * (Number(i?.itemPrice) || 0);
      return i;
    });
    setInnerDebtsItems(mappedItems);
  }

  return {
    items,
    dropDownItems,
    innerDebtsItems,
    newInnerDebtsItem,
    showAddItem,
    setInnerDebtsItem,
    setNewItemQuantity,
    handleAddItem,
    toggleAddItem,
    handleDeleteItem,
    refreshInnerDebtsItems,
  };
}
