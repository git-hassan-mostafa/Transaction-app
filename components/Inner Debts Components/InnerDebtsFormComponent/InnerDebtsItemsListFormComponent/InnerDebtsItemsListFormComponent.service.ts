import useGlobalContext from "@/Global/Context/ContextProvider";
import Mapper from "@/Global/Helpers/MapService";
import InnerDebtItem_InnerDebt_Item from "@/Global/Models/RelationModels/InnerDebtItem_InnerDebt_Item";
import InnerDebtItemsManager from "@/Global/Services/innerDebtItems.service";
import ItemManager from "@/Global/Services/items.service";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IItem from "@/Global/ViewModels/Items/IItem";
import IInnerDebtItem_IInnerDebt_IItem from "@/Global/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import i18n from "@/Global/I18n/I18n";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useInnerDebtsItemsListFormComponentService(
  innerDebtId: number
) {
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

  //context
  const { toggleSnackBar } = useGlobalContext();

  useEffect(() => {
    getAllItems();
    getAllInnerDebtsItems();
  }, []);

  async function getAllInnerDebtsItems() {
    const innerDebtsItemsDB = await innerDebtItemsManager.getInnerDebtItems(
      innerDebtId
    );
    const item = items?.find((i) => i.itemId === item.itemId) as IItem;
    const mappedItems = (
      innerDebtsItemsDB as InnerDebtItem_InnerDebt_Item[]
    ).map((item) => {
      var i = mapper.mapTo_IInnerDebtItem_IInnerDebt_IItem(item);
      i.innerDebtItemTotalPrice = i.innerDebtItemQuantity * (i?.itemPrice ?? 0);
      return i;
    });
    setInnerDebtsItems(mappedItems);
  }

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

  async function handleAddItem() {
    const currentItem = items.find(
      (i) => i.itemId === newInnerDebtsItem.innerDebtItem_ItemId
    );
    newInnerDebtsItem.innerDebtItem_InnerDebtId = innerDebtId;
    newInnerDebtsItem.innerDebtItemTotalPrice =
      newInnerDebtsItem.innerDebtItemQuantity * (currentItem?.itemPrice || 0);
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
      Alert.alert(i18n.t("warning"), i18n.t("item-already-exists"));
    } else {
      const mappedInnerDebtItem = [
        mapper.mapToInnerDebtItem(newInnerDebtsItem),
      ];
      const itemsResult = await innerDebtItemsManager.addInnerDebtItems(
        mappedInnerDebtItem
      );
      if (!itemsResult) {
        return toggleSnackBar({
          visible: true,
          text: i18n.t("failed-add-items"),
          type: "error",
        });
      }
      if (itemsResult.lastInsertRowId) {
        newInnerDebtsItem.innerDebtItemId = itemsResult.lastInsertRowId;
        setInnerDebtsItems((prev) => [...prev, newInnerDebtsItem]);
      }
    }
    setShowAddItem(false);
  }

  function handleDeleteItem(id: number) {
    Alert.alert(i18n.t("remove-item"), i18n.t("are-you-sure-remove-item"), [
      {
        text: i18n.t("cancel"),
        style: "cancel",
      },
      { text: i18n.t("confirm"), onPress: () => deleteInnerDebtItem(id) },
    ]);
  }

  async function deleteInnerDebtItem(id: number) {
    const result = await innerDebtItemsManager.deleteInnerDebtItem(id);
    if ((result?.changes || 0) > 0) {
      return setInnerDebtsItems((prev) =>
        prev.filter((i) => i.innerDebtItemId !== id)
      );
    }
    return toggleSnackBar({
      visible: true,
      text: i18n.t("failed-delete-item"),
      type: "error",
    });
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
