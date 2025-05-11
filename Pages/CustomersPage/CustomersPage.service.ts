import useGlobalContext from "@/Global/Context/ContextProvider";
import Mapper from "@/Global/Helpers/MapService";
import i18n from "@/Global/I18n/I18n";
import CustomerManager from "@/Global/Services/customers.service";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useCustomersPageService() {
  //services
  const customerManager = new CustomerManager();
  const mapper = new Mapper();

  //states
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  //context
  const { toggleSnackBar } = useGlobalContext();
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
    const mappedCustomers = customers?.map((c) => mapper.mapToICustomer(c));
    setCustomers(mappedCustomers as ICustomer[]);
  }

  async function handleDeleteCustomer(id: number) {
    const customer = customers.find((c) => c.customerId === id);
    Alert.alert(
      i18n.t("delete-customer"),
      i18n.t("are-you-sure-you-want-to-delete-this-customer?"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteCustomer(id) },
      ]
    );
  }

  async function deleteCustomer(id: number) {
    const result = await customerManager.deleteCustomer(id);
    if ((result?.changes || 0) > 0) {
      deleteFromCustomerList(id);
      toggleSnackBar({
        text: i18n.t("customer-deleted-successfully"),
        type: "success",
        visible: true,
      });
      return;
    }
    toggleSnackBar({
      text: i18n.t("error-deleting-customer"),
      type: "error",
      visible: true,
    });
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  function sortCustomers() {
    customers?.sort((a, b) => {
      if (a.customerName && b.customerName) {
        return a.customerName
          .toString()
          .localeCompare(b.customerName.toString(), undefined, {
            sensitivity: "base",
          });
      }
      return 0;
    });
  }

  //constructor
  sortCustomers();

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
