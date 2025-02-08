import useContextProvider from "@/Global/ContextApi/ContextApi";
import Provider from "@/Global/Models/Provider";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useProvidersPageService() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { providerManager } = useContextProvider();

  useEffect(() => {
    getAllProviders();
  }, []);

  function addToProvidersList(value: Provider) {
    setProviders((prev) => [...prev, value]);
  }

  function deleteFromProvidersList(id: number) {
    setProviders((prev) => prev.filter((c) => c.id !== id));
  }

  function updateFromProvidersList(value: Provider) {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === value.id ? { ...provider, ...value } : provider
      )
    );
  }
  async function getAllProviders() {
    const providers = await providerManager.getAllProviders();
    setProviders(providers as Provider[]);
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
