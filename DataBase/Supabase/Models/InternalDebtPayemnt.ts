import { InternalDebt } from "./InternalDebt";

export interface InternalDebtPayment {
  id: number;
  amount: number;
  date: string;
  internaldebtid: number;

  // Relations
  internaldebts?: InternalDebt;
}
