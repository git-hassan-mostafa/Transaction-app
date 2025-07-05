import useGlobalContext from "@/Shared/Context/ContextProvider";
import SortList from "@/Shared/Helpers/Functions/SortList";
import i18n from "@/Shared/I18n/I18n";
import IProvider from "@/Models/Providers/IProvider";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Shared/Context/ServiceProvider";
import IFormModalType from "@/Shared/Types/IEditModalType";

export default function useProvidersService() {
  //services
  const { providerManager } = useService();

  //states
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [modalOptions, setModalOptions] = useState<IFormModalType<IProvider>>({
    visible: false,
    formData: {} as IProvider,
  });

  // context
  const context = useGlobalContext();

  //constructor
  useEffect(() => {
    fetchAllProviders();
  }, []);

  async function fetchAllProviders() {
    const providersDB = await providerManager.getAllProviders();
    setProviders(providersDB as IProvider[]);
  }

  async function save(
    provider: IProvider,
    validationCallback: (provider: IProvider) => boolean
  ) {
    if (!validationCallback(provider)) return;
    if (provider.providerId) updateProvider(provider);
    else addProvider(provider);
  }

  async function addProvider(provider: IProvider) {
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
      console.error(error);
    } finally {
      toggleModal();
    }
  }

  async function updateProvider(provider: IProvider) {
    const result = await providerManager.updateProvider(provider);
    if (!result.success)
      return context.toggleSnackBar({
        text: result.message,
        visible: true,
        type: "error",
      });
    toggleModal();
    context.toggleSnackBar({
      text: result.message,
      visible: true,
      type: "success",
    });
    updateFromProvidersList(provider);
  }

  function addToProvidersList(value: IProvider) {
    setProviders((prev) => [...prev, value]);
  }

  function deleteFromProvidersList(id: number) {
    setProviders((prev) => prev.filter((c) => c.providerId !== id));
  }

  function updateFromProvidersList(value: IProvider) {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.providerId === value.providerId
          ? { ...provider, ...value }
          : provider
      )
    );
  }

  async function handleDeleteProvider(id: number) {
    Alert.alert(
      i18n.t("delete-provider"),
      i18n.t("are-you-sure-you-want-to-delete-this-provider"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteProvider(id) },
      ]
    );
  }

  async function deleteProvider(id: number) {
    const result = await providerManager.deleteProvider(id);
    if (!result.success) {
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    }
    deleteFromProvidersList(id);
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
  }

  async function onEdit(formData: IProvider) {
    toggleModal(formData);
  }

  function toggleModal(formData: IProvider = {} as IProvider) {
    setModalOptions((prev) => ({ visible: !prev.visible, formData }));
  }

  return {
    providers,
    modalOptions,
    addToProvidersList,
    deleteFromProvidersList,
    updateFromProvidersList,
    handleDeleteProvider,
    onEdit,
    toggleModal,
    save,
  };
}
