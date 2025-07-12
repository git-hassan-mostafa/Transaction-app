import { InternalDebt } from "./InternalDebt";

export interface Customer {
  id: number;
  name: string;
  phonenumber: string;
  notes?: string;
  // Relations
  internaldebts?: InternalDebt[];
}
