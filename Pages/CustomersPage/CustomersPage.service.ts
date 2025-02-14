import Customer from "@/Global/Models/Customer";
import CustomerManager from "@/Global/Services/customers.service";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useCustomersPageService() {
  //services
  const customerManager = new CustomerManager();

  //states
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllCustomers();
  }, []);

  function addToCustomersList(value: Customer) {
    setCustomers((prev) => [...prev, value]);
  }

  function deleteFromCustomerList(id: number) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  function updateFromCustomersList(value: Customer) {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === value.id ? { ...customer, ...value } : customer
      )
    );
  }
  async function getAllCustomers() {
    const customers = await customerManager.getAllCustomers();
    setCustomers(customers as Customer[]);
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
