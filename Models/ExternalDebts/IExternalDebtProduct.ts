import { ExternalDebt } from "@/DataBase/Supabase/Models/ExternalDebt";
import IProduct from "../Products/IProduct";

export default interface IExternalDebtProduct {
  Id: number;
  Quantity: number;
  ExternalDebtId: number;
  ProductId: number;
  // Relations
  ExternalDebt?: ExternalDebt;
  Product?: IProduct;
}
