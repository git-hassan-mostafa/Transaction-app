import { InternalDebt } from "./InternalDebt";
import { Product } from "./Product";

export interface InternalDebtProduct {
  id: number;
  quantity: number;
  internaldebtid: number;
  productid: number;

  // Relations
  InternalDebts?: InternalDebt;
  products?: Product;
}
