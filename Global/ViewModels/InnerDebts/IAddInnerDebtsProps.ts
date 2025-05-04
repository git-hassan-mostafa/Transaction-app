import { ICustomer_IInnerDebt } from "../RelationModels/ICustomer_IInnerDebt";
import IInnerDebtsItemsListProps from "./IInnerDebtsItemsListProps";

export interface IAddInnerDebtProps {
  addToInnerDebtsList: (value: ICustomer_IInnerDebt) => void;
  toggleModal: () => void;
}

export interface IAddInnerDebtServiceProps extends IAddInnerDebtProps {
  innerDebtsItemsListService: IInnerDebtsItemsListProps;
}
