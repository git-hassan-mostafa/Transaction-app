import { useEffect, useState } from "react";
import useGlobalContext from "@/Shared/Context/ContextProvider";
import IDropDownItem from "@/Shared/Types/IDropDownItem";
import i18n from "@/Shared/I18n/I18n";
import useService from "@/Shared/Context/ServiceProvider";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import IInternalDebtDetailsService from "@/Models/InternalDebts/IInternalDebtDetailsService";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";
import { IInternalDebtsFormServiceProps } from "@/Models/InternalDebts/IInternalDebtsFormServiceProps";

export default function useInternalDebtDetailsService(
  props: IInternalDebtsFormServiceProps
): IInternalDebtDetailsService {
  //services
  const { internalDebtManager, customerManager } = useService();

  //states
  const [internalDebt, setInternalDebt] = useState<IInternalDebt>(
    props.formData
  );
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

    return () => {
      props.dirtyChecker.dispose();
    };
  }, []);

  useEffect(() => {
    props.dirtyChecker.setState(internalDebt);
  }, [internalDebt]);

  useEffect(() => {
    setPricesSum();
  }, [props.internalDebtsProductsListService.internalDebtsProducts]);

  async function fetchAllData() {
    await getAllCustomers();
    props.dirtyChecker.setOriginalState(props.formData);
  }

  async function getAllCustomers() {
    const mappedCustomers = await customerManager.getAllCustomers();
    const dropDownCustomers =
      internalDebtManager.dropDownCutomers(mappedCustomers);
    setCustomersDropDown(dropDownCustomers);
  }

  function setPricesSum() {
    if (
      (props.internalDebtsProductsListService.internalDebtsProducts || [])
        .length === 0
    )
      return;
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
    await props.save(
      internalDebt,
      props.internalDebtsProductsListService.internalDebtsProducts,
      validateInternalDebtFields
    );
  }

  function validateInternalDebtFields(internalDebt: IInternalDebt) {
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
