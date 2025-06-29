import { IFormPropsDeepBase } from "../Base/IFormPropsDeepBase";
import { ICustomer_IInnternalDebt } from "../RelationModels/ICustomer_IInnternalDebt";
import IInternalDebtProduct_IInternalDebt_IProduct from "../RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import IInternalDebt from "./IInternalDebts";
import IInternalDebtsProductsListProps from "./IInternalDebtsProductsListProps";

export interface IInternalDebtFormProps
  extends IFormPropsDeepBase<IInternalDebt> {
  save: (
    formData: IInternalDebt,
    internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[],
    validationCallback: (internalDebt: IInternalDebt) => boolean
  ) => Promise<void>;
}
