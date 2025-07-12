import { Product } from "@/DataBase/Supabase/Models/Product";
import IProvider from "../Providers/IProvider";
import IInternalDebtProduct from "../InternalDebts/IInternalDebtProduct";
import IExternalDebtProduct from "../ExternalDebts/IExternalDebtProduct";

export default interface IProduct {
  Id: number;
  Name: string;
  Quantity: string;
  Price: string;
  Notes?: string;
  ProviderId?: number;

  // Relations
  Provider?: IProvider;
  InternalDebtProducts?: IInternalDebtProduct[];
  ExternalDebtProducts?: IExternalDebtProduct[];
}
