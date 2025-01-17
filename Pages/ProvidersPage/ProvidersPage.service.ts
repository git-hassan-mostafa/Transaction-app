import useContextProvider from "@/Global/ContextApi/ContextApi";
import Provider from "@/Global/Models/Provider";
import { useEffect, useState } from "react";

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
  };
}
