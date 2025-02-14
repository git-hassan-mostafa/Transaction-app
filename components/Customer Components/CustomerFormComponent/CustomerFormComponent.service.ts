import { useEffect, useState } from "react";
import Customer from "@/Global/Models/Customer";
import InnerDebt from "@/Global/Models/InnerDebt";
import CustomerManager from "@/Global/Services/customers.service";
import ICustomerFormProps from "@/Global/ViewModels/Customers/ICustomerFormProps";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import MapService from "@/Global/Helpers/MapService";

export default function useCustomerFormComponentService({
  id,
  updateFromCustomersList,
}: ICustomerFormProps) {
  //services
  const customerManager = new CustomerManager();
  const mapService = new MapService();

  // states
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);

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
    const customer = mapService.mapICustomer(customerDB);
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
    const updatedCustomer: Customer = mapService.mapCustomer(customer);
    await customerManager.updateCustomer(updatedCustomer);
    updateFromCustomersList(customer);
  }

  function validateCustomerFields(customer: ICustomer) {
    customer.id = id;
    customer.name = customer.name.trim();
    customer.phoneNumber = customer.phoneNumber.trim();
    customer.notes = customer.notes?.trim();
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
