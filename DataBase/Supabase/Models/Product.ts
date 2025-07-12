import { ExternalDebtProduct } from "./ExternalDebtProduct";
import { InternalDebtProduct } from "./InternalDebtProduct";
import { Provider } from "./Provider";

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
  providerid?: number;

  // Relations
  providers?: Provider;
  internaldebtproducts?: InternalDebtProduct[];
  externaldebtproducts?: ExternalDebtProduct[];
}
