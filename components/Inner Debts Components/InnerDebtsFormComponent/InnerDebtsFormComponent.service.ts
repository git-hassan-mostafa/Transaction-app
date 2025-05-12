import { useEffect, useState } from "react";
import useGlobalContext from "@/Global/Context/ContextProvider";
import InnerDebt from "@/Global/Models/InnerDebt";
import {
  IInnerDebtFormProps,
  IInnerDebtsFormServiceProps,
} from "@/Global/ViewModels/InnerDebts/IInerDebtsFormProps";
import IInnerDebt from "@/Global/ViewModels/InnerDebts/IInerDebts";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import InnerDebtsManager from "@/Global/Services/innerDebts.service";
import CustomerManager from "@/Global/Services/customers.service";
import Mapper from "@/Global/Helpers/MapService";
import { ICustomer_IInnerDebt } from "@/Global/ViewModels/RelationModels/ICustomer_IInnerDebt";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import i18n from "@/Global/I18n/I18n";

export default function useInnerDebtsFormComponentService({
  id,
  updateFromInnerDebtsList,
  innerDebtsItemsListService,
}: IInnerDebtsFormServiceProps) {
  //services
  const innerDebtsManager = new InnerDebtsManager();
  const customerManager = new CustomerManager();
  const mapper = new Mapper();

  //states
  const [innerDebt, setInnerDebt] = useState<IInnerDebt>({} as IInnerDebt);
  const [customersDropDown, setCustomersDropDown] = useState<IDropDownItem[]>(
    []
  );
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  //context
  const { toggleSnackBar } = useGlobalContext();

  useEffect(() => {
    getInnerDebt();
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

  async function getInnerDebt() {
    const innerDebtDB = await innerDebtsManager.getInnerDebt(id);
    if (!innerDebtDB) return;
    const innerDebt = mapper.mapToIInnerDebt(innerDebtDB);
    setInnerDebt(innerDebt);
    return innerDebtDB;
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
    const result = await innerDebtsManager.updateInnerDebtCustomer(
      innerDebt.innerDebtId,
      customerId
    );
    const customer = customers.find((c) => c.customerId === customerId);
    const customerInnerDebt: ICustomer_IInnerDebt = {
      ...innerDebt,
      ...(customer as ICustomer),
    };
    if (result) {
      updateFromInnerDebtsList(customerInnerDebt);
    }
  }

  async function updateNotes() {
    updateInnerDebt();
  }

  async function updateInnerDebt() {
    validateInnerDebtFields(innerDebt);
    const customer = customers.find(
      (c) => c.customerId === innerDebt.innerDebt_CustomerId
    );
    const customerInnerDebt: ICustomer_IInnerDebt = {
      ...innerDebt,
      ...(customer as ICustomer),
    };
    const updatedInnerDebt: InnerDebt = mapper.mapToInnerDebt(innerDebt);
    const result = await innerDebtsManager.updateInnerDebt(updatedInnerDebt);
    if ((result?.changes || 0) > 0) updateFromInnerDebtsList(customerInnerDebt);
  }

  function validateInnerDebtFields(innerDebt: IInnerDebt) {
    innerDebt.innerDebtId = id;
    if (!innerDebt.innerDebt_CustomerId) {
      toggleSnackBar({
        text: i18n.t("please-select-a-customer"),
        visible: true,
      });
      return false;
    }
    if (!innerDebtsItemsListService.innerDebtsItems.length) {
      toggleSnackBar({
        visible: true,
        text: i18n.t("please-add-at-least-one-product"),
        type: "error",
      });
      return false;
    }
    if (innerDebt.innerDebtPricePaid > innerDebt.innerDebtTotalPrice) {
      toggleSnackBar({
        visible: true,
        text: i18n.t("paid-price-cannot-be-greater-than-total-price"),
        type: "error",
      });
      return false;
    }
    return true;
  }

  return {
    innerDebt,
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
