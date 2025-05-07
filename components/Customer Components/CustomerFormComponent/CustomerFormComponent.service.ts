import { useEffect, useState } from "react";
import Customer from "@/Global/Models/Customer";
import InnerDebt from "@/Global/Models/InnerDebt";
import CustomerManager from "@/Global/Services/customers.service";
import ICustomerFormProps from "@/Global/ViewModels/Customers/ICustomerFormProps";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import MapService from "@/Global/Helpers/MapService";
import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "@/Global/ViewModels/RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";

export default function useCustomerFormComponentService({
  id,
  updateFromCustomersList,
}: ICustomerFormProps) {
  //services
  const customerManager = new CustomerManager();
  const mapService = new MapService();

  // states
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);
  const [borrowList, setBorrowList] = useState<
    ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  >([]);

  //date options
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    await Promise.all([getCustomer(), getBorrowList()]);
  }

  async function getCustomer() {
    const customerDB = await customerManager.getCustomer(id);
    if (!customerDB) return;
    const customer = mapService.mapToICustomer(customerDB);
    setCustomer(customer);
    return customer;
  }

  async function getBorrowList() {
    const borrowListDB = await customerManager.getCustomerBorrowList(id);
    const mappedBorrowList = borrowListDB?.map((b) => {
      const result =
        mapService.mapTo_IICustomer_IInerDebt_IInnerDebtItem_IItem(b);
      result.innerDebtItemTotalPrice =
        result.itemPrice * result.innerDebtItemQuantity;
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
    const updatedCustomer: Customer = mapService.mapToCustomer(customer);
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
    if (!number) return 0;
    return number > 999 ? "999+" : number;
  };

  return {
    customer,
    borrowList,
    options,
    setCustomerName,
    setCustomerPhoneNumber,
    setCustomerNotes,
    updateCustomerName,
    updateCustomerPhoneNumber,
    updateCustomerNotes,
    formatNumber,
  };
}
