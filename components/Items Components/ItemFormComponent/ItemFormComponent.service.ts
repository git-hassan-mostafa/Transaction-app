import { useEffect, useState } from "react";
import Item from "@/Global/Models/Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import ProviderManager from "@/Global/Services/provider.service";
import ItemManager from "@/Global/Services/items.service";
import Mapper from "@/Global/Helpers/MapService";
import IItem from "@/Global/ViewModels/Items/IItem";
import IItemFormProps from "@/Global/ViewModels/Items/IItemFormProps";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import useGlobalContext from "@/Global/Context/ContextProvider";

export default function useItemFormComponentService({
  id,
  updateFromItemsList,
}: IItemFormProps) {
  //services
  const providerManager = new ProviderManager();
  const itemManager = new ItemManager();
  const mapper = new Mapper();

  const [item, setItem] = useState<IItem>({} as IItem);
  const [providers, setProviders] = useState<IDropDownItem[]>([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  const { toggleSnackBar } = useGlobalContext();
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
      return { ...prev, itemQuantity: Number(value).toString() };
    });
  }

  function setItemPrice(value: string) {
    setItem((prev) => {
      return { ...prev, itemPrice: value };
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

  async function updateItem() {
    if (!validateItem()) return;
    const updatedItem: Item = mapper.mapToItem(item);
    const result = await itemManager.updateItem(updatedItem);
    if (!result?.changes)
      return toggleSnackBar({
        visible: true,
        text: "Error adding item",
        type: "error",
      });
    updateFromItemsList(item);
    toggleSnackBar({
      visible: true,
      text: "Item updated successfully",
      type: "success",
    });
  }

  function validateItem() {
    if (!item.itemName) {
      setValidation({
        visible: true,
        text: "please enter item name",
      });
      return false;
    }
    if (!item.itemPrice) {
      setValidation({
        visible: true,
        text: "please enter item price",
      });
      return false;
    }
    if (!item.itemQuantity) {
      setValidation({
        visible: true,
        text: "please enter item Quantity",
      });
      return false;
    }
    return true;
  }

  return {
    item,
    validation,
    providers,
    updateItem,
    setItemName,
    setItemPrice,
    setItemQuantity,
    setProvider,
    setItemNotes,
  };
}
