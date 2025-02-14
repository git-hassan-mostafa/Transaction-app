import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useState } from "react";
import Customer from "@/Global/Models/Customer";
import IAddCustomerProps from "@/Global/ViewModels/Customers/IAddCustomerProps";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import CustomerManager from "@/Global/Services/customers.service";
import MapService from "@/Global/Helpers/MapService";

export default function useAddCustomerFormComponentService({
  toggleModal,
  addToCustomersList,
}: IAddCustomerProps) {
  // services
  const customerManager = new CustomerManager();
  const mapService = new MapService();

  // states
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);

  // context
  const { toggleSnackBar } = useContextProvider();

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

  function setCustomerNotes(value: string) {
    setCustomer((prev) => {
      return { ...prev, notes: value };
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
      notes: customer.notes,
    };
    const result = await customerManager.addCustomer(newCustomer);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    newCustomer.id = result?.lastInsertRowId;
    var mappedCustomer = mapService.mapICustomer(newCustomer);
    addToCustomersList(mappedCustomer);
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
