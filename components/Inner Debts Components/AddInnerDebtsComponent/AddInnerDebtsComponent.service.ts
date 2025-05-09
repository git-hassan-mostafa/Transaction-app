import useGlobalContext from "@/Global/Context/ContextProvider";
import { useEffect, useState } from "react";
import InnerDebt from "@/Global/Models/InnerDebt";
import InnerDebtsManager from "@/Global/Services/innerDebts.service";
import InnerDebtItemsManager from "@/Global/Services/innerDebtItems.service";
import CustomerManager from "@/Global/Services/customers.service";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import { IAddInnerDebtServiceProps } from "@/Global/ViewModels/InnerDebts/IAddInnerDebtsProps";
import IInnerDebt from "@/Global/ViewModels/InnerDebts/IInerDebts";
import Mapper from "@/Global/Helpers/MapService";
import { ICustomer_IInnerDebt } from "@/Global/ViewModels/RelationModels/ICustomer_IInnerDebt";
import InnerDebtItem from "@/Global/Models/InnerDebtItem";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";

export default function useAddInnerDebtsComponentService({
  innerDebtsItemsListService,
  toggleModal,
  addToInnerDebtsList,
}: IAddInnerDebtServiceProps) {
  //services
  const innerDebtsManager = new InnerDebtsManager();
  const innerDebtItemsManager = new InnerDebtItemsManager();
  const customerManager = new CustomerManager();
  const mapper = new Mapper();

  //states
  const [innerDebt, setInnerDebt] = useState<IInnerDebt>({} as IInnerDebt);
  const [customersDropDown, setCustomersDropDown] = useState<IDropDownItem[]>(
    []
  );
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [validationError, setValidationError] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });
  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    setTotoalPriceSum();
  }, [innerDebtsItemsListService.innerDebtsItems]);

  async function getAllCustomers() {
    const customers = await customerManager.getAllCustomers();
    const mappedCustomers = customers?.map((c) => {
      return mapper.mapToICustomer(c);
    }) as ICustomer[];

    const sortedCustomers = [
      { label: "", value: undefined },
      ...(customers?.map((c) => {
        return { label: c.Name, value: c.CustomerId };
      }) as IDropDownItem[]),
    ];
    setCustomers(mappedCustomers);
    setCustomersDropDown(sortedCustomers);
  }

  function setTotoalPriceSum() {
    const totalPrice = innerDebtsItemsListService.innerDebtsItems.reduce(
      (sum, item) => {
        return sum + item.itemPrice;
      },
      0
    );
    setInnerDebt((prev) => ({ ...prev, innerDebtTotalPrice: totalPrice }));
  }

  function setTotalPrice(value: string) {
    setInnerDebt((prev) => {
      return { ...prev, innerDebtTotalPrice: Number(value) };
    });
  }

  function setPricePaid(value: string) {
    // setInnerDebt((prev) => {
    //   return { ...prev, pricePaid: Number(value) };
    // });
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

    const newInnerDebt: InnerDebt = {
      InnerDebt_CustomerId: innerDebt.innerDebt_CustomerId,
      Notes: innerDebt.innerDebtNotes,
      Date: new Date().toISOString(),
    };
    const customer = await customerManager.getCustomer(
      innerDebt.innerDebt_CustomerId
    );
    const mappedCustomer = mapper.mapToICustomer(customer || {});

    //check if inner debt already exists
    if (!innerDebt.innerDebtId) {
      const result = await innerDebtsManager.addInnerDebt(newInnerDebt);
      if (!result || !result.lastInsertRowId)
        return toggleSnackBar("حصل خطأ ما , الرجاء اعادة المحاولة ");
      setInnerDebt((prev) => {
        return { ...prev, innerDebtId: result.lastInsertRowId };
      });
      innerDebt.innerDebtId = result.lastInsertRowId;
    }
    // Save inner debt items
    const innerDebtItems: InnerDebtItem[] =
      innerDebtsItemsListService.innerDebtsItems.map((item) => {
        item.innerDebtItem_InnerDebtId = innerDebt.innerDebtId;
        return mapper.mapToInnerDebtItem(item);
      });

    const itemsResult = await innerDebtItemsManager.addInnerDebtItems(
      innerDebtItems
    );
    if (!itemsResult) {
      return toggleSnackBar(
        "حصل خطأ ما في حفظ المنتجات , الرجاء اعادة المحاولة "
      );
    }

    const customerInnerDebt: ICustomer_IInnerDebt = {
      ...innerDebt,
      ...mappedCustomer,
    };
    addToInnerDebtsList(customerInnerDebt);
    toggleModal();
  }

  function validateInnerDebtFields() {
    if (!innerDebt.innerDebt_CustomerId) {
      toggleSnackBar("الرجاء اختيار زبون من القائمة");
      return false;
    }
    if (!innerDebtsItemsListService.innerDebtsItems.length) {
      toggleSnackBar("الرجاء اضافة منتجات الى القائمة");
      return false;
    }
    if (innerDebt.innerDebtPricePaid > innerDebt.innerDebtTotalPrice) {
      toggleSnackBar("السعر المدفوع اكبر من السعر الكلي");
      return false;
    }
    return true;
  }

  function toggleSnackBar(text: string) {
    setValidationError({
      visible: true,
      text,
    });
  }

  return {
    innerDebt,
    customersDropDown,
    validationError,
    setTotalPrice,
    setPricePaid,
    setCustomer,
    setNotes,
    addInnerDebt,
  };
}
