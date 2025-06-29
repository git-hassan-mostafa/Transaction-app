import { ICustomer_IInnternalDebt } from "../RelationModels/ICustomer_IInnternalDebt";
import IInternalDebtProduct_IInternalDebt_IProduct from "../RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import IInternalDebt from "./IInternalDebts";
import IInternalDebtsProductsListProps from "./IInternalDebtsProductsListProps";

export interface IInternalDebtFormProps {
  id: number | undefined;
  save: (
    internalDebt: IInternalDebt,
    internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[],
    validationCallback: (internalDebt: IInternalDebt) => boolean
  ) => Promise<void>;
}

export interface IInternalDebtsFormServiceProps extends IInternalDebtFormProps {
  internalDebtsProductsListService: IInternalDebtsProductsListProps;
}
