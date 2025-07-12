import IExternalDebt from "./IExternalDebt";

export default interface IExternalDebtPayment {
  Id: number;
  Amount: number;
  Date: string;
  ExternalDebtId: number;
  // Relations
  ExternalDebt?: IExternalDebt;
}
