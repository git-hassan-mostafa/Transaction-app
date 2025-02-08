import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useEffect, useState } from "react";
import IItem, { IAddItemProps } from "./AddItemFormComponent.types";
import Item from "@/Global/Models/Item";
import DropDownItem from "@/Global/Models/Types/DropDownItem";

export default function useAddItemFormComponentService({
  toggleModal,
  addToItemsList,
}: IAddItemProps) {
  const [item, setItem] = useState<IItem>({} as IItem);
  const [providers, setProviders] = useState<DropDownItem[]>([]);
  const { itemManager, toggleSnackBar, providerManager } = useContextProvider();

  useEffect(() => {
    getAllProviders();
  }, []);

  async function getAllProviders() {
    const providers = await providerManager.getAllProviders();
    setProviders([
      { label: "", value: undefined },
      ...(providers?.map((p) => {
        return { label: p.name, value: p.id };
      }) as DropDownItem[]),
    ]);
  }

  function setItemName(value: string) {
    setItem((prev) => {
      return { ...prev, name: value };
    });
  }

  function setItemQuantity(value: string) {
    setItem((prev) => {
      return { ...prev, quantity: Number(value) };
    });
  }

  function setItemPrice(value: string) {
    setItem((prev) => {
      return { ...prev, price: Number(value) };
    });
  }

  function setProvider(providerId: number) {
    setItem((prev) => {
      return { ...prev, providerId };
    });
  }

  async function addItem() {
    if (!item.name) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال اسم البضاعة",
        type: "error",
      });
      return;
    }
    if (!item.price) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال السعر",
        type: "error",
      });
      return;
    }
    const newItem: Item = {
      name: item?.name.trim(),
      quantity: item.quantity,
      price: item.price,
      providerId: item.providerId,
    };
    const result = await itemManager.addItem(newItem);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    newItem.id = result?.lastInsertRowId;
    addToItemsList(newItem);
    toggleModal();
  }

  return {
    item,
    providers,
    setItemName,
    setItemQuantity,
    setItemPrice,
    setProvider,
    addItem,
  };
}
