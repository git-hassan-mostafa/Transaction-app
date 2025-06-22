import useGlobalContext from "@/Global/Context/ContextProvider";
import sortList from "@/Global/Helpers/Functions/SortList";
import i18n from "@/Global/I18n/I18n";
import IFormModalType from "@/Global/Types/IEditModalType";
import ICustomer from "@/ViewModels/Customers/ICustomer";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Global/Context/ServiceProvider";

export default function useCustomersService() {
  //services
  const { customerManager } = useService();

  //states
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [modalOptions, setModalOptions] = useState<IFormModalType>({
    visible: false,
    id: -1,
  });
  //context
  const context = useGlobalContext();

  //constructor
  sortCustomers();
  useEffect(() => {
    getAllCustomers();
  }, []);

  async function getAllCustomers() {
    const mappedCustomers = await customerManager.getAllCustomersCalculated();
    setCustomers(mappedCustomers);
  }

  function addToCustomersList(value: ICustomer) {
    setCustomers((prev) => [...prev, value]);
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

  function deleteFromCustomerList(id: number) {
    setCustomers((prev) => prev.filter((c) => c.customerId !== id));
  }

  async function onEdit(id: number) {
    toggleModal(id);
  }

  async function handleDeleteCustomer(id: number) {
    Alert.alert(
      i18n.t("delete-customer"),
      i18n.t("are-you-sure-you-want-to-delete-this-customer?"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        {
          text: i18n.t("confirm"),
          onPress: () => promptIfCustomerHasDebts(id),
        },
      ]
    );
  }

  async function deleteCustomer(id: number) {
    const result = await customerManager.deleteCustomer(id);
    if (!result.success)
      return context.toggleSnackBar({
        text: result.message,
        type: "error",
        visible: true,
      });
    deleteFromCustomerList(id);
    context.toggleSnackBar({
      text: result.message,
      type: "success",
      visible: true,
    });
  }

  async function promptIfCustomerHasDebts(id: number) {
    const customer = customers.find((c) => c.customerId === id);
    if ((customer?.customerBorrowedPrice || 0) > 0) {
      Alert.alert(
        i18n.t("customer-has-debts"),
        i18n.t(
          "this-customer-has-debts-all-his-debts-will-be-deleted-are-you-sure-you-want-to-delete"
        ),
        [
          {
            text: i18n.t("cancel"),
            style: "cancel",
          },
          { text: i18n.t("confirm"), onPress: () => deleteCustomer(id) },
        ]
      );
      return;
    }
    deleteCustomer(id);
  }

  function toggleModal(id: number | undefined = undefined) {
    setModalOptions((prev) => ({ visible: !prev.visible, id }));
  }

  function sortCustomers() {
    sortList(customers, (e) => e.customerName);
  }

  return {
    customers,
    modalOptions,
    toggleModal,
    addToCustomersList,
    deleteFromCustomerList,
    updateFromCustomersList,
    handleDeleteCustomer,
    onEdit,
  };
}
