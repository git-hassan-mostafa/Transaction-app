import { useEffect, useState } from "react";
import { OuterDebt } from "@/Global/Models/OuterDebt";
import { IProviderFormProps } from "@/Global/ViewModels/Providers/IProviderFormProps";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import ProviderManager from "@/Global/Services/provider.service";
import MapService from "@/Global/Helpers/MapService";

export default function useProviderFormComponentService({
  id,
  updateFromProvidersList,
}: IProviderFormProps) {
  //services
  const providerManager = new ProviderManager();
  const mapService = new MapService();

  //states
  const [provider, setProvider] = useState<IProvider>({} as IProvider);

  useEffect(() => {
    getProvider().then(() => {
      providerManager.getProviderDebts(id).then((data) => {
        setProvider((prev) => {
          return { ...prev, borrowList: data as OuterDebt[] };
        });
      });
    });
  }, []);

  async function getProvider() {
    const providerDB = await providerManager.getProvider(id);
    if (!providerDB) return;
    const provider = mapService.mapToIProvider(providerDB);
    setProvider(provider);
    return provider;
  }

  function setProviderName(value: string) {
    setProvider((prev) => {
      return { ...prev, name: value };
    });
  }

  function setProviderPhoneNumber(value: string) {
    setProvider((prev) => {
      return { ...prev, phoneNumber: value };
    });
  }

  function setProviderNotes(value: string) {
    setProvider((prev) => {
      return { ...prev, notes: value };
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
    const updateProvider = mapService.mapToProvider(provider);
    const result = await providerManager.updateProvider(updateProvider);
    if ((result?.changes || 0) > 0) updateFromProvidersList(provider);
  }

  function validateProviderFields(provider: IProvider) {
    provider.id = id;
    provider.name = provider.name.trim();
    provider.phoneNumber = provider.phoneNumber.trim();
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
