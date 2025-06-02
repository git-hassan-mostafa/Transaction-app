import IInnerDebt from "../InnerDebts/IInerDebts";
import IInnerDebtItem from "../InnerDebts/IInnerDebtItem";
import IProduct from "../Products/IProduct";

export default interface IInnerDebtItem_IInnerDebt_IItem
  extends IInnerDebtItem,
    IInnerDebt,
    IProduct {}
