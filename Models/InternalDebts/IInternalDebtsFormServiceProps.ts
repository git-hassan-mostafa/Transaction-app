import IInternalDebtProduct from "./IInternalDebtProduct";
import IInternalDebt from "./IInternalDebts";

export interface IInternalDebtsProductsListServiceProps {
  internalDebt: IInternalDebt;
  addInternalDebtProduct: (internalDebt: IInternalDebtProduct) => void;
  deleteInternalDebtProduct: (id: number) => void;
  updateInternalDebtProduct: (internalDebt: IInternalDebtProduct) => void;
}
