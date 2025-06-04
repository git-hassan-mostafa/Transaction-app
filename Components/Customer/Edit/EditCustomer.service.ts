import { useEffect, useState } from "react";
import IEditCustomerProps from "@/ViewModels/Customers/IEditCustomerProps";
import ICustomer from "@/ViewModels/Customers/ICustomer";
import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "@/ViewModels/RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";
import ICustomerDetailsProps from "@/ViewModels/Customers/ICustomerDetailsProps";
import useService from "@/Global/Context/ServiceProvider";
import useGlobalContext from "@/Global/Context/ContextProvider";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";

export default function useEditCustomerService(
  props: IEditCustomerProps
): ICustomerDetailsProps {
  //services
  const { customerManager } = useService();

  // states
  const [customer, setCustomer] = useState<ICustomer>({
    customerId: props.id,
  } as ICustomer);
  const [borrowList, setBorrowList] = useState<
    ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  >([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });
  //context
  const context = useGlobalContext();

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    await Promise.all([getCustomer(), getBorrowList()]);
  }

  async function getCustomer() {
    const mappedCustomer = await customerManager.getCustomer(props.id);
    setCustomer(mappedCustomer);
  }

  async function getBorrowList() {
    const borrowedList = await customerManager.getCustomerBorrowList(props.id);
    setBorrowList(borrowedList);
    setCustomerBorrowedPrice(borrowedList);
  }

  function setCustomerBorrowedPrice(
    borrowedList: ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  ) {
    const sum = customerManager.getCustomerBorrowedPrice(borrowedList);
    setCustomer((prev) => {
      return { ...prev, customerBorrowedPrice: sum };
    });
  }

  function setCustomerName(value: string) {
    setCustomer((prev) => {
      return { ...prev, customerName: value };
    });
  }

  function setCustomerPhoneNumber(value: string) {
    setCustomer((prev) => {
      return { ...prev, customerPhoneNumber: value };
    });
  }

  function setCustomerNotes(value: string) {
    setCustomer((prev) => {
      return { ...prev, customerNotes: value };
    });
  }

  async function updateCustomer() {
    if (!validateCustomer()) return;
    const result = await customerManager.updateCustomer(customer);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    props.toggleModal();
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
    props.updateFromCustomersList(customer);
  }

  function validateCustomer() {
    if (!customer.customerName) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-customer-name"),
      });
      return false;
    }
    if (!customer.customerPhoneNumber) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-phone-number"),
      });
      return false;
    }
    return true;
  }

  return {
    customer,
    borrowList,
    validation,
    setCustomerName,
    setCustomerPhoneNumber,
    setCustomerNotes,
    updateCustomer,
  };
}
