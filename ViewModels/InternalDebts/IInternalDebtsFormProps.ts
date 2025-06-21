import { ICustomer_IInnternalDebt } from "../RelationModels/ICustomer_IInnternalDebt";
import IInternalDebtsProductsListProps from "./IInternalDebtsProductsListProps";

export interface IInternalDebtFormProps {
  id: number | undefined;
  toggleModal: () => void;
  updateFromInternalDebtsList: (internalDebt: ICustomer_IInnternalDebt) => void;
  addToInternalDebtsList: (internalDebt: ICustomer_IInnternalDebt) => void;
}

export interface IInternalDebtsFormServiceProps extends IInternalDebtFormProps {
  internalDebtsProductsListService: IInternalDebtsProductsListProps;
}
