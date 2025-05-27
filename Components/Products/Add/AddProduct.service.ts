import useGlobalContext from "@/Global/Context/ContextProvider";
import { useEffect, useState } from "react";
import Item from "@/Global/Models/Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IAddProductProps from "@/Global/ViewModels/Items/IAddItemProps";
import IItem from "@/Global/ViewModels/Items/IItem";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import Mapper from "@/Global/Helpers/MapService";
import i18n from "@/Global/I18n/I18n";
import ProviderManager from "@/Global/DAL/provider.service";
import ItemManager from "@/Global/DAL/items.service";

export default function useAddProductService({
  toggleModal,
  addToItemsList,
}: IAddProductProps) {
  // services
  const providerManager = new ProviderManager();
  const itemManager = new ItemManager();
  const map = new Mapper();

  //states
  const [itemState, setItemState] = useState<IItem>({} as IItem);
  var item: IItem = itemState;
  const [providers, setProviders] = useState<IDropDownItem[]>([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
  const { toggleSnackBar } = useGlobalContext();

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
    item = { ...item, itemName: value };
  }

  function setItemQuantity(value: string) {
    item.itemQuantity = value;
  }

  function setItemPrice(value: string) {
    item.itemPrice = Number(value).toString();
  }

  function setProvider(providerId: number) {
    item.item_ProviderId = providerId;
  }

  function setcustomerNotes(value: string) {
    item.itemNotes = value;
  }

  async function addItem() {
    setItemState(item);
    if (!validateProduct()) return;
    const newItem: Item = map.mapToItem(item);
    const result = await itemManager.addItem(newItem);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: i18n.t("error-adding-product"),
        type: "error",
      });
    item.itemId = result?.lastInsertRowId;
    addToItemsList(item);
    toggleModal();
    toggleSnackBar({
      visible: true,
      text: i18n.t("product-added-successfully"),
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
    if (!item.itemQuantity) {
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
    providers,
    validation,
    setItemName,
    setItemQuantity,
    setItemPrice,
    setProvider,
    setcustomerNotes,
    addItem,
  };
}
