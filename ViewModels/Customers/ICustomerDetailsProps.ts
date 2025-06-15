import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "../RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";
import ICustomer from "./ICustomer";

export default interface ICustomerDetailsProps {
  customer: ICustomer;
  borrowList: ICustomer_IInerDebt_IInnerDebtItem_IItem[];
  validation: IValidationErrorType;
  setCustomerName: (value: string) => void;
  setCustomerPhoneNumber: (value: string) => void;
  setCustomerNotes: (value: string) => void;
  save: () => Promise<void>;
}
