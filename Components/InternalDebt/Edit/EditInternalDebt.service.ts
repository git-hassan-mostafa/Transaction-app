import { useEffect, useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import { IInnerDebtsFormServiceProps } from "@/ViewModels/InnerDebts/IInerDebtsFormProps";
import IInnerDebt from "@/ViewModels/InnerDebts/IInerDebts";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import i18n from "@/Global/I18n/I18n";
import BLLFactory from "@/Factories/BLLFactory";

export default function useEditInternalDebtService(
  props: IInnerDebtsFormServiceProps
) {
  //services
  const internalDebtsManager = BLLFactory.InternalDebtManager();
  const customerManager = BLLFactory.CustomerManager();

  //states
  const [internalDebt, setInnerDebt] = useState<IInnerDebt>({} as IInnerDebt);
  const [customersDropDown, setCustomersDropDown] = useState<IDropDownItem[]>(
    []
  );

  //context
  const context = useGlobalContext();

  useEffect(() => {
    getInnerDebt();
    getAllCustomers();
  }, []);

  useEffect(() => {
    setTotoalPriceSum();
  }, [props.internalDebtsItemsListService.innerDebtsItems]);

  async function getAllCustomers() {
    const mappedCustomers = await customerManager.getAllCustomers();
    const dropDownCustomers =
      internalDebtsManager.dropDownCutomers(mappedCustomers);
    setCustomersDropDown(dropDownCustomers);
  }

  async function getInnerDebt() {
    const internalDebtDB = await internalDebtsManager.getInternalDebt(props.id);
    setInnerDebt(internalDebtDB);
  }

  function setTotoalPriceSum() {
    const totalPrice = internalDebtsManager.getTotalPricesSum(
      props.internalDebtsItemsListService.innerDebtsItems
    );
    setInnerDebt((prev) => ({ ...prev, innerDebtTotalPrice: totalPrice }));
  }

  function setTotalPrice(value: string) {
    setInnerDebt((prev) => {
      return { ...prev, innerDebtTotalPrice: Number(value) };
    });
  }

  function setPricePaid(value: string) {
    setInnerDebt((prev) => {
      return { ...prev, innerDebtPricePaid: Number(value) };
    });
  }

  function setCustomer(customerId: number) {
    setInnerDebt((prev) => {
      return { ...prev, innerDebt_CustomerId: customerId };
    });
  }

  function setNotes(value: string) {
    setInnerDebt((prev) => {
      return { ...prev, innerDebtNotes: value };
    });
  }

  async function updateTotalPrice() {
    updateInnerDebt();
  }

  async function updatePricePaid() {
    updateInnerDebt();
  }

  async function updateCustomer(customerId: number) {
    const result = await internalDebtsManager.updateInnerDebtCustomer(
      internalDebt,
      customerId
    );
    if (result) {
      props.updateFromInnerDebtsList(result.data);
    }
  }

  async function updateNotes() {
    updateInnerDebt();
  }

  async function updateInnerDebt() {
    if (!validateInnerDebtFields(internalDebt)) return;
    const result = await internalDebtsManager.updateInternalDebt(internalDebt);
    if (result?.success) props.updateFromInnerDebtsList(result.data);
  }

  function validateInnerDebtFields(innerDebt: IInnerDebt) {
    innerDebt.innerDebtId = props.id;
    if (!innerDebt.innerDebt_CustomerId) {
      context.toggleSnackBar({
        text: i18n.t("please-select-a-customer"),
        visible: true,
        type: "error",
      });
      return false;
    }
    if (!props.internalDebtsItemsListService.innerDebtsItems.length) {
      context.toggleSnackBar({
        visible: true,
        text: i18n.t("please-add-at-least-one-product"),
        type: "error",
      });
      return false;
    }
    if (innerDebt.innerDebtPricePaid > innerDebt.innerDebtTotalPrice) {
      context.toggleSnackBar({
        visible: true,
        text: i18n.t("paid-price-cannot-be-greater-than-total-price"),
        type: "error",
      });
      return false;
    }
    return true;
  }

  return {
    internalDebt,
    customersDropDown,
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
