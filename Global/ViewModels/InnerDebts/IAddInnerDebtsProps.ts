import { ICustomerInnerDebt } from "../RelationModels/ICustomerInnerDebt";
import IAddInnerDebtsItemsListProps from "./IAddInnerDebtsItemsProps";

export interface IAddInnerDebtProps {
  innerDebtsItemsListService: IAddInnerDebtsItemsListProps;
  addToInnerDebtsList: (value: ICustomerInnerDebt) => void;
  toggleModal: () => void;
}
