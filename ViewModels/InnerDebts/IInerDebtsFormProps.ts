import { ICustomer_IInnerDebt } from "../RelationModels/ICustomer_IInnerDebt";
import IInnerDebtsItemsListProps from "./IInnerDebtsItemsListProps";

export interface IEditInnerDebtProps {
  id: number;
  toggleModal: () => void;
  updateFromInnerDebtsList: (innerDebt: ICustomer_IInnerDebt) => void;
}

export interface IInnerDebtsFormServiceProps extends IEditInnerDebtProps {
  internalDebtsItemsListService: IInnerDebtsItemsListProps;
}
