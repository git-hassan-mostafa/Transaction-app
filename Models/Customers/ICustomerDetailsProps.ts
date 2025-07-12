import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import ICustomer from "./ICustomer";

export default interface ICustomerDetailsProps {
  customer: ICustomer;
  validation: IValidationErrorType;
  setCustomerName: (value: string) => void;
  setCustomerPhoneNumber: (value: string) => void;
  setCustomerNotes: (value: string) => void;
  save: () => Promise<void>;
}
