import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useState } from "react";
import { IAddProviderProps } from "./AddProviderFormComponent.types";
import IProvider from "./AddProviderFormComponent.types";
import Provider from "@/Global/Models/Provider";

export default function useAddProviderFormComponentService({
  toggleModal,
  addToProvidersList,
}: IAddProviderProps) {
  const [provider, setProvider] = useState<IProvider>({} as IProvider);

  const { providerManager, toggleSnackBar } = useContextProvider();

  function setProviderName(value: string) {
    setProvider((prev) => {
      return { ...prev, name: value };
    });
  }

  function setProviderPhoneNumber(value: string) {
    setProvider((prev) => {
      return { ...prev, phoneNumber: value };
    });
  }

  function setProviderNotes(value: string) {
    setProvider((prev) => {
      return { ...prev, notes: value };
    });
  }

  async function addProvider() {
    try {
      if (!provider.name) {
        toggleSnackBar({
          visible: true,
          text: "الرجاء ادخال اسم التاجر",
          type: "error",
        });
        return;
      }
      if (!provider.phoneNumber) {
        toggleSnackBar({
          visible: true,
          text: "الرجاء ادخال رقم الهاتف ",
          type: "error",
        });
        return;
      }
      const newProvider: Provider = {
        name: provider?.name.trim(),
        phoneNumber: provider.phoneNumber.trim(),
        borrowedPrice: 0,
        payedPrice: 0,
        notes: provider.notes,
      };
      const result = await providerManager.addProvider(newProvider);
      if (!result || !result.lastInsertRowId)
        return toggleSnackBar({
          visible: true,
          text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
          type: "error",
        });
      newProvider.id = result?.lastInsertRowId;
      addToProvidersList(newProvider);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    provider,
    setProviderName,
    setProviderPhoneNumber,
    setProviderNotes,
    addProvider,
  };
}
