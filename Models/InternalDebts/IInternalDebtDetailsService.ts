import IDropDownItem from "@/Shared/Types/IDropDownItem";
import IInternalDebt from "./IInternalDebts";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import { IInternalDebtsProductsListServiceProps } from "./IInternalDebtsFormServiceProps";

export default interface IInternalDebtDetailsService
  extends IInternalDebtsProductsListServiceProps {
  internalDebt: IInternalDebt;
  customersDropDown: IDropDownItem[];
  validation: IValidationErrorType;
  setTotalPrice: (value: string) => void;
  setPricePaid: (value: string) => void;
  setCustomer: (value: number) => void;
  setNotes: (value: string) => void;
  save: () => Promise<void>;
}
