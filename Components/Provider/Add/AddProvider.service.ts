import useGlobalContext from "@/Global/Context/ContextProvider";
import { useState } from "react";
import Provider from "@/Global/Models/Provider";
import IAddProviderProps from "@/Global/ViewModels/Providers/IAddProviderProps";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import ProviderManager from "@/Global/Services/provider.service";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";

export default function useAddProviderService({
  toggleModal,
  addToProvidersList,
}: IAddProviderProps) {
  //services
  const providerManager = new ProviderManager();

  //states
  const [provider, setProvider] = useState<IProvider>({} as IProvider);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
  const { toggleSnackBar } = useGlobalContext();

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
        setValidation({
          visible: true,
          text: i18n.t("please-enter-provider-name"),
        });
        return;
      }
      if (!provider.providerPhoneNumber) {
        setValidation({
          visible: true,
          text: i18n.t("enter-phone-number"),
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
          text: i18n.t("error-adding-provider"),
          type: "error",
        });
      provider.providerId = result?.lastInsertRowId;
      addToProvidersList(provider);
      toggleModal();
      toggleSnackBar({
        visible: true,
        text: i18n.t("provider-added-successfully"),
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    provider,
    validation,
    setProviderName,
    setProviderPhoneNumber,
    setProviderNotes,
    addProvider,
  };
}
