import MapService from "@/Global/Helpers/MapService";
import CustomerManager from "@/Global/Services/customers.service";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useCustomersPageService() {
  //services
  const customerManager = new CustomerManager();
  const mapService = new MapService();

  //states
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllCustomers();
  }, []);

  function addToCustomersList(value: ICustomer) {
    setCustomers((prev) => [...prev, value]);
  }

  function deleteFromCustomerList(id: number) {
    setCustomers((prev) => prev.filter((c) => c.customerId !== id));
  }

  function updateFromCustomersList(value: ICustomer) {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.customerId === value.customerId
          ? { ...customer, ...value }
          : customer
      )
    );
  }
  async function getAllCustomers() {
    const customers = await customerManager.getAllCustomers();
    const mappedCustomers = customers?.map((c) => mapService.mapToICustomer(c));
    setCustomers(mappedCustomers as ICustomer[]);
  }

  async function handleDeleteCustomer(id: number) {
    Alert.alert("ازالة زبون", "هل أنت متأكد أنك تريد ازالة هذا الزبون؟", [
      {
        text: "الغاء",
        style: "cancel",
      },
      { text: "تأكيد", onPress: () => deleteCustomer(id) },
    ]);
  }

  async function deleteCustomer(id: number) {
    const result = await customerManager.deleteCustomer(id);
    if ((result?.changes || 0) > 0) deleteFromCustomerList(id);
    else Alert.prompt("حصل خطأ ما", "حصل خطأ ما , الرجاء المحاولة مجددا.");
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  return {
    customers,
    modalVisible,
    toggleModal,
    addToCustomersList,
    deleteFromCustomerList,
    updateFromCustomersList,
    handleDeleteCustomer,
  };
}
