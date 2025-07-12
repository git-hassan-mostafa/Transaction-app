import ICustomer from "../Customers/ICustomer";
import IPerson from "../People/IPerson";
import IInternalDebtProduct from "./IInternalDebtProduct";
import IInternalDebtPayment from "./IInternalDebtPayment";

export default interface IInternalDebt {
  Id: number;
  Date: string;
  Notes?: string;
  TotalPrice: number;
  PaidPrice: number;
  CustomerId: number;
  PersonId?: number;

  // Relations
  Customer?: ICustomer;
  Person?: IPerson;
  InternalDebtProducts: IInternalDebtProduct[];
  InternalDebtPayments: IInternalDebtPayment[];
}
