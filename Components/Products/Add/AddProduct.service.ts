import useGlobalContext from "@/Global/Context/ContextProvider";
import { useEffect, useState } from "react";
import Item from "@/Global/Models/Item";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import ProviderManager from "@/Global/Services/provider.service";
import ItemManager from "@/Global/Services/items.service";
import IAddProductProps from "@/Global/ViewModels/Items/IAddItemProps";
import IItem from "@/Global/ViewModels/Items/IItem";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import Mapper from "@/Global/Helpers/MapService";

export default function useAddProductService({
  toggleModal,
  addToItemsList,
}: IAddProductProps) {
  // services
  const providerManager = new ProviderManager();
  const itemManager = new ItemManager();
  const map = new Mapper();

  //states
  const item: IItem = {} as IItem;
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
    item.itemName = value;
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
    if (!item.itemName) {
      setValidation({
        visible: true,
        text: "please enter item name",
      });
      return;
    }
    if (!item.itemPrice) {
      setValidation({
        visible: true,
        text: "please enter item price",
      });
      return;
    }
    if (!item.itemQuantity) {
      setValidation({
        visible: true,
        text: "please enter item Quantity",
      });
      return;
    }
    const newItem: Item = map.mapToItem(item);
    const result = await itemManager.addItem(newItem);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "Error adding item",
        type: "error",
      });
    item.itemId = result?.lastInsertRowId;
    addToItemsList(item);
    toggleModal();
    toggleSnackBar({
      visible: true,
      text: "Item added successfully",
      type: "success",
    });
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
