import useGlobalContext from "@/Global/Context/ContextProvider";
import { useState } from "react";
import IAddCustomerProps from "@/ViewModels/Customers/IAddCustomerProps";
import ICustomer from "@/ViewModels/Customers/ICustomer";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";

export default function useAddCustomerService(props: IAddCustomerProps) {
  // services
  const { customerManager } = useService();

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
    if (!validateCustomer()) return;
    const result = await customerManager.addCustomer(customer);
    if (!result.success)
      return toggleSnackBar({
        text: result.message,
        type: "error",
        visible: true,
      });
    props.addToCustomersList(customer);
    props.toggleModal();
    toggleSnackBar({
      text: result.message,
      type: "success",
      visible: true,
    });
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
    validation,
    setCustomerName,
    setCustomerPhoneNumber,
    addCustomer,
    setCustomerNotes,
  };
}
