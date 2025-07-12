import { ExternalDebt } from "./ExternalDebt";

export interface ExternalDebtPayment {
  id: number;
  amount: number;
  date: string; // ISO string
  externaldebtid: number;
  // Relations
  externaldebts?: ExternalDebt;
}
