import { useEffect, useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import { IInnerDebtsFormServiceProps } from "@/ViewModels/InnerDebts/IInerDebtsFormProps";
import IInnerDebt from "@/ViewModels/InnerDebts/IInerDebts";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import IInternalDebtDetailsService from "@/ViewModels/InnerDebts/IInternalDebtDetailsService";
import { ICustomer_IInnerDebt } from "@/ViewModels/RelationModels/ICustomer_IInnerDebt";

export default function useInternalDebtDetailsService(
  props: IInnerDebtsFormServiceProps
): IInternalDebtDetailsService {
  //services
  const { internalDebtManager, customerManager } = useService();

  //states
  const [internalDebt, setInnerDebt] = useState<IInnerDebt>({
    innerDebtId: props.id,
  } as IInnerDebt);
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
    fetchAllData();
  }, []);

  useEffect(() => {
    setPricesSum();
  }, [props.internalDebtsItemsListService.innerDebtsItems]);

  async function fetchAllData() {
    await Promise.all([getInnerDebt(), getAllCustomers()]);
  }

  async function getAllCustomers() {
    const mappedCustomers = await customerManager.getAllCustomers();
    const dropDownCustomers =
      internalDebtManager.dropDownCutomers(mappedCustomers);
    setCustomersDropDown(dropDownCustomers);
  }

  async function getInnerDebt() {
    if (!props.id) return;
    const internalDebtDB = await internalDebtManager.getInternalDebt(props.id);
    setInnerDebt(internalDebtDB);
  }

  function setPricesSum() {
    const totalPrice = internalDebtManager.getTotalPricesSum(
      props.internalDebtsItemsListService.innerDebtsItems
    );
    const pricePaid = internalDebtManager.getPricePaidSum();

    setInnerDebt((prev) => ({
      ...prev,
      innerDebtTotalPrice: totalPrice,
      innerDebtPricePaid: pricePaid,
    }));
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

  async function save() {
    if (props.id) updateInnerDebt();
    else addInnerDebt();
  }

  async function addInnerDebt() {
    if (!validateInnerDebtFields()) return;
    const result = await internalDebtManager.addInternalDebt(
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
    if (result.success) {
      // await props.innerDebtsItemsListService.refreshInnerDebtsItems?.(
      //   result.data
      // );
      props.addToInnerDebtsList(result.data);
      props.toggleModal();
      context.toggleSnackBar({
        text: result.message,
        visible: true,
        type: "success",
      });
    }
  }

  async function updateInnerDebt() {
    if (!validateInnerDebtFields()) return;
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

  function validateInnerDebtFields() {
    if (!internalDebt.innerDebt_CustomerId) {
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
    if (internalDebt.innerDebtPricePaid > internalDebt.innerDebtTotalPrice) {
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
    save,
  };
}
