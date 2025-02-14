import { useEffect, useState } from "react";
import Item from "@/Global/Models/Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import ProviderManager from "@/Global/Services/provider.service";
import ItemManager from "@/Global/Services/items.service";
import MapService from "@/Global/Helpers/MapService";
import IItem from "@/Global/ViewModels/Items/IItem";
import IItemFormProps from "@/Global/ViewModels/Items/IItemFormProps";

export default function useItemFormComponentService({
  id,
  updateFromItemsList,
}: IItemFormProps) {
  //services
  const providerManager = new ProviderManager();
  const itemManager = new ItemManager();
  const mapService = new MapService();

  //states
  const [item, setItem] = useState<IItem>({} as IItem);
  const [providers, setProviders] = useState<IDropDownItem[]>([]);

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
      }) as IDropDownItem[]),
    ];
    setProviders(sortedProviders);
  }

  async function getItem() {
    const itemDB = await itemManager.getItem(id);
    if (!itemDB) return;
    const item = mapService.mapIItem(itemDB);
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

  function setItemNotes(value: string) {
    setItem((prev) => {
      return { ...prev, notes: value };
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

  async function updateItemNotes() {
    updateItem();
  }

  async function updateItemProvider(providerId: number) {
    itemManager.updateProviderId(item.id, providerId);
  }

  async function updateItem() {
    validateItemFields(item);
    const updatedItem: Item = mapService.mapItem(item);
    const result = await itemManager.updateItem(updatedItem);
    if ((result?.changes || 0) > 0) updateFromItemsList(item);
  }

  function validateItemFields(item: IItem) {
    item.id = id;
  }

  return {
    item,
    providers,
    setItemName,
    setItemPrice,
    setItemQuantity,
    setProvider,
    setItemNotes,
    updateItemName,
    updateItemPrice,
    updateItemQuantity,
    updateItemProvider,
    updateItemNotes,
  };
}
