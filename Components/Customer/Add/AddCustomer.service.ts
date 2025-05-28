import useGlobalContext from "@/Global/Context/ContextProvider";
import { useState } from "react";
import IAddCustomerProps from "@/ViewModels/Customers/IAddCustomerProps";
import ICustomer from "@/ViewModels/Customers/ICustomer";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import BLLFactory from "@/Factories/BLLFactory";

export default function useAddCustomerService(props: IAddCustomerProps) {
  // services
  const customerManager = BLLFactory.CustomerManager();

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
    const result = await customerManager.addCustomer(customer);
    if (!result) return;
    props.addToCustomersList(customer);
    props.toggleModal();
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
