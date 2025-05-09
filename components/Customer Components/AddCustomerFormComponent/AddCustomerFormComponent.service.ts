import useGlobalContext from "@/Global/Context/ContextProvider";
import { useState } from "react";
import Customer from "@/Global/Models/Customer";
import IAddCustomerProps from "@/Global/ViewModels/Customers/IAddCustomerProps";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import CustomerManager from "@/Global/Services/customers.service";

export default function useAddCustomerFormComponentService({
  toggleModal,
  addToCustomersList,
}: IAddCustomerProps) {
  // services
  const customerManager = new CustomerManager();
  // states
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);

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
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال اسم الزبون",
        type: "error",
      });
      return;
    }
    if (!customer.customerPhoneNumber) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال رقم الهاتف ",
        type: "error",
      });
      return;
    }
    const newCustomer: Customer = {
      Name: customer?.customerName.trim(),
      PhoneNumber: customer.customerPhoneNumber.trim(),
      Notes: customer.customerNotes,
    };
    const result = await customerManager.addCustomer(newCustomer);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    customer.customerId = result?.lastInsertRowId;
    addToCustomersList(customer);
    toggleModal();
  }

  return {
    customer,
    setCustomerName,
    setCustomerPhoneNumber,
    addCustomer,
    setCustomerNotes,
  };
}
