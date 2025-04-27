import MapService from "@/Global/Helpers/MapService";
import ProviderManager from "@/Global/Services/provider.service";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useProvidersPageService() {
  //services
  const providerManager = new ProviderManager();
  const mapService = new MapService();

  //states
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllProviders();
  }, []);

  function addToProvidersList(value: IProvider) {
    setProviders((prev) => [...prev, value]);
  }

  function deleteFromProvidersList(id: number) {
    setProviders((prev) => prev.filter((c) => c.id !== id));
  }

  function updateFromProvidersList(value: IProvider) {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === value.id ? { ...provider, ...value } : provider
      )
    );
  }
  async function getAllProviders() {
    const providersDB = await providerManager.getAllProviders();
    const providers = providersDB?.map((provider) =>
      mapService.mapToIProvider(provider)
    );
    setProviders(providers as IProvider[]);
  }

  async function handleDeleteProvider(id: number) {
    Alert.alert("ازالة زبون", "هل أنت متأكد أنك تريد ازالة هذا التاجر؟", [
      {
        text: "الغاء",
        style: "cancel",
      },
      { text: "تأكيد", onPress: () => deleteProvider(id) },
    ]);
  }

  async function deleteProvider(id: number) {
    const result = await providerManager.deleteProvider(id);
    if ((result?.changes || 0) > 0) deleteFromProvidersList(id);
    else Alert.prompt("حصل خطأ ما", "حصل خطأ ما , الرجاء المحاولة مجددا.");
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
