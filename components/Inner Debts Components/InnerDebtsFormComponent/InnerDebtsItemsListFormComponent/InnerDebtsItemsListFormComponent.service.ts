import useGlobalContext from "@/Global/Context/ContextProvider";
import MapService from "@/Global/Helpers/MapService";
import InnerDebtItem from "@/Global/Models/InnerDebtItem";
import Item from "@/Global/Models/Item";
import InnerDebtItem_InnerDebt_Item from "@/Global/Models/RelationModels/InnerDebtItem_InnerDebt_Item";
import InnerDebtItemsManager from "@/Global/Services/innerDebtItems.service";
import ItemManager from "@/Global/Services/items.service";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IItem from "@/Global/ViewModels/Items/IItem";
import IInnerDebtItem_IInnerDebt_IItem from "@/Global/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useInnerDebtsItemsListFormComponentService(
  innerDebtId: number
) {
  //managers
  const itemManager = new ItemManager();
  const innerDebtItemsManager = new InnerDebtItemsManager();
  const map = new MapService();

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
      var i = map.mapTo_IInnerDebtItem_IInnerDebt_IItem(item);
      i.itemPrice = i.innerDebtItemQuantity * (item?.Price ?? 0);
      return i;
    });
    setInnerDebtsItems(mappedItems);
  }

  async function getAllItems() {
    const itemsDB = await itemManager.getAllItems();
    const items = itemsDB?.map((i) => map.mapToIItem(i)) || [];
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
    newInnerDebtsItem.itemPrice =
      newInnerDebtsItem.innerDebtItemQuantity * (currentItem?.itemPrice || 0);
    setInnerDebtsItems((prev) => [...prev, newInnerDebtsItem]);
    setShowAddItem(false);
    const mappedInnerDebtItem = [map.mapToInnerDebtItem(newInnerDebtsItem)];
    const itemsResult = await innerDebtItemsManager.addInnerDebtItems(
      mappedInnerDebtItem
    );
    if (!itemsResult) {
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما في حفظ المنتجات , الرجاء اعادة المحاولة ",
        type: "error",
      });
    }
  }

  function handleDeleteItem(id: number) {
    Alert.alert(
      "ازالة من القائمة",
      "هل أنت متأكد أنك تريد ازالة هذا المنتج من القائمة؟",
      [
        {
          text: "الغاء",
          style: "cancel",
        },
        { text: "تأكيد", onPress: () => deleteInnerDebtItem(id) },
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
      text: "حصل خطأ ما في ازالة المنتج , الرجاء اعادة المحاولة ",
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
