import { ICustomer_IInnerDebt } from "../RelationModels/ICustomer_IInnerDebt";
import IInnerDebtsItemsListProps from "./IInnerDebtsItemsListProps";

export interface IInnerDebtFormProps {
  id: number | undefined;
  toggleModal: () => void;
  updateFromInnerDebtsList: (innerDebt: ICustomer_IInnerDebt) => void;
  addToInnerDebtsList: (innerDebt: ICustomer_IInnerDebt) => void;
}

export interface IInnerDebtsFormServiceProps extends IInnerDebtFormProps {
  internalDebtsItemsListService: IInnerDebtsItemsListProps;
}
