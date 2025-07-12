import { ExternalDebt } from "./ExternalDebt";
import { InternalDebt } from "./InternalDebt";

export interface Person {
  id: number;
  name: string;
  phonenumber: string;

  // Relations
  internaldebts?: InternalDebt[];
  externaldebts?: ExternalDebt[];
}
