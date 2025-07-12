import { ExternalDebt } from "@/DataBase/Supabase/Models/ExternalDebt";
import IProvider from "../Providers/IProvider";
import IPerson from "../People/IPerson";
import IExternalDebtProduct from "./IExternalDebtProduct";
import IExternalDebtPayment from "./IExternalDebtPayment";

export default interface IExternalDebt {
  Id: number;
  Date: string;
  Notes?: string;
  ProviderId: number;
  PersonId: number;

  // Relations
  Provider?: IProvider;
  Person?: IPerson;
  Products?: IExternalDebtProduct[];
  Payments?: IExternalDebtPayment[];
}
