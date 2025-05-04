import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useEffect, useState } from "react";
import Item from "@/Global/Models/Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import ProviderManager from "@/Global/Services/provider.service";
import ItemManager from "@/Global/Services/items.service";
import IAddItemProps from "@/Global/ViewModels/Items/IAddItemProps";
import IItem from "@/Global/ViewModels/Items/IItem";

export default function useAddItemFormComponentService({
  toggleModal,
  addToItemsList,
}: IAddItemProps) {
  // services
  const providerManager = new ProviderManager();
  const itemManager = new ItemManager();

  //states
  const [item, setItem] = useState<IItem>({} as IItem);
  const [providers, setProviders] = useState<IDropDownItem[]>([]);

  //context
  const { toggleSnackBar } = useContextProvider();

  useEffect(() => {
    getAllProviders();
  }, []);

  async function getAllProviders() {
    const providers = await providerManager.getAllProviders();
    setProviders([
      { label: "", value: undefined },
      ...(providers?.map((p) => {
        return { label: p.Name, value: p.ProviderId };
      }) as IDropDownItem[]),
    ]);
  }

  function setItemName(value: string) {
    setItem((prev) => {
      return { ...prev, itemName: value };
    });
  }

  function setItemQuantity(value: string) {
    setItem((prev) => {
      return { ...prev, itemQuantity: Number(value) };
    });
  }

  function setItemPrice(value: string) {
    setItem((prev) => {
      return { ...prev, itemPrice: Number(value) };
    });
  }

  function setProvider(providerId: number) {
    setItem((prev) => {
      return { ...prev, item_ProviderId: providerId };
    });
  }

  function setcustomerNotes(value: string) {
    setItem((prev) => {
      return { ...prev, itemNotes: value };
    });
  }

  async function addItem() {
    if (!item.itemName) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال اسم البضاعة",
        type: "error",
      });
      return;
    }
    if (!item.itemPrice) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال السعر",
        type: "error",
      });
      return;
    }
    const newItem: Item = {
      Name: item?.itemName.trim(),
      Quantity: item.itemQuantity,
      Price: item.itemPrice,
      Item_ProviderId: item.item_ProviderId,
      Notes: item.itemNotes,
    };
    const result = await itemManager.addItem(newItem);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    item.itemId = result?.lastInsertRowId;
    addToItemsList(item);
    toggleModal();
  }

  return {
    item,
    providers,
    setItemName,
    setItemQuantity,
    setItemPrice,
    setProvider,
    setcustomerNotes,
    addItem,
  };
}
