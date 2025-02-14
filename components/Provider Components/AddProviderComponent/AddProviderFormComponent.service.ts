import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useState } from "react";
import Provider from "@/Global/Models/Provider";
import IAddProviderProps from "@/Global/ViewModels/Providers/IAddProviderProps";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import ProviderManager from "@/Global/Services/provider.service";
import MapService from "@/Global/Helpers/MapService";

export default function useAddProviderFormComponentService({
  toggleModal,
  addToProvidersList,
}: IAddProviderProps) {
  //services
  const providerManager = new ProviderManager();
  const mapService = new MapService();

  //states
  const [provider, setProvider] = useState<IProvider>({} as IProvider);

  //context
  const { toggleSnackBar } = useContextProvider();

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
      const mappedProvider = mapService.mapIProvider(newProvider);
      addToProvidersList(mappedProvider);
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
