import { ExternalDebt } from "./ExternalDebt";
import { Product } from "./Product";

export interface Provider {
  id: number;
  name: string;
  phonenumber: string;
  notes?: string;
  // Relations
  products?: Product[]; // one-to-many
  externaldebts?: ExternalDebt[]; // one-to-many
}
