import IInternalDebt from "./IInternalDebts";

export default interface IInternalDebtPayment {
  Id: number;
  Amount: number;
  Date: string;
  InternalDebtId: number;

  // Relations
  InternalDebt?: IInternalDebt;
}
