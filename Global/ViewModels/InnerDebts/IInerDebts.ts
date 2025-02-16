import ICustomer from "../Customers/ICustomer";

export default interface IInnerDebt {
  id: number;
  totalPrice: number;
  pricePaid: number;
  date: string;
  itemsList: string;
  paymentsList: string;
  personId: number;
  customerId: number;
  notes: string;
  customer: ICustomer;
}
