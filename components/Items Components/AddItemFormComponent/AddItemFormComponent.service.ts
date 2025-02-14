import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useEffect, useState } from "react";
import Item from "@/Global/Models/Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import ProviderManager from "@/Global/Services/provider.service";
import ItemManager from "@/Global/Services/items.service";
import IAddItemProps from "@/Global/ViewModels/Items/IAddItemProps";
import IItem from "@/Global/ViewModels/Items/IItem";
import MapService from "@/Global/Helpers/MapService";

export default function useAddItemFormComponentService({
  toggleModal,
  addToItemsList,
}: IAddItemProps) {
  // services
  const providerManager = new ProviderManager();
  const itemManager = new ItemManager();
  const mapService = new MapService();

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
        return { label: p.name, value: p.id };
      }) as IDropDownItem[]),
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

  function setcustomerNotes(value: string) {
    setItem((prev) => {
      return { ...prev, notes: value };
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
      notes: item.notes,
    };
    const result = await itemManager.addItem(newItem);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    newItem.id = result?.lastInsertRowId;
    const mappedItem = mapService.mapIItem(newItem);
    addToItemsList(mappedItem);
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
