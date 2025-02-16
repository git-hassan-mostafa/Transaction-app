import IInnerDebt from "./IInerDebts";

export interface IAddInnerDebtProps {
  addToInnerDebtsList: (value: IInnerDebt) => void;
  toggleModal: () => void;
}
