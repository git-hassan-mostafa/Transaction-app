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

  async function updateCustomerName() {
    validateCustomerFields(customer);
    const updatedCustomer: Customer = mapCustomer(customer);
    const result = await customerManager.updateCustomer(updatedCustomer);
    if ((result?.changes || 0) > 0) updateFromCustomersList(updatedCustomer);
  }

  async function updateCustomerPhoneNumber() {
    validateCustomerFields(customer);
    const updatedCustomer: Customer = mapCustomer(customer);
    await customerManager.updateCustomer(updatedCustomer);
  }

  function validateCustomerFields(customer: ICustomer) {
    customer.id = id;
    customer.name = customer.name.trim();
    customer.phoneNumber = customer.phoneNumber.trim();
  }

  function mapCustomer(customer: ICustomer): Customer {
    return {
      id: customer.id as number,
      name: customer.name as string,
      borrowedPrice: customer.borrowedPrice as number,
      payedPrice: customer.payedPrice as number,
      phoneNumber: customer.phoneNumber as string,
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
    };
  }

  return {
    customer,
    setCustomerName,
    setCustomerPhoneNumber,
    updateCustomerName,
    updateCustomerPhoneNumber,
  };
}
