import ICustomer from "@/Components/CustomerFormComponent/CustomerFormComponent.types";
import useContextProvider from "@/Global/ContextApi/ContextApi";
import Customer from "@/Global/Models/Customer";
import { useEffect, useState } from "react";

export default function useCustomersPageService() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { customerManager } = useContextProvider();

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
  };
}
