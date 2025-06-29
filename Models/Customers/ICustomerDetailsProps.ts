import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import { ICustomer_IInternalDebt_IInternalDebtProduct_IProduct } from "../RelationModels/ICustomer_IInternalDebt_IInternalDebtProduct_IProduct";
import ICustomer from "./ICustomer";

export default interface ICustomerDetailsProps {
  customer: ICustomer;
  borrowList: ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[];
  validation: IValidationErrorType;
  setCustomerName: (value: string) => void;
  setCustomerPhoneNumber: (value: string) => void;
  setCustomerNotes: (value: string) => void;
  save: () => Promise<void>;
}
