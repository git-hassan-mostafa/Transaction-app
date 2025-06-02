import { useEffect, useState } from "react";
import { OuterDebt } from "@/Models/OuterDebt";
import { IProviderFormProps } from "@/ViewModels/Providers/IProviderFormProps";
import IProvider from "@/ViewModels/Providers/IProvider";
import Mapper from "@/Global/Helpers/MapService";
import ProviderDataAccess from "@/DAL/ProviderDataAccess";
import useService from "@/Global/Context/ServiceProvider";

export default function useEditProviderService({
  id,
  updateFromProvidersList,
}: IProviderFormProps) {
  //services
  const { providerManager } = useService();

  //states
  const [provider, setProvider] = useState<IProvider>({} as IProvider);

  useEffect(() => {
    getProvider();
  }, []);

  async function getProvider() {
    const providersDB = await providerManager.getProvider(id);
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

  async function updateProviderName() {
    updateProvider();
  }

  async function updateProviderPhonember() {
    updateProvider();
  }

  async function updateProviderNotes() {
    updateProvider();
  }

  async function updateProvider() {
    const result = await providerManager.updateProvider(provider);
    if (result.success) updateFromProvidersList(provider);
  }

  return {
    provider,
    setProviderName,
    setProviderPhoneNumber,
    setProviderNotes,
    updateProviderName,
    updateProviderPhonember,
    updateProviderNotes,
  };
}
