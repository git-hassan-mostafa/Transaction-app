import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useState } from "react";
import ICustomer, { IAddCustomerProps } from "./AddCustomerFormComponent.types";
import Customer from "@/Global/Models/Customer";

export default function useAddCustomerFormComponentService({
  toggleModal,
  addToCustomersList,
}: IAddCustomerProps) {
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);

  const { customerManager, toggleSnackBar } = useContextProvider();

  function setCustomerName(value: string) {
    setCustomer((prev) => {
      return { ...prev, name: value };
    });
  }

  function setCustomerPhoneNumber(value: string) {
    setCustomer((prev) => {
      return { ...prev, phoneNumber: value };
    });
  }

  async function addCustomer() {
    if (!customer.name) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال اسم الزبون",
        type: "error",
      });
      return;
    }
    if (!customer.phoneNumber) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال رقم الهاتف ",
        type: "error",
      });
      return;
    }
    const newCustomer: Customer = {
      name: customer?.name.trim(),
      phoneNumber: customer.phoneNumber.trim(),
      borrowedPrice: 0,
      payedPrice: 0,
    };
    const result = await customerManager.addCustomer(newCustomer);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    newCustomer.id = result?.lastInsertRowId;
    addToCustomersList(newCustomer);
    toggleModal();
  }

  return { customer, setCustomerName, setCustomerPhoneNumber, addCustomer };
}
