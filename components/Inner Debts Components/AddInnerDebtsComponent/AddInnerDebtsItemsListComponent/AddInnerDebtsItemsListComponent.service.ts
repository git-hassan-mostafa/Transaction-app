import ItemManager from "@/Global/Services/items.service";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import InnerDebtsItemItems from "@/Global/ViewModels/RelationModels/IInerDebtsItemItems";
import { useEffect, useState } from "react";

export default function useAddInnerDebtsItemsListComponentService() {
  //managers
  const itemManager = new ItemManager();

  //states
  const [innerDebtsItems, setInnerDebtsItems] = useState<InnerDebtsItemItems[]>(
    []
  );
  const [showAddItem, setShowAddItem] = useState(false);
  const [newInnerDebtsItem, setNewInnerDebtsItems] =
    useState<InnerDebtsItemItems>({} as InnerDebtsItemItems);
  useEffect(() => {
    getAllItems();
  }, []);

  const [items, setItems] = useState<IDropDownItem[]>([]);

  async function getAllItems() {
    const itemsDB = await itemManager.getAllItems();
    setItems([
      ...(itemsDB?.map((i) => {
        return { label: i.Name, value: i.ItemId };
      }) as IDropDownItem[]),
    ]);
  }

  function setNewItemPrice(value: string) {
    setNewInnerDebtsItems((prev) => ({ ...prev, price: Number(value) }));
  }

  function setNewItemQuantity(value: string) {
    setNewInnerDebtsItems((prev) => ({
      ...prev,
      innerDebtQuantity: Number(value),
    }));
  }

  function setInnerDebtsItem(id: number) {
    const itemName = items.find((i) => i.value === id)?.label.toString() || "";
    setNewInnerDebtsItems((prev) => {
      return { ...prev, id, innerDebtId: id, itemName };
    });
  }

  function toggleAddItem(value: boolean) {
    setShowAddItem(value);
  }

  function handleAddItem() {
    setInnerDebtsItems((prev) => [...prev, newInnerDebtsItem]);
    setShowAddItem(false);
  }

  function handleDeleteItem() {}
  return {
    items,
    innerDebtsItems,
    newInnerDebtsItem,
    setInnerDebtsItem,
    setNewItemPrice,
    setNewItemQuantity,
    showAddItem,
    handleAddItem,
    toggleAddItem,
    handleDeleteItem,
  };
}
