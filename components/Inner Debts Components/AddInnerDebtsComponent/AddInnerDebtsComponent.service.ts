import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useEffect, useState } from "react";
import InnerDebt from "@/Global/Models/InnerDebt";
import InnerDebtsManager from "@/Global/Services/innerDebts.service";
import CustomerManager from "@/Global/Services/customers.service";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import { IAddInnerDebtProps } from "@/Global/ViewModels/InnerDebts/IAddInnerDebtsProps";
import IInnerDebt from "@/Global/ViewModels/InnerDebts/IInerDebts";
import MapService from "@/Global/Helpers/MapService";
import { ICustomerInnerDebt } from "@/Global/ViewModels/RelationModels/ICustomerInnerDebt";

export default function useAddInnerDebtsComponentService({
  innerDebtsItemsListService,
  toggleModal,
  addToInnerDebtsList,
}: IAddInnerDebtProps) {
  //services

  const innerDebtsManager = new InnerDebtsManager();
  const customerManager = new CustomerManager();
  const mapService = new MapService();
  const {} = innerDebtsItemsListService;

  //states
  const [innerDebt, setInnerDebt] = useState<IInnerDebt>({} as IInnerDebt);
  const [customers, setCustomers] = useState<IDropDownItem[]>([]);

  //context
  const { toggleSnackBar } = useContextProvider();

  useEffect(() => {
    getAllCustomers();
  }, []);

  async function getAllCustomers() {
    const customers = await customerManager.getAllCustomers();
    setCustomers([
      ...(customers?.map((c) => {
        return { label: c.Name, value: c.CustomerId };
      }) as IDropDownItem[]),
    ]);
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

  async function addInnerDebt() {
    if (!validateInnerDebtFields()) return;

    const newInnerDebt: InnerDebt = {
      TotalPrice: innerDebt.totalPrice,
      PricePaid: innerDebt.pricePaid,
      CustomerId: innerDebt.customerId,
      Notes: innerDebt.notes,
      Date: new Date().toISOString(),
    };
    const customer = await customerManager.getCustomer(innerDebt.customerId);
    const mappedCustomer = mapService.mapToICustomer(customer || {});
    const result = await innerDebtsManager.addInnerDebt(newInnerDebt);
    if (!result || !result.lastInsertRowId)
      return toggleSnackBar({
        visible: true,
        text: "حصل خطأ ما , الرجاء اعادة المحاولة ",
        type: "error",
      });
    innerDebt.innerDebtId = result?.lastInsertRowId;

    const customerInnerDebt: ICustomerInnerDebt = {
      ...innerDebt,
      ...mappedCustomer,
    };
    addToInnerDebtsList(customerInnerDebt);
    toggleModal();
  }

  function validateInnerDebtFields() {
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
    addInnerDebt,
  };
}
