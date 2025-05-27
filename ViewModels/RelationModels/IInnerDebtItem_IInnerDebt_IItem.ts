import IInnerDebt from "../InnerDebts/IInerDebts";
import IInnerDebtItem from "../InnerDebts/IInnerDebtItem";
import IItem from "../Items/IItem";

export default interface IInnerDebtItem_IInnerDebt_IItem
  extends IInnerDebtItem,
    IInnerDebt,
    IItem {}
