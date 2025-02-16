import useContextProvider from "@/Global/ContextApi/ContextApi";
import MapService from "@/Global/Helpers/MapService";
import InnerDebt from "@/Global/Models/InnerDebt";
import CustomerManager from "@/Global/Services/customers.service";
import InnerDebtsManager from "@/Global/Services/innerDebts.service";
import IInnerDebt from "@/Global/ViewModels/InnerDebts/IInerDebts";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useInnerDebtsPageService() {
  //services
  const innerDebtsManager = new InnerDebtsManager();
  const mapService = new MapService();
  const customerManager = new CustomerManager();

  //states
  const [innerDebts, setInnerDebts] = useState<IInnerDebt[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllInnerDebts();
  }, []);

  async function addToInnerDebtsList(value: IInnerDebt) {
    const customer = await customerManager.getCustomer(value.customerId);
    const debt = value;
    if (customer) debt.customer = mapService.mapToICustomer(customer);
    setInnerDebts((prev) => [...prev, debt]);
  }

  function deleteFromInnerDebtsList(id: number) {
    setInnerDebts((prev) => prev.filter((c) => c.id !== id));
  }

  async function updateFromInnerDebtsList(value: IInnerDebt) {
    const customer = await customerManager.getCustomer(value.customerId);
    const debt = value;
    if (customer) debt.customer = mapService.mapToICustomer(customer);
    setInnerDebts((prev) =>
      prev.map((innerDebt) =>
        innerDebt.id === value.id ? { ...innerDebt, ...debt } : innerDebt
      )
    );
  }

  async function getAllInnerDebts() {
    const innerDebtsDB = await innerDebtsManager.getAllInnerDebts();
    const customers = await customerManager.getAllCustomers();
    const innerDebts = innerDebtsDB?.map((c) => {
      const customer = customers?.find(
        (customer) => customer.Id === c.CustomerId
      );
      return mapService.mapToIInnerDebt(c, customer);
    });
    setInnerDebts(innerDebts as IInnerDebt[]);
  }

  async function handleDeleteInnerDebt(id: number) {
    Alert.alert("ازالة دين", "هل أنت متأكد أنك تريد ازالة هذا الدين؟", [
      {
        text: "الغاء",
        style: "cancel",
      },
      { text: "تأكيد", onPress: () => deleteInnerDebt(id) },
    ]);
  }

  async function deleteInnerDebt(id: number) {
    const result = await innerDebtsManager.deleteInnerDebt(id);
    if ((result?.changes || 0) > 0) deleteFromInnerDebtsList(id);
    else Alert.prompt("حصل خطأ ما", "حصل خطأ ما , الرجاء المحاولة مجددا.");
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  return {
    innerDebts,
    modalVisible,
    toggleModal,
    addToInnerDebtsList,
    deleteFromInnerDebtsList,
    updateFromInnerDebtsList,
    handleDeleteInnerDebt,
  };
}
