import { useEffect, useState } from "react";
import useContextProvider from "@/Global/ContextApi/ContextApi";
import IItem, { IItemProps } from "./ItemFormComponent.types";
import Item from "@/Global/Models/Item";
import DropDownItem from "@/Global/Models/Types/DropDownItem";

export default function useItemFormComponentService({
  id,
  updateFromItemsList,
}: IItemProps) {
  const [item, setItem] = useState<IItem>({} as IItem);
  const [providers, setProviders] = useState<DropDownItem[]>([]);
  const { itemManager, providerManager } = useContextProvider();

  useEffect(() => {
    getItem();
    getAllProviders();
  }, []);

  async function getAllProviders() {
    const providers = await providerManager.getAllProviders();
    const sortedProviders = [
      { label: "", value: undefined },
      ...(providers?.map((p) => {
        return { label: p.name, value: p.id };
      }) as DropDownItem[]),
    ];
    setProviders(sortedProviders);
  }

  async function getItem() {
    const itemDB = await itemManager.getItem(id);
    if (!itemDB) return;
    const item = mapIItem(itemDB);
    setItem(item);
    return item;
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
      return { ...prev, providerId: providerId };
    });
  }

  async function updateItemName() {
    updateItem();
  }

  async function updateItemQuantity() {
    updateItem();
  }

  async function updateItemPrice() {
    updateItem();
  }

  async function updateItemProvider(providerId: number) {
    itemManager.updateProviderId(item.id, providerId);
  }

  async function updateItem() {
    validateItemFields(item);
    const updatedItem: Item = mapItem(item);
    const result = await itemManager.updateItem(updatedItem);
    if ((result?.changes || 0) > 0) updateFromItemsList(updatedItem);
  }

  function validateItemFields(item: IItem) {
    item.id = id;
  }

  function mapItem(item: IItem): Item {
    return {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      providerId: item.providerId,
    };
  }

  function mapIItem(item: Item): IItem {
    return {
      id: item.id as number,
      name: item.name as string,
      quantity: item.quantity as number,
      price: item.price as number,
      providerId: item.providerId as number,
    };
  }

  return {
    item,
    providers,
    setItemName,
    setItemPrice,
    setItemQuantity,
    setProvider,
    updateItemName,
    updateItemPrice,
    updateItemQuantity,
    updateItemProvider,
  };
}
