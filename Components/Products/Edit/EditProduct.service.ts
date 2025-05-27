import { useEffect, useState } from "react";
import Item from "@/Models/Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import Mapper from "@/Global/Helpers/MapService";
import IItem from "@/ViewModels/Items/IItem";
import IEditProductProps from "@/ViewModels/Items/IItemFormProps";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import useGlobalContext from "@/Global/Context/ContextProvider";
import i18n from "@/Global/I18n/I18n";
import ProviderManager from "@/DAL/provider.service";
import ItemManager from "@/DAL/items.service";

export default function useEditProductService({
  id,
  updateFromProductsList,
}: IEditProductProps) {
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
    if (!validateProduct()) return;
    const updatedItem: Item = mapper.mapToItem(item);
    const result = await itemManager.updateItem(updatedItem);
    if (!result?.changes)
      return toggleSnackBar({
        visible: true,
        text: i18n.t("error-updating-product"),
        type: "error",
      });
    updateFromProductsList(item);
    toggleSnackBar({
      visible: true,
      text: i18n.t("product-updated-successfully"),
      type: "success",
    });
  }

  function validateProduct() {
    if (!item.itemName) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-product-name"),
      });
      return false;
    }
    if (!item.itemPrice) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-product-price"),
      });
      return false;
    }
    if (!item.itemQuantity || Number(item.itemQuantity) < 1) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-product-quantity"),
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
