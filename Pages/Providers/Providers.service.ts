import useGlobalContext from "@/Global/Context/ContextProvider";
import ProviderManager from "@/Global/DAL/provider.service";
import Mapper from "@/Global/Helpers/MapService";
import SortList from "@/Global/Helpers/SortList";
import i18n from "@/Global/I18n/I18n";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useProvidersService() {
  //services
  const providerManager = new ProviderManager();
  const mapper = new Mapper();

  //states
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    const providers = providersDB?.map((provider) =>
      mapper.mapToIProvider(provider)
    );
    setProviders(providers as IProvider[]);
  }

  async function handleDeleteProvider(id: number) {
    Alert.alert(
      i18n.t("delete-provider"),
      i18n.t("are-you-sure-you-want-to-delete-this-provider"),
      [
        {
          text: i18n.t("Cancel"),
          style: "cancel",
        },
        { text: i18n.t("Confirm"), onPress: () => deleteProvider(id) },
      ]
    );
  }

  async function deleteProvider(id: number) {
    const result = await providerManager.deleteProvider(id);
    if ((result?.changes || 0) > 0) {
      deleteFromProvidersList(id);
      toggleSnackBar({
        visible: true,
        text: i18n.t("provider-deleted-successfully"),
        type: "success",
      });
    } else
      toggleSnackBar({
        visible: true,
        text: i18n.t("error-deleting-provider"),
      });
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  function sortProviders() {
    SortList(providers, (e) => e.providerName);
  }

  return {
    providers,
    modalVisible,
    toggleModal,
    addToProvidersList,
    deleteFromProvidersList,
    updateFromProvidersList,
    handleDeleteProvider,
  };
}
