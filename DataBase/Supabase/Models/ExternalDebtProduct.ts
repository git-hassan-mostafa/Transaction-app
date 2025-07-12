import { ExternalDebt } from "./ExternalDebt";
import { Product } from "./Product";

export interface ExternalDebtProduct {
  id: number;
  quantity: number;
  externaldebtid: number;
  productid: number;
  // Relations
  externaldebts?: ExternalDebt;
  products?: Product;
}
