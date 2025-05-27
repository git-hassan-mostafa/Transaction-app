import { useEffect, useState } from "react";
import ICustomerFormProps from "@/ViewModels/Customers/ICustomerFormProps";
import ICustomer from "@/ViewModels/Customers/ICustomer";
import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "@/ViewModels/RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";
import ICustomerDetailsProps from "@/ViewModels/Customers/ICustomerDetailsProps";
import BLLFactory from "@/BLL/Factory/BLLFactory";

export default function useEditCustomerService({
  id,
  updateFromCustomersList,
}: ICustomerFormProps): ICustomerDetailsProps {
  //services
  const customerService = BLLFactory.CustomerService();

  // states
  const [customer, setCustomer] = useState<ICustomer>({
    customerId: id,
  } as ICustomer);
  const [borrowList, setBorrowList] = useState<
    ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  >([]);

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    await Promise.all([getCustomer(), getBorrowList()]);
  }

  async function getCustomer() {
    const mappedCustomer = await customerService.getCustomer(id);
    setCustomer(mappedCustomer);
  }

  async function getBorrowList() {
    const borrowedList = await customerService.getCustomerBorrowList(id);
    setBorrowList(borrowedList);
    setCustomerBorrowedPrice(borrowedList);
  }

  function setCustomerBorrowedPrice(
    borrowedList: ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  ) {
    const sum = customerService.getCustomerBorrowedPrice(borrowedList);
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

  async function updateCustomerName() {
    await updateCustomer();
  }

  async function updateCustomerPhoneNumber() {
    await updateCustomer();
  }

  async function updateCustomerNotes() {
    await updateCustomer();
  }

  async function updateCustomer() {
    const updatedCustomer = await customerService.updateCustomer(customer);
    updateFromCustomersList(updatedCustomer);
  }

  const formatNumber = (number: number | undefined) => {
    if (!number) return "0";
    return number > 999 ? "999+" : `${number}`;
  };

  return {
    customer,
    borrowList,
    setCustomerName,
    setCustomerPhoneNumber,
    setCustomerNotes,
    updateCustomerName,
    updateCustomerPhoneNumber,
    updateCustomerNotes,
    formatNumber,
  };
}
