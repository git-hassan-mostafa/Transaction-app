import { useEffect, useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import { IInternalDebtsFormServiceProps } from "@/ViewModels/InternalDebts/IInternalDebtsFormProps";
import IInternalDebt from "@/ViewModels/InternalDebts/IInternalDebts";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import IInternalDebtDetailsService from "@/ViewModels/InternalDebts/IInternalDebtDetailsService";
import { ICustomer_IInnternalDebt } from "@/ViewModels/RelationModels/ICustomer_IInnternalDebt";

export default function useInternalDebtDetailsService(
  props: IInternalDebtsFormServiceProps
): IInternalDebtDetailsService {
  //services
  const { internalDebtManager, customerManager } = useService();

  //states
  const [internalDebt, setInternalDebt] = useState<IInternalDebt>({
    internalDebtId: props.id,
  } as IInternalDebt);
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
  }, [props.internalDebtsProductsListService.internalDebtsProducts]);

  async function fetchAllData() {
    await Promise.all([getInternalDebt(), getAllCustomers()]);
  }

  async function getAllCustomers() {
    const mappedCustomers = await customerManager.getAllCustomers();
    const dropDownCustomers =
      internalDebtManager.dropDownCutomers(mappedCustomers);
    setCustomersDropDown(dropDownCustomers);
  }

  async function getInternalDebt() {
    if (!props.id) return;
    const internalDebtDB = await internalDebtManager.getInternalDebt(props.id);
    setInternalDebt(internalDebtDB);
  }

  function setPricesSum() {
    const totalPrice = internalDebtManager.getTotalPricesSum(
      props.internalDebtsProductsListService.internalDebtsProducts
    );
    const pricePaid = internalDebtManager.getPricePaidSum();

    setInternalDebt((prev) => ({
      ...prev,
      internalDebtTotalPrice: totalPrice,
      internalDebtPricePaid: pricePaid,
    }));
  }

  function setTotalPrice(value: string) {
    setInternalDebt((prev) => {
      return { ...prev, internalDebtTotalPrice: Number(value) };
    });
  }

  function setPricePaid(value: string) {
    setInternalDebt((prev) => {
      return { ...prev, internalDebtPricePaid: Number(value) };
    });
  }

  function setCustomer(customerId: number) {
    setInternalDebt((prev) => {
      return { ...prev, internalDebt_CustomerId: customerId };
    });
  }

  function setNotes(value: string) {
    setInternalDebt((prev) => {
      return { ...prev, internalDebtNotes: value };
    });
  }

  async function save() {
    if (props.id) updateInternalDebt();
    else addInternalDebt();
  }

  async function addInternalDebt() {
    if (!validateInternalDebtFields()) return;
    const result = await internalDebtManager.addInternalDebt(
      internalDebt,
      props.internalDebtsProductsListService.internalDebtsProducts
    );

    if (!result.success && result.message) {
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    }
    if (result.success) {
      // await props.internalDebtsProductsListService.refreshInternalDebtsProducts?.(
      //   result.data
      // );
      props.addToInternalDebtsList(result.data);
      props.toggleModal();
      context.toggleSnackBar({
        text: result.message,
        visible: true,
        type: "success",
      });
    }
  }

  async function updateInternalDebt() {
    if (!validateInternalDebtFields()) return;
    const result = await internalDebtManager.updateInternalDebt(
      internalDebt,
      props.internalDebtsProductsListService.internalDebtsProducts
    );
    if (!result.success && result.message) {
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    }
    props.toggleModal();
    props.updateFromInternalDebtsList(result.data);
    context.toggleSnackBar({
      text: result.message,
      visible: true,
      type: "success",
    });
  }

  function validateInternalDebtFields() {
    if (!internalDebt.internalDebt_CustomerId) {
      setValidation({
        text: i18n.t("please-select-a-customer"),
        visible: true,
      });
      return false;
    }
    if (!props.internalDebtsProductsListService.internalDebtsProducts.length) {
      setValidation({
        visible: true,
        text: i18n.t("please-add-at-least-one-product"),
      });
      return false;
    }
    if (
      internalDebt.internalDebtPricePaid > internalDebt.internalDebtTotalPrice
    ) {
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
