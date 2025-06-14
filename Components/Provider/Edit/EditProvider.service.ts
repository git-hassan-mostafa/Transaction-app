import { useEffect, useState } from "react";
import { IProviderFormProps } from "@/ViewModels/Providers/IProviderFormProps";
import IProvider from "@/ViewModels/Providers/IProvider";
import useService from "@/Global/Context/ServiceProvider";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import useGlobalContext from "@/Global/Context/ContextProvider";

export default function useEditProviderService(props: IProviderFormProps) {
  //services
  const { providerManager } = useService();

  //states
  const [provider, setProvider] = useState<IProvider>({} as IProvider);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  const context = useGlobalContext();

  useEffect(() => {
    getProvider();
  }, []);

  async function getProvider() {
    const providersDB = await providerManager.getProvider(props.id);
    if (!providersDB) return;
    setProvider(providersDB);
  }

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

  async function updateProvider() {
    if (!validateProvider) return;
    const result = await providerManager.updateProvider(provider);
    if (!result.success)
      return context.toggleSnackBar({
        text: result.message,
        visible: true,
        type: "error",
      });
    props.toggleModal();
    context.toggleSnackBar({
      text: result.message,
      visible: true,
      type: "success",
    });
    props.updateFromProvidersList(provider);
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
    updateProvider,
    setProviderName,
    setProviderPhoneNumber,
    setProviderNotes,
  };
}
