import useGlobalContext from "@/Global/Context/ContextProvider";
import Mapper from "@/Global/Helpers/MapService";
import ProviderManager from "@/Global/Services/provider.service";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useProvidersPageService() {
  //services
  const providerManager = new ProviderManager();
  const mapper = new Mapper();

  //states
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // context
  const { toggleSnackBar } = useGlobalContext();
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
      "Delete Provider",
      "Are you sure you want to delete this provider?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Confirm", onPress: () => deleteProvider(id) },
      ]
    );
  }

  async function deleteProvider(id: number) {
    const result = await providerManager.deleteProvider(id);
    if ((result?.changes || 0) > 0) {
      deleteFromProvidersList(id);
      toggleSnackBar({
        visible: true,
        text: "Provider deleted successfully",
        type: "success",
      });
    } else Alert.prompt("Error", "Failed to delete provider");
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
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
