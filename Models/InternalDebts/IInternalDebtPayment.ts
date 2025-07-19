import IInternalDebt from "./IInternalDebts";

export default interface IInternalDebtPayment {
  Id: number;
  IsNew?: boolean;
  Amount: number;
  Date: string;
  InternalDebtId: number;

  // Relations
  InternalDebt?: IInternalDebt;
}
