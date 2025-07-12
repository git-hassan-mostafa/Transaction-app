import IInternalDebtProduct from "../InternalDebts/IInternalDebtProduct";
import IInternalDebt from "../InternalDebts/IInternalDebts";

export default interface ICustomer {
  Id: number;
  Name: string;
  PhoneNumber: string;
  Notes?: string;
  // Relations
  InternalDebts?: IInternalDebt[];
  BorrowedPrice: number;
  PayedPrice: number;
  Debts?: IInternalDebt[];
}
