import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "../RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";
import ICustomer from "./ICustomer";

export default interface ICustomerDetailsProps {
  customer: ICustomer;
  borrowList: ICustomer_IInerDebt_IInnerDebtItem_IItem[];
  setCustomerName: (value: string) => void;
  setCustomerPhoneNumber: (value: string) => void;
  setCustomerNotes: (value: string) => void;
  updateCustomerName: () => Promise<void>;
  updateCustomerPhoneNumber: () => Promise<void>;
  updateCustomerNotes: () => Promise<void>;
}
