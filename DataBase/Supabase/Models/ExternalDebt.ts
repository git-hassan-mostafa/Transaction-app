import { ExternalDebtPayment } from "./ExternalDebtPayment";
import { ExternalDebtProduct } from "./ExternalDebtProduct";
import { Person } from "./Person";
import { Provider } from "./Provider";

export interface ExternalDebt {
  id: number;
  date: string;
  notes?: string;
  providerid: number;
  personid: number;

  // Relations
  providers?: Provider;
  people?: Person;
  externaldebtproducts?: ExternalDebtProduct[];
  externaldebtpayments?: ExternalDebtPayment[];
}
