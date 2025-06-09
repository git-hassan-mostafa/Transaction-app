import useGlobalContext from "@/Global/Context/ContextProvider";
import { useEffect, useState } from "react";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import { IAddInnerDebtServiceProps } from "@/ViewModels/InnerDebts/IAddInnerDebtsProps";
import IInnerDebt from "@/ViewModels/InnerDebts/IInerDebts";
import { ICustomer_IInnerDebt } from "@/ViewModels/RelationModels/ICustomer_IInnerDebt";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import ICustomer from "@/ViewModels/Customers/ICustomer";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";
import { dateOptions } from "@/Global/Constants/DateOptions";

export default function useAddInternalDebtService(
  props: IAddInnerDebtServiceProps
) {
  //services
  const { internalDebtManager, customerManager } = useService();

  //states
  const [innerDebt, setInnerDebt] = useState<IInnerDebt>({} as IInnerDebt);
  const [customersDropDown, setCustomersDropDown] = useState<IDropDownItem[]>(
    []
  );
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  const { toggleSnackBar } = useGlobalContext();

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    setTotoalPriceSum();
  }, [props.innerDebtsItemsListService.innerDebtsItems]);

  async function getAllCustomers() {
    const mappedCustomers = await customerManager.getAllCustomers();
    const dropDownCustomers =
      internalDebtManager.dropDownCutomers(mappedCustomers);
    setCustomers(mappedCustomers);
    setCustomersDropDown(dropDownCustomers);
  }

  function setTotoalPriceSum() {
    const internalDebtsItems = props.innerDebtsItemsListService.innerDebtsItems;
    const totalPrice =
      internalDebtManager.getTotalPricesSum(internalDebtsItems);
    setInnerDebt((prev) => ({ ...prev, innerDebtTotalPrice: totalPrice }));
  }

  function setTotalPrice(value: string) {
    setInnerDebt((prev) => {
      return { ...prev, innerDebtTotalPrice: Number(value) };
    });
  }

  function setPricePaid(value: string) {
    setInnerDebt((prev): IInnerDebt => {
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

  async function addInnerDebt() {
    if (!validateInnerDebtFields()) return;
    const customer = customers.filter(
      (c) => c.customerId === innerDebt.innerDebt_CustomerId
    )[0];
    const result = await internalDebtManager.addInternalDebt(
      innerDebt,
      props.innerDebtsItemsListService.innerDebtsItems
    );

    if (!result.success && result.message) {
      return toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    }
    if (result.data > 0) {
      // await props.innerDebtsItemsListService.refreshInnerDebtsItems?.(
      //   result.data
      // );
      innerDebt.innerDebtDate = new Date().toISOString();
      const customerInnerDebt: ICustomer_IInnerDebt = {
        ...innerDebt,
        ...customer,
      };
      props.addToInnerDebtsList(customerInnerDebt);
      props.toggleModal();
      toggleSnackBar({
        text: result.message,
        visible: true,
        type: "success",
      });
    }
  }

  function validateInnerDebtFields() {
    if (!innerDebt.innerDebt_CustomerId) {
      setValidation({
        text: i18n.t("please-select-a-customer"),
        visible: true,
      });
      return false;
    }
    if (!props.innerDebtsItemsListService.innerDebtsItems.length) {
      setValidation({
        text: i18n.t("please-add-at-least-one-product"),
        visible: true,
      });
      return false;
    }
    if (innerDebt.innerDebtPricePaid > innerDebt.innerDebtTotalPrice) {
      setValidation({
        text: i18n.t("paid-price-cannot-be-greater-than-total-price"),
        visible: true,
      });
      return false;
    }
    return true;
  }

  return {
    innerDebt,
    customersDropDown,
    validation,
    setTotalPrice,
    setPricePaid,
    setCustomer,
    setNotes,
    addInnerDebt,
  };
}
