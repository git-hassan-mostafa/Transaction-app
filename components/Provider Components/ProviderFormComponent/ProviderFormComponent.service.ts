import { useEffect, useState } from "react";
import IProvider, { IProviderProps } from "./ProviderFormComponent.types";
import useContextProvider from "@/Global/ContextApi/ContextApi";
import { Alert } from "react-native";
import { OuterDebt } from "@/Global/Models/OuterDebt";
import Provider from "@/Global/Models/Provider";

export default function useProviderFormComponentService({
  id,
  deleteFromProviderList,
  updateFromProvidersList,
}: IProviderProps) {
  const [provider, setProvider] = useState<IProvider>({} as IProvider);

  const { providerManager } = useContextProvider();

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
    const provider = mapIProvider(providerDB);
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

  async function updateProviderName() {
    validateProviderFields(provider);
    const updateProvider: Provider = mapProvider(provider);
    const result = await providerManager.updateProvider(updateProvider);
    if ((result?.changes || 0) > 0) updateFromProvidersList(updateProvider);
  }

  async function updateProviderPhonember() {
    validateProviderFields(provider);
    const updatedProvider: Provider = mapProvider(provider);
    await providerManager.updateProvider(updatedProvider);
  }

  function validateProviderFields(provider: IProvider) {
    provider.id = id;
    provider.name = provider.name.trim();
    provider.phoneNumber = provider.phoneNumber.trim();
  }

  async function handleDeleteProvider() {
    Alert.alert("ازالة زبون", "هل أنت متأكد أنك تريد ازالة هذا التاجر؟", [
      {
        text: "الغاء",
        style: "cancel",
      },
      { text: "تأكيد", onPress: deleteProvider },
    ]);
  }

  async function deleteProvider() {
    const result = await providerManager.deleteProvider(id);
    if ((result?.changes || 0) > 0) deleteFromProviderList(id);
    else Alert.prompt("حصل خطأ ما", "حصل خطأ ما , الرجاء المحاولة مجددا.");
  }

  function mapProvider(provider: IProvider): Provider {
    return {
      id: provider.id as number,
      name: provider.name as string,
      borrowedPrice: provider.borrowedPrice as number,
      payedPrice: provider.payedPrice as number,
      phoneNumber: provider.phoneNumber as string,
    };
  }

  function mapIProvider(provider: Provider): IProvider {
    return {
      id: provider.id as number,
      name: provider.name as string,
      borrowedPrice: provider.borrowedPrice as number,
      payedPrice: provider.payedPrice as number,
      phoneNumber: provider.phoneNumber as string,
      itemsList: [],
    };
  }

  return {
    provider,
    setProviderName,
    setProviderPhoneNumber,
    updateProviderName,
    updateProviderPhonember,
    handleDeleteProvider,
  };
}
