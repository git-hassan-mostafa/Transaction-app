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
  innerDebtId: number | undefined
): IInternalDebtProductsListProps {
  //managers
  const { internalDebtManager, productManager } = useService();

  //states
  const [items, setItems] = useState<IProduct[]>([]);
  const [dropDownItems, setDropDownItems] = useState<IDropDownItem[]>([]);
  const [innerDebtsItems, setInnerDebtsItems] = useState<
    IInnerDebtItem_IInnerDebt_IItem[]
  >([]);

  const [showAddItem, setShowAddItem] = useState(false);
  var newInnerDebtsItem: IInnerDebtItem_IInnerDebt_IItem =
    {} as IInnerDebtItem_IInnerDebt_IItem;

  useEffect(() => {
    getAllItems();
    getAllInnerDebtsItems();
  }, []);

  async function getAllInnerDebtsItems() {
    if (!innerDebtId) return;
    const innerDebtsItemsDB = await internalDebtManager.getInternalDebtsItems(
      innerDebtId
    );
    setInnerDebtsItems(innerDebtsItemsDB);
  }

  async function getAllItems() {
    const itemsDB = await productManager.getAllProducts();
    const dropDownItems = productManager.getDropDownItems(itemsDB);
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
    newInnerDebtsItem.isNew = true;
    newInnerDebtsItem.innerDebtItemId = Date.now();
    if (innerDebtId) {
      newInnerDebtsItem.innerDebtItem_InnerDebtId = innerDebtId;
    }
    newInnerDebtsItem.innerDebtItemTotalPrice =
      newInnerDebtsItem.innerDebtItemQuantity *
      (Number(currentItem?.productPrice) || 0);

    if (!handleExistingItem()) {
      setInnerDebtsItems((prev) => [...prev, newInnerDebtsItem]);
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
    return setInnerDebtsItems((prev) =>
      prev.filter((i) => i.innerDebtItemId !== id)
    );
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
        const newItem = existingItem;
        if (!newItem) return prev;
        newItem.innerDebtItemQuantity +=
          newInnerDebtsItem.innerDebtItemQuantity;
        newItem.innerDebtItemTotalPrice =
          newItem.innerDebtItemTotalPrice +
          newInnerDebtsItem.innerDebtItemQuantity *
            (Number(currentItem?.productPrice) || 0);
        const result = [
          ...prev.filter(
            (i) => i.innerDebtItem_ItemId !== currentItem?.productId
          ),
          newItem,
        ];
        return result;
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
