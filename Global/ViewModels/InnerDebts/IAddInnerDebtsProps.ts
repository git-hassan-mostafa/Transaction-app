import { ICustomerInnerDebt } from "../RelationModels/ICustomerInnerDebt";

export interface IAddInnerDebtProps {
  addToInnerDebtsList: (value: ICustomerInnerDebt) => void;
  toggleModal: () => void;
}
