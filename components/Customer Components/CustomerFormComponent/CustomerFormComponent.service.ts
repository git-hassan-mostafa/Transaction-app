import { useEffect, useState } from "react";
import Customer from "@/Global/Models/Customer";
import CustomerManager from "@/Global/Services/customers.service";
import ICustomerFormProps from "@/Global/ViewModels/Customers/ICustomerFormProps";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import Mapper from "@/Global/Helpers/MapService";
import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "@/Global/ViewModels/RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";
import ICustomerDetailsProps from "@/Global/ViewModels/Customers/ICustomerDetailsProps";

export default function useCustomerFormComponentService({
  id,
  updateFromCustomersList,
}: ICustomerFormProps): ICustomerDetailsProps {
  //services
  const customerManager = new CustomerManager();
  const mapper = new Mapper();

  // states
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);
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
    const customerDB = await customerManager.getCustomer(id);
    if (!customerDB) return;
    const customer = mapper.mapToICustomer(customerDB);
    setCustomer(customer);
    return customer;
  }

  async function getBorrowList() {
    const borrowListDB = await customerManager.getCustomerBorrowList(id);
    const mappedBorrowList = borrowListDB?.map((b) => {
      const result = mapper.mapTo_IICustomer_IInerDebt_IInnerDebtItem_IItem(b);
      result.innerDebtItemTotalPrice =
        Number(result.itemPrice) * result.innerDebtItemQuantity;
      return result;
    });
    setBorrowList(
      mappedBorrowList as ICustomer_IInerDebt_IInnerDebtItem_IItem[]
    );
    setCustomerBorrowedPrice(
      mappedBorrowList as ICustomer_IInerDebt_IInnerDebtItem_IItem[]
    );
  }

  function setCustomerBorrowedPrice(
    borrowedList: ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  ) {
    const sum = borrowedList.reduce((sum, item) => {
      return sum + item.innerDebtItemTotalPrice;
    }, 0);
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
    validateCustomerFields(customer);
    const updatedCustomer: Customer = mapper.mapToCustomer(customer);
    await customerManager.updateCustomer(updatedCustomer);
    updateFromCustomersList(customer);
  }

  function validateCustomerFields(customer: ICustomer) {
    customer.customerId = id;
    customer.customerName = customer.customerName.trim();
    customer.customerPhoneNumber = customer.customerPhoneNumber.trim();
    customer.customerNotes = customer.customerNotes?.trim();
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
