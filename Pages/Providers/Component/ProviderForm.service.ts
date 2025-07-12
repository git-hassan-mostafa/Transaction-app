import { useEffect, useState } from "react";
import { IProviderFormProps } from "@/Models/Providers/IProviderFormProps";
import IProvider from "@/Models/Providers/IProvider";
import useService from "@/Shared/Context/ServiceProvider";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import i18n from "@/Shared/I18n/I18n";
import useGlobalContext from "@/Shared/Context/ContextProvider";

export default function useEditProviderService(props: IProviderFormProps) {
  //services
  const { providerManager } = useService();

  //states
  const [provider, setProvider] = useState<IProvider>(props.formData);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  const context = useGlobalContext();

  useEffect(() => {
    props.dirtyChecker.setOriginalState(props.formData);

    return () => {
      props.dirtyChecker.dispose();
    };
  }, []);

  useEffect(() => {
    props.dirtyChecker.setState(provider);
  }, [provider]);

  function setProviderName(value: string) {
    setProvider((prev) => {
      return { ...prev, Name: value };
    });
  }

  function setProviderPhoneNumber(value: string) {
    setProvider((prev) => {
      return { ...prev, PhoneNumber: value };
    });
  }

  function setProviderNotes(value: string) {
    setProvider((prev) => {
      return { ...prev, Notes: value };
    });
  }

  async function save() {
    await props.save(provider, validateProvider);
  }

  function validateProvider(provider: IProvider) {
    if (!provider.Name) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-provider-name"),
      });
      return false;
    }
    if (!provider.PhoneNumber) {
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
    save,
    setProviderName,
    setProviderPhoneNumber,
    setProviderNotes,
  };
}
