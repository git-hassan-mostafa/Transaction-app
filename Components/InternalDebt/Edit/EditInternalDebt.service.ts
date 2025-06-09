import { useEffect, useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import { IInnerDebtsFormServiceProps } from "@/ViewModels/InnerDebts/IInerDebtsFormProps";
import IInnerDebt from "@/ViewModels/InnerDebts/IInerDebts";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";

export default function useEditInternalDebtService(
  props: IInnerDebtsFormServiceProps
) {
  //services
  const { internalDebtManager, customerManager } = useService();

  //states
  const [internalDebt, setInnerDebt] = useState<IInnerDebt>({} as IInnerDebt);
  const [customersDropDown, setCustomersDropDown] = useState<IDropDownItem[]>(
    []
  );
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

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
      internalDebtManager.dropDownCutomers(mappedCustomers);
    setCustomersDropDown(dropDownCustomers);
  }

  async function getInnerDebt() {
    const internalDebtDB = await internalDebtManager.getInternalDebt(props.id);
    setInnerDebt(internalDebtDB);
  }

  function setTotoalPriceSum() {
    const totalPrice = internalDebtManager.getTotalPricesSum(
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

  async function updateInnerDebt() {
    if (!validateInnerDebtFields(internalDebt)) return;
    const result = await internalDebtManager.updateInternalDebt(
      internalDebt,
      props.internalDebtsItemsListService.innerDebtsItems
    );
    if (!result.success && result.message) {
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    }
    props.toggleModal();
    props.updateFromInnerDebtsList(result.data);
    context.toggleSnackBar({
      text: result.message,
      visible: true,
      type: "success",
    });
  }

  function validateInnerDebtFields(innerDebt: IInnerDebt) {
    innerDebt.innerDebtId = props.id;
    if (!innerDebt.innerDebt_CustomerId) {
      setValidation({
        text: i18n.t("please-select-a-customer"),
        visible: true,
      });
      return false;
    }
    if (!props.internalDebtsItemsListService.innerDebtsItems.length) {
      setValidation({
        visible: true,
        text: i18n.t("please-add-at-least-one-product"),
      });
      return false;
    }
    if (innerDebt.innerDebtPricePaid > innerDebt.innerDebtTotalPrice) {
      setValidation({
        visible: true,
        text: i18n.t("paid-price-cannot-be-greater-than-total-price"),
      });
      return false;
    }
    return true;
  }

  return {
    internalDebt,
    customersDropDown,
    validation,
    setTotalPrice,
    setPricePaid,
    setCustomer,
    setNotes,
    updateInnerDebt,
  };
}
