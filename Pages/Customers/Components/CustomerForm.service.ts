import { useEffect, useMemo, useState } from "react";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import i18n from "@/Shared/I18n/I18n";
import ICustomerFormProps from "@/Models/Customers/ICustomerFormProps";
import ICustomerDetailsProps from "@/Models/Customers/ICustomerDetailsProps";
import ICustomer from "@/Models/Customers/ICustomer";
import useService from "@/Shared/Context/ServiceProvider";

export default function useCustomerFormService(
  props: ICustomerFormProps
): ICustomerDetailsProps {
  //services
  const { customerManager } = useService();

  // states
  const [customer, setCustomer] = useState<ICustomer>(props.formData);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  // const context = useGlobalContext();

  useEffect(() => {
    props.dirtyChecker.setOriginalState(props.formData);

    return () => {
      props.dirtyChecker.dispose();
    };
  }, []);

  useEffect(() => {
    props.dirtyChecker.setState(customer);
  }, [customer]);

  function setCustomerName(value: string) {
    setCustomer((prev): ICustomer => {
      return { ...prev, Name: value };
    });
  }

  function setCustomerPhoneNumber(value: string) {
    setCustomer((prev): ICustomer => {
      return { ...prev, PhoneNumber: value };
    });
  }

  function setCustomerNotes(value: string) {
    setCustomer((prev): ICustomer => {
      return { ...prev, Notes: value };
    });
  }

  async function save() {
    await props.save(customer, validateCustomer);
  }

  function validateCustomer(customer: ICustomer) {
    if (!customer.Name) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-customer-name"),
      });
      return false;
    }
    if (!customer.PhoneNumber) {
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
    setCustomerNotes,
    save,
  };
}
