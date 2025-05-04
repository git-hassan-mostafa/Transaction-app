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
      return { ...prev, providerName: value };
    });
  }

  function setProviderPhoneNumber(value: string) {
    setProvider((prev) => {
      return { ...prev, providerPhoneNumber: value };
    });
  }

  function setProviderNotes(value: string) {
    setProvider((prev) => {
      return { ...prev, providerNotes: value };
    });
  }

  async function addProvider() {
    try {
      if (!provider.providerName) {
        toggleSnackBar({
          visible: true,
          text: "الرجاء ادخال اسم التاجر",
          type: "error",
        });
        return;
      }
      if (!provider.providerPhoneNumber) {
        toggleSnackBar({
          visible: true,
          text: "الرجاء ادخال رقم الهاتف ",
          type: "error",
        });
        return;
      }
      const newProvider: Provider = {
        Name: provider?.providerName.trim(),
        PhoneNumber: provider.providerPhoneNumber.trim(),
        Notes: provider.providerNotes,
      };
      const result = await providerManager.addProvider(newProvider);
      if (!result || !result.lastInsertRowId)
        return toggleSnackBar({
          visible: true,
          text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
          type: "error",
        });
      provider.providerId = result?.lastInsertRowId;
      addToProvidersList(provider);
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
