import IInnerDebt from "./IInerDebts";

export interface IInnerDebtFormProps {
  id: number;
  updateFromInnerDebtsList: (innerDebt: IInnerDebt) => void;
}
