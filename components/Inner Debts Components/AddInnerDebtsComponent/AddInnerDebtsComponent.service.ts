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
        return sum + item.innerDebtItemTotalPrice;
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
        return toggleSnackBar({
          text: "Failed to add inner debt",
          visible: true,
        });
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
      await innerDebtsManager.deleteInnerDebt(innerDebt.innerDebtId);
      return toggleSnackBar({
        text: "Failed to add inner debt items",
        visible: true,
      });
    }

    const customerInnerDebt: ICustomer_IInnerDebt = {
      ...innerDebt,
      ...mappedCustomer,
    };
    addToInnerDebtsList(customerInnerDebt);
    toggleModal();
    toggleSnackBar({
      text: "Inner debt added successfully",
      visible: true,
      type: "success",
    });
  }

  function validateInnerDebtFields() {
    if (!innerDebt.innerDebt_CustomerId) {
      setValidation({ text: "Please select a customer", visible: true });
      return false;
    }
    if (!innerDebtsItemsListService.innerDebtsItems.length) {
      setValidation({ text: "Please add at least one item", visible: true });
      return false;
    }
    if (innerDebt.innerDebtPricePaid > innerDebt.innerDebtTotalPrice) {
      setValidation({
        text: "Paid price cannot be greater than total price",
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
