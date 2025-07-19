import IInternalDebtPayment from "./IInternalDebtPayment";
import IInternalDebt from "./IInternalDebts";

export interface IInternalDebtsPaymentsServiceProps {
  internalDebt: IInternalDebt;
  addPayment: (internalDebt: IInternalDebtPayment) => void;
  deletePayment: (id: number) => void;
}
