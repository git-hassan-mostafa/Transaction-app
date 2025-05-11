import useGlobalContext from "@/Global/Context/ContextProvider";
import { useState } from "react";
import Customer from "@/Global/Models/Customer";
import IAddCustomerProps from "@/Global/ViewModels/Customers/IAddCustomerProps";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import CustomerManager from "@/Global/Services/customers.service";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import { Alert } from "react-native";
import i18n from "@/Global/I18n/I18n";

export default function useAddCustomerFormComponentService({
  toggleModal,
  addToCustomersList,
}: IAddCustomerProps) {
  // services
  const customerManager = new CustomerManager();

  // states
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
  const { toggleSnackBar } = useGlobalContext();

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

  async function addCustomer() {
    if (!customer.customerName) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-customer-name"),
      });
      return;
    }
    if (!customer.customerPhoneNumber) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-phone-number"),
      });
      return;
    }
    const newCustomer: Customer = {
      Name: customer?.customerName.trim(),
      PhoneNumber: customer.customerPhoneNumber.trim(),
      Notes: customer.customerNotes,
    };
    const result = await customerManager.addCustomer(newCustomer);
    if (!result || !result.lastInsertRowId) {
      return Alert.alert(
        i18n.t("error"),
        i18n.t("failed-to-add-customer,please-try-again")
      );
    }
    customer.customerId = result?.lastInsertRowId;
    addToCustomersList(customer);
    toggleModal();
    toggleSnackBar({
      text: i18n.t("customer-added-successfully"),
      type: "success",
      visible: true,
    });
  }

  return {
    customer,
    validation,
    setCustomerName,
    setCustomerPhoneNumber,
    addCustomer,
    setCustomerNotes,
  };
}
