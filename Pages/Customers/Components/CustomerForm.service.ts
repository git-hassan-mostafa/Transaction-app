import { useEffect, useState } from "react";
import { ICustomer_IInternalDebt_IInternalDebtProduct_IProduct } from "@/Models/RelationModels/ICustomer_IInternalDebt_IInternalDebtProduct_IProduct";
import useService from "@/Shared/Context/ServiceProvider";
import useGlobalContext from "@/Shared/Context/ContextProvider";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import i18n from "@/Shared/I18n/I18n";
import ICustomerFormProps from "@/Models/Customers/ICustomerFormProps";
import ICustomerDetailsProps from "@/Models/Customers/ICustomerDetailsProps";
import ICustomer from "@/Models/Customers/ICustomer";

export default function useCustomerFormService(
  props: ICustomerFormProps
): ICustomerDetailsProps {
  //services
  const { customerManager } = useService();

  // states
  const [customer, setCustomer] = useState<ICustomer>(props.formData);
  const [borrowList, setBorrowList] = useState<
    ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]
  >([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  const context = useGlobalContext();

  useEffect(() => {
    fetchAllData();

    return () => {
      props.dirtyChecker.dispose();
    };
  }, []);

  useEffect(() => {
    props.dirtyChecker.setState(customer);
  }, [customer]);

  async function fetchAllData() {
    if (props.formData.customerId) await fetchBorrowList();
    props.dirtyChecker.setOriginalState(props.formData);
  }

  async function fetchBorrowList() {
    if (!props.formData.customerId) return;
    const borrowedList = await customerManager.getCustomerBorrowList(
      props.formData.customerId
    );
    setBorrowList(borrowedList);
    setCustomerBorrowedPrice(borrowedList);
  }

  function setCustomerBorrowedPrice(
    borrowedList: ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]
  ) {
    const sum = customerManager.getBorrowedPrice(borrowedList);
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

  async function save() {
    await props.save(customer, validateCustomer);
  }

  function validateCustomer(customer: ICustomer) {
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
    save,
  };
}
