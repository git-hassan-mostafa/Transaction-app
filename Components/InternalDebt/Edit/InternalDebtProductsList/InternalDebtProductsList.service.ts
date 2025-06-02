import useGlobalContext from "@/Global/Context/ContextProvider";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IProduct from "@/ViewModels/Products/IProduct";
import IInnerDebtItem_IInnerDebt_IItem from "@/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import i18n from "@/Global/I18n/I18n";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import IInternalDebtProductsListProps from "@/ViewModels/InnerDebts/IInnerDebtsItemsListProps";
import useService from "@/Global/Context/ServiceProvider";

export default function useInternalDebtProductsListService(
  innerDebtId: number
): IInternalDebtProductsListProps {
  //managers
  const { internalDebtManager, productManager: itemManager } = useService();

  //states
  const [items, setItems] = useState<IProduct[]>([]);
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
    const innerDebtsItemsDB = await internalDebtManager.getInternalDebtsItems(
      innerDebtId
    );
    setInnerDebtsItems(innerDebtsItemsDB);
  }

  async function getAllItems() {
    const itemsDB = await itemManager.getAllProducts();
    const dropDownItems = itemManager.getDropDownItems(itemsDB);
    setItems(itemsDB);
    setDropDownItems(dropDownItems);
  }

  function setNewItemQuantity(value: string) {
    newInnerDebtsItem.innerDebtItemQuantity = Number(value);
  }

  function setInnerDebtsItem(id: number) {
    const currentItem = items.find((i) => i.productId === id);
    newInnerDebtsItem.innerDebtItem_ItemId = id;
    newInnerDebtsItem.productName = currentItem?.productName || "";
  }

  function toggleAddItem(value: boolean) {
    setShowAddItem(value);
  }

  async function handleAddItem() {
    const currentItem = items.find(
      (i) => i.productId === newInnerDebtsItem.innerDebtItem_ItemId
    );
    newInnerDebtsItem.innerDebtItem_InnerDebtId = innerDebtId;
    newInnerDebtsItem.innerDebtItemTotalPrice =
      newInnerDebtsItem.innerDebtItemQuantity *
      (Number(currentItem?.productPrice) || 0);

    if (!handleExistingItem()) {
      const result = await internalDebtManager.addInternalDebtItem(
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
    const result = await internalDebtManager.deleteInternalDebtItem(id);
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
      (i) => i.productId === newInnerDebtsItem.innerDebtItem_ItemId
    );
    const itemAlreadyExists = innerDebtsItems.some(
      (i) => i.innerDebtItem_ItemId === currentItem?.productId
    );
    if (itemAlreadyExists) {
      setInnerDebtsItems((prev) => {
        const existingItem = prev.find(
          (i) => i.innerDebtItem_ItemId === currentItem?.productId
        );
        if (!existingItem) return prev;
        existingItem.innerDebtItemQuantity +=
          newInnerDebtsItem.innerDebtItemQuantity;
        existingItem.innerDebtItemTotalPrice =
          existingItem.innerDebtItemTotalPrice +
          newInnerDebtsItem.innerDebtItemQuantity *
            (Number(currentItem?.productPrice) || 0);
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
