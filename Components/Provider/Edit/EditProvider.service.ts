import { useEffect, useState } from "react";
import { OuterDebt } from "@/Global/Models/OuterDebt";
import { IProviderFormProps } from "@/Global/ViewModels/Providers/IProviderFormProps";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import Mapper from "@/Global/Helpers/MapService";
import ProviderManager from "@/Global/DAL/provider.service";

export default function useEditProviderService({
  id,
  updateFromProvidersList,
}: IProviderFormProps) {
  //services
  const providerManager = new ProviderManager();
  const mapper = new Mapper();

  //states
  const [provider, setProvider] = useState<IProvider>({} as IProvider);

  useEffect(() => {
    getProvider();
  }, []);

  async function getProvider() {
    const providerDB = await providerManager.getProvider(id);
    if (!providerDB) return;
    const provider = mapper.mapToIProvider(providerDB);
    setProvider(provider);
    return provider;
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
    validateProviderFields(provider);
    const updateProvider = mapper.mapToProvider(provider);
    const result = await providerManager.updateProvider(updateProvider);
    if ((result?.changes || 0) > 0) updateFromProvidersList(provider);
  }

  function validateProviderFields(provider: IProvider) {
    provider.providerId = id;
    provider.providerName = provider.providerName.trim();
    provider.providerPhoneNumber = provider.providerPhoneNumber.trim();
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
