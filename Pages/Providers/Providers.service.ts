import useGlobalContext from "@/Global/Context/ContextProvider";
import SortList from "@/Global/Helpers/Functions/SortList";
import i18n from "@/Global/I18n/I18n";
import IProvider from "@/ViewModels/Providers/IProvider";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Global/Context/ServiceProvider";
import IFormModalType from "@/Global/Types/IEditModalType";

export default function useProvidersService() {
  //services
  const { providerManager } = useService();

  //states
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [modalOptions, setModalOptions] = useState<IFormModalType>({
    visible: false,
    id: -1,
  });

  // context
  const { toggleSnackBar } = useGlobalContext();

  //constructor
  sortProviders();
  useEffect(() => {
    getAllProviders();
  }, []);

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
  async function getAllProviders() {
    const providersDB = await providerManager.getAllProviders();
    setProviders(providersDB as IProvider[]);
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
      return toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    }
    deleteFromProvidersList(id);
    toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
  }

  async function onEdit(id: number) {
    toggleModal(id);
  }

  function toggleModal(id: number | undefined = undefined) {
    setModalOptions((prev) => ({ visible: !prev.visible, id }));
  }

  function sortProviders() {
    SortList(providers, (e) => e.providerName);
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
  };
}
