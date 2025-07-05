import useGlobalContext from "@/Shared/Context/ContextProvider";
import sortList from "@/Shared/Helpers/Functions/SortList";
import i18n from "@/Shared/I18n/I18n";
import IFormModalType from "@/Shared/Types/IEditModalType";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Shared/Context/ServiceProvider";
import ICustomer from "@/Models/Customers/ICustomer";

export default function useCustomersService() {
  //services
  const { customerManager } = useService();

  //states
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [modalOptions, setModalOptions] = useState<IFormModalType<ICustomer>>({
    visible: false,
    formData: {} as ICustomer,
  });
  //context
  const context = useGlobalContext();

  //constructor
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  async function fetchAllCustomers() {
    const mappedCustomers = await customerManager.getAllCustomersCalculated();
    setCustomers(mappedCustomers);
  }

  async function save(
    customer: ICustomer,
    validationCallback: (customer: ICustomer) => boolean
  ) {
    if (!validationCallback(customer)) return;

    if (customer.customerId) updateCustomer(customer);
    else addCustomer(customer);
  }

  async function addCustomer(customer: ICustomer) {
    const result = await customerManager.addCustomer(customer);
    if (!result.success)
      return context.toggleSnackBar({
        text: result.message,
        type: "error",
        visible: true,
      });
    addToCustomersList(customer);
    toggleModal();
    context.toggleSnackBar({
      text: result.message,
      type: "success",
      visible: true,
    });
  }

  async function updateCustomer(customer: ICustomer) {
    const result = await customerManager.updateCustomer(customer);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    toggleModal();
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
    updateFromCustomersList(customer);
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

  async function onEdit(customer: ICustomer) {
    toggleModal(customer);
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

  function toggleModal(formData: ICustomer = {} as ICustomer) {
    setModalOptions((prev) => ({ visible: !prev.visible, formData }));
  }

  return {
    customers,
    modalOptions,
    save,
    toggleModal,
    addToCustomersList,
    deleteFromCustomerList,
    updateFromCustomersList,
    handleDeleteCustomer,
    onEdit,
  };
}
