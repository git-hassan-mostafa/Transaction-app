import Customer from "../Customer";
import InnerDebt from "../InnerDebt";
import InnerDebtItem from "../InnerDebtItem";
import Item from "../Item";

export default interface Customer_InnerDebt_InnerDebtItem_Item
  extends Customer,
    InnerDebt,
    InnerDebtItem,
    Item {}
