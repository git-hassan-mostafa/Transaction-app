import IDropDownItem from "@/Global/Types/IDropDownItem";
import IInnerDebt from "./IInerDebts";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";

export default interface IInternalDebtDetailsService {
  internalDebt: IInnerDebt;
  customersDropDown: IDropDownItem[];
  validation: IValidationErrorType;
  setTotalPrice: (value: string) => void;
  setPricePaid: (value: string) => void;
  setCustomer: (value: number) => void;
  setNotes: (value: string) => void;
  updateInnerDebt: () => Promise<void>;
}
