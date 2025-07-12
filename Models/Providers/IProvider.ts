import IProduct from "../Products/IProduct";
import IExternalDebt from "../ExternalDebts/IExternalDebt";

export default interface IProvider {
  Id: number;
  Name: string;
  PhoneNumber: string;
  BorrowedPrice: number;
  PayedPrice: number;
  Notes?: string;

  // Relations
  Products?: IProduct[];
  ExternalDebts?: IExternalDebt[];
}
