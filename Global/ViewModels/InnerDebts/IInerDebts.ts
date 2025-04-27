import IItem from "../Items/IItem";
import IInnerDebtPayment from "./IInnerDebtPayment";

export default interface IInnerDebt {
  innerDebtId: number;
  totalPrice: number;
  pricePaid: number;
  date: string;
  itemsList: IItem[];
  paymentsList: IInnerDebtPayment[];
  personId: number;
  customerId: number;
  notes: string;
}
