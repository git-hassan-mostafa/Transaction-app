import { useEffect, useState } from "react";
import useGlobalContext from "@/Shared/Context/ContextProvider";
import IDropDownItem from "@/Shared/Types/IDropDownItem";
import i18n from "@/Shared/I18n/I18n";
import useService from "@/Shared/Context/ServiceProvider";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import IInternalDebtDetailsService from "@/Models/InternalDebts/IInternalDebtDetailsService";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";
import { IInternalDebtFormProps } from "@/Models/InternalDebts/IInternalDebtsFormProps";
import IInternalDebtProduct from "@/Models/InternalDebts/IInternalDebtProduct";
export default function useInternalDebtDetailsService(
  props: IInternalDebtFormProps
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
    const newTotalPrice =
      internalDebtManager.getInternalDebtTotalPrice(internalDebt);
    if (internalDebt.TotalPrice !== newTotalPrice) {
      setInternalDebt(
        (prev): IInternalDebt => ({
          ...prev,
          TotalPrice: newTotalPrice,
        })
      );
    }
  }, [internalDebt.InternalDebtProducts]);

  async function fetchAllData() {
    await getAllCustomers();
    props.dirtyChecker.setOriginalState(props.formData);
  }

  async function getAllCustomers() {
    const mappedCustomers = await customerManager.getAllCustomers(false);
    const dropDownCustomers =
      internalDebtManager.dropDownCutomers(mappedCustomers);
    setCustomersDropDown(dropDownCustomers);
  }

  function setTotalPrice(value: string) {
    setInternalDebt((prev): IInternalDebt => {
      return { ...prev, TotalPrice: Number(value) };
    });
  }

  function setPricePaid(value: string) {
    setInternalDebt((prev): IInternalDebt => {
      return { ...prev, PaidPrice: Number(value) };
    });
  }

  function setCustomer(customerId: number) {
    setInternalDebt((prev): IInternalDebt => {
      return { ...prev, CustomerId: customerId };
    });
  }

  function setNotes(value: string) {
    setInternalDebt((prev) => {
      return { ...prev, internalDebtNotes: value };
    });
  }

  function addInternalDebtProduct(product: IInternalDebtProduct) {
    setInternalDebt((prev): IInternalDebt => {
      return {
        ...prev,
        InternalDebtProducts: [...(prev.InternalDebtProducts || []), product],
      };
    });
  }

  function updateInternalDebtProduct(product: IInternalDebtProduct) {
    setInternalDebt((prev): IInternalDebt => {
      const updatedProducts = prev.InternalDebtProducts?.map((p) =>
        p.Id === product.Id ? product : p
      );
      return { ...prev, InternalDebtProducts: updatedProducts };
    });
  }

  function deleteInternalDebtProduct(id: number) {
    setInternalDebt((prev): IInternalDebt => {
      const updatedProducts = prev.InternalDebtProducts?.filter(
        (p) => p.Id !== id
      );
      return { ...prev, InternalDebtProducts: updatedProducts };
    });
  }

  async function save() {
    await props.save(internalDebt, validateInternalDebtFields);
  }

  function validateInternalDebtFields(internalDebt: IInternalDebt) {
    if (!internalDebt.CustomerId) {
      setValidation({
        text: i18n.t("please-select-a-customer"),
        visible: true,
      });
      return false;
    }
    if (!internalDebt.InternalDebtProducts.length) {
      setValidation({
        visible: true,
        text: i18n.t("please-add-at-least-one-product"),
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
    addInternalDebtProduct,
    updateInternalDebtProduct,
    deleteInternalDebtProduct,
    save,
  };
}
