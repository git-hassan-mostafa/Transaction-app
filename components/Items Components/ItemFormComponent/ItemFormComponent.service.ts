import { useEffect, useState } from "react";
import Item from "@/Global/Models/Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import ProviderManager from "@/Global/Services/provider.service";
import ItemManager from "@/Global/Services/items.service";
import Mapper from "@/Global/Helpers/MapService";
import IItem from "@/Global/ViewModels/Items/IItem";
import IItemFormProps from "@/Global/ViewModels/Items/IItemFormProps";

export default function useItemFormComponentService({
  id,
  updateFromItemsList,
}: IItemFormProps) {
  //services
  const providerManager = new ProviderManager();
  const itemManager = new ItemManager();
  const mapper = new Mapper();

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
        return { label: p.Name, value: p.ProviderId };
      }) as IDropDownItem[]),
    ];
    setProviders(sortedProviders);
  }

  async function getItem() {
    const itemDB = await itemManager.getItem(id);
    if (!itemDB) return;
    const item = mapper.mapToIItem(itemDB);
    setItem(item);
    return item;
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

  function setItemNotes(value: string) {
    setItem((prev) => {
      return { ...prev, itemNotes: value };
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
    itemManager.updateProviderId(item.itemId, providerId);
  }

  async function updateItem() {
    validateItemFields(item);
    const updatedItem: Item = mapper.mapToItem(item);
    const result = await itemManager.updateItem(updatedItem);
    if ((result?.changes || 0) > 0) updateFromItemsList(item);
  }

  function validateItemFields(item: IItem) {
    item.itemId = id;
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
