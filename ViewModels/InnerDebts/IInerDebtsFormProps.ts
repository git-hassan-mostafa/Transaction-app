import { ICustomer_IInnerDebt } from "../RelationModels/ICustomer_IInnerDebt";
import IInnerDebtsItemsListProps from "./IInnerDebtsItemsListProps";

export interface IInnerDebtFormProps {
  id: number;
  updateFromInnerDebtsList: (innerDebt: ICustomer_IInnerDebt) => void;
}

export interface IInnerDebtsFormServiceProps extends IInnerDebtFormProps {
  innerDebtsItemsListService: IInnerDebtsItemsListProps;
}
