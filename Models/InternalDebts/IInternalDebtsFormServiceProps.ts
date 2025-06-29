import { IInternalDebtFormProps } from "./IInternalDebtsFormProps";
import IInternalDebtsProductsListProps from "./IInternalDebtsProductsListProps";

export interface IInternalDebtsFormServiceProps extends IInternalDebtFormProps {
  internalDebtsProductsListService: IInternalDebtsProductsListProps;
}
