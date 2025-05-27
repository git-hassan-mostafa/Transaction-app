import useGlobalContext from "@/Global/Context/ContextProvider";
import BLLFactory from "@/Global/BLL/Factory/BLLFactory";
import sortList from "@/Global/Helpers/SortList";
import i18n from "@/Global/I18n/I18n";
import IEditModalType from "@/Global/Types/IEditModalType";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useCustomersService() {
  //services
  const customerService = BLLFactory.CustomerService();

  //states
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalOptions, setEditModalOptions] = useState<IEditModalType>({
    visible: false,
    id: -1,
  });
  //context
  const { toggleSnackBar } = useGlobalContext();

  //constructor
  sortCustomers();
  useEffect(() => {
    getAllCustomers();
  }, []);

  async function getAllCustomers() {
    const mappedCustomers = await customerService.getAllCustomers();
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
    toggleEditModal(id);
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
        { text: i18n.t("confirm"), onPress: () => deleteCustomer(id) },
      ]
    );
  }

  async function deleteCustomer(id: number) {
    const result = await customerService.deleteCustomer(id);
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

  function toggleEditModal(id: number) {
    setEditModalOptions((prev) => ({ visible: !prev.visible, id }));
  }

  function sortCustomers() {
    sortList(customers, (e) => e.customerName);
  }

  return {
    customers,
    modalVisible,
    editModalOptions,
    toggleModal,
    toggleEditModal,
    addToCustomersList,
    deleteFromCustomerList,
    updateFromCustomersList,
    handleDeleteCustomer,
    onEdit,
  };
}
