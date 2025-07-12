import { Customer } from "./Customer";
import { InternalDebtPayment } from "./InternalDebtPayemnt";
import { Person } from "./Person";
import { InternalDebtProduct } from "./InternalDebtProduct";

export interface InternalDebt {
  id: number;
  date: string;
  notes?: string;
  customerid: number;
  personid?: number;

  // Relations
  customers?: Customer;
  people?: Person;
  internaldebtproducts?: InternalDebtProduct[];
  internaldebtpayments?: InternalDebtPayment[];
}
