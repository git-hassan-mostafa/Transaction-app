import IItem from "../Items/IItem";

export default interface IInnerDebt {
  innerDebtId: number;
  totalPrice: number;
  pricePaid: number;
  date: string;
  itemsList: IItem[];
  paymentsList: IItem[]; // to be changed;
  personId: number;
  customerId: number;
  notes: string;
}
