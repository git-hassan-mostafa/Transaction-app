import IInternalDebtPayment from "./IInternalDebtPayment";
import IInternalDebt from "./IInternalDebts";

export default interface IInternalDebtsPaymentsService {
  internalDebt: IInternalDebt;
  newPayment: IInternalDebtPayment;
  setPaymentAmount: (value: string) => void;
  showAddPayment: boolean;
  handleAddPayment: () => void;
  toggleAddPayment: (value: boolean) => void;
  handleDeletePayment: (id: number) => void;
}
