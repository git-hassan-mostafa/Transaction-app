import useGlobalContext from "@/Global/Context/ContextProvider";
import Mapper from "@/Global/Helpers/MapService";
import InnerDebtItem_InnerDebt_Item from "@/Global/Models/RelationModels/InnerDebtItem_InnerDebt_Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IItem from "@/Global/ViewModels/Items/IItem";
import IInnerDebtItem_IInnerDebt_IItem from "@/Global/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import i18n from "@/Global/I18n/I18n";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import InnerDebtItem from "@/Global/Models/InnerDebtItem";
import IInternalDebtProductsListProps from "@/Global/ViewModels/InnerDebts/IInnerDebtsItemsListProps";
import ItemManager from "@/Global/DAL/items.service";
import InnerDebtItemsManager from "@/Global/DAL/innerDebtItems.service";

export default function useInternalDebtProductsListService(
  innerDebtId: number
): IInternalDebtProductsListProps {
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
      newInnerDebtsItem.innerDebtItemQuantity *
      (Number(currentItem?.itemPrice) || 0);

    if (!handleExistingItem()) {
      const innerDebtItemToAdd: Partial<InnerDebtItem> = {
        InnerDebtItemQuantity: newInnerDebtsItem.innerDebtItemQuantity,
        InnerDebtItem_InnerDebtId: newInnerDebtsItem.innerDebtItem_InnerDebtId,
        InnerDebtItem_ItemId: newInnerDebtsItem.innerDebtItem_ItemId,
      };
      const itemsResult = await innerDebtItemsManager.addInnerDebtItem(
        innerDebtItemToAdd
      );
      if (!itemsResult) {
        return toggleSnackBar({
          visible: true,
          text: i18n.t("failed-adding-products"),
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
    const result = await innerDebtItemsManager.deleteInnerDebtItem(id);
    if ((result?.changes || 0) > 0) {
      return setInnerDebtsItems((prev) =>
        prev.filter((i) => i.innerDebtItemId !== id)
      );
    }
    return toggleSnackBar({
      visible: true,
      text: i18n.t("failed-deleting-product"),
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
