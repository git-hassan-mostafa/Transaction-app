import { Person } from "@/DataBase/Supabase/Models/Person";
import IInternalDebt from "../InternalDebts/IInternalDebts";
import IExternalDebt from "../ExternalDebts/IExternalDebt";

export default interface IPerson {
  Id: number;
  Name: string;
  PhoneNumber: string;

  // Relations
  InternalDebts?: IInternalDebt[];
  ExternalDebts?: IExternalDebt[];
}
