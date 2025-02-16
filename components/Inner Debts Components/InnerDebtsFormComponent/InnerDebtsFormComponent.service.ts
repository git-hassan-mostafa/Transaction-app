import { useEffect, useState } from "react";
import useContextProvider from "@/Global/ContextApi/ContextApi";
import InnerDebt from "@/Global/Models/InnerDebt";
import { IInnerDebtFormProps } from "@/Global/ViewModels/InnerDebts/IInerDebtsFormProps";
import IInnerDebt from "@/Global/ViewModels/InnerDebts/IInerDebts";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import InnerDebtsManager from "@/Global/Services/innerDebts.service";
import CustomerManager from "@/Global/Services/customers.service";
import MapService from "@/Global/Helpers/MapService";

export default function useInnerDebtsFormComponentService({
  id,
  updateFromInnerDebtsList,
}: IInnerDebtFormProps) {
  //services
  const innerDebtsManager = new InnerDebtsManager();
  const customerManager = new CustomerManager();
  const mapService = new MapService();

  //states
  const [innerDebt, setInnerDebt] = useState<IInnerDebt>({} as IInnerDebt);
  const [customers, setCustomers] = useState<IDropDownItem[]>([]);

  //context
  const { toggleSnackBar } = useContextProvider();

  useEffect(() => {
    getInnerDebt();
    getAllCustomers();
  }, []);

  async function getAllCustomers() {
    const customers = await customerManager.getAllCustomers();
    const sortedCustomers = [
      { label: "", value: undefined },
      ...(customers?.map((c) => {
        return { label: c.Name, value: c.Id };
      }) as IDropDownItem[]),
    ];
    setCustomers(sortedCustomers);
  }

  async function getInnerDebt() {
    const innerDebtDB = await innerDebtsManager.getInnerDebt(id);
    if (!innerDebtDB) return;
    const innerDebt = mapService.mapToIInnerDebt(innerDebtDB);
    setInnerDebt(innerDebt);
    return innerDebtDB;
  }

  function setTotalPrice(value: string) {
    setInnerDebt((prev) => {
      return { ...prev, totalPrice: Number(value) };
    });
  }

  function setPricePaid(value: string) {
    setInnerDebt((prev) => {
      return { ...prev, pricePaid: Number(value) };
    });
  }

  function setCustomer(customerId: number) {
    setInnerDebt((prev) => {
      return { ...prev, customerId };
    });
  }

  function setNotes(value: string) {
    setInnerDebt((prev) => {
      return { ...prev, notes: value };
    });
  }

  async function updateTotalPrice() {
    updateInnerDebt();
  }

  async function updatePricePaid() {
    updateInnerDebt();
  }

  async function updateCustomer(customerId: number) {
    innerDebtsManager.updateInnerDebtCustomer(innerDebt.id, customerId);
  }

  async function updateNotes() {
    updateInnerDebt();
  }

  async function updateInnerDebt() {
    validateInnerDebtFields(innerDebt);
    const updatedInnerDebt: InnerDebt = mapService.mapToInnerDebt(innerDebt);
    const result = await innerDebtsManager.updateInnerDebt(updatedInnerDebt);
    if ((result?.changes || 0) > 0) updateFromInnerDebtsList(innerDebt);
  }

  function validateInnerDebtFields(innerDebt: IInnerDebt) {
    innerDebt.id = id;
    if (!innerDebt.totalPrice) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال السعر الكلي",
        type: "error",
      });
      return false;
    }
    if (!innerDebt.pricePaid) {
      toggleSnackBar({
        visible: true,
        text: "الرجاء ادخال السعر المدفوع",
        type: "error",
      });
      return false;
    }
    if (innerDebt.pricePaid > innerDebt.totalPrice) {
      toggleSnackBar({
        visible: true,
        text: "السعر المدفوع اكبر من السعر الكلي",
        type: "error",
      });
      return false;
    }
    return true;
  }

  return {
    innerDebt,
    customers,
    setTotalPrice,
    setPricePaid,
    setCustomer,
    setNotes,
    updateTotalPrice,
    updatePricePaid,
    updateCustomer,
    updateNotes,
  };
}
