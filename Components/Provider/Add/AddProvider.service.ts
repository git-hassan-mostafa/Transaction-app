import useGlobalContext from "@/Global/Context/ContextProvider";
import { useState } from "react";
import IAddProviderProps from "@/ViewModels/Providers/IAddProviderProps";
import IProvider from "@/ViewModels/Providers/IProvider";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";

export default function useAddProviderService({
  toggleModal,
  addToProvidersList,
}: IAddProviderProps) {
  //services
  const { providerManager } = useService();

  //states
  const [provider, setProvider] = useState<IProvider>({} as IProvider);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
  const context = useGlobalContext();

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
    if (!validateProvider()) return;

    try {
      const result = await providerManager.addProvider(provider);
      if (!result.success)
        return context.toggleSnackBar({
          visible: true,
          text: result.message,
          type: "error",
        });
      addToProvidersList(provider);
      context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "success",
      });
    } catch (error) {
      console.log(error);
    } finally {
      toggleModal();
    }
  }

  function validateProvider() {
    if (!provider.providerName) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-provider-name"),
      });
      return false;
    }
    if (!provider.providerPhoneNumber) {
      setValidation({
        visible: true,
        text: i18n.t("enter-phone-number"),
      });
      return false;
    }
    return true;
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
