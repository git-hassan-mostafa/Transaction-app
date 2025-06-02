import ICustomer from "../Customers/ICustomer";
import IInnerDebt from "../InnerDebts/IInerDebts";
import IInnerDebtItem from "../InnerDebts/IInnerDebtItem";
import IProduct from "../Products/IProduct";

export interface ICustomer_IInerDebt_IInnerDebtItem_IItem
  extends ICustomer,
    IInnerDebt,
    IInnerDebtItem,
    IProduct {}
