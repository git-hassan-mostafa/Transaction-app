import { useEffect, useState } from "react";
import ICustomer, { ICustomerProps } from "./CustomerFormComponent.types";
import useContextProvider from "@/Global/ContextApi/ContextApi";
import Customer from "@/Global/Models/Customer";
import InnerDebt from "@/Global/Models/InnerDebt";

export default function useCustomerFormComponentService({
  id,
  updateFromCustomersList,
}: ICustomerProps) {
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);

  const { customerManager } = useContextProvider();

  useEffect(() => {
    getCustomer().then(() => {
      customerManager.getCustomerDebts(id).then((data) => {
        setCustomer((prev) => {
          return { ...prev, borrowList: data as InnerDebt[] };
        });
      });
    });
  }, []);

  async function getCustomer() {
    const customerDB = await customerManager.getCustomer(id);
    if (!customerDB) return;
    const customer = mapICustomer(customerDB);
    setCustomer(customer);
    return customer;
  }

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
    const updatedCustomer: Customer = mapCustomer(customer);
    await customerManager.updateCustomer(updatedCustomer);
    updateFromCustomersList(updatedCustomer);
  }

  function validateCustomerFields(customer: ICustomer) {
    customer.id = id;
    customer.name = customer.name.trim();
    customer.phoneNumber = customer.phoneNumber.trim();
    customer.notes = customer.notes?.trim();
  }

  function mapCustomer(customer: ICustomer): Customer {
    return {
      id: customer.id as number,
      name: customer.name as string,
      borrowedPrice: customer.borrowedPrice as number,
      payedPrice: customer.payedPrice as number,
      phoneNumber: customer.phoneNumber as string,
      notes: customer.notes as string,
    };
  }

  function mapICustomer(customer: Customer): ICustomer {
    return {
      id: customer.id as number,
      name: customer.name as string,
      borrowedPrice: customer.borrowedPrice as number,
      payedPrice: customer.payedPrice as number,
      phoneNumber: customer.phoneNumber as string,
      borrowList: [],
      notes: customer.notes as string,
    };
  }

  return {
    customer,
    setCustomerName,
    setCustomerPhoneNumber,
    setCustomerNotes,
    updateCustomerName,
    updateCustomerPhoneNumber,
    updateCustomerNotes,
  };
}
