import IInternalDebt from "./IInternalDebts";
import IProduct from "../Products/IProduct";

export default interface IInternalDebtProduct {
  Id: number;
  Quantity: number;
  IsNew: boolean;
  TotalPrice: number;
  InternalDebtId: number;
  ProductId: number;

  // Relations
  InternalDebt?: IInternalDebt;
  Product?: IProduct;
}
