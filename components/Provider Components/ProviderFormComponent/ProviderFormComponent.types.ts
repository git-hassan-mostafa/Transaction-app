import { OuterDebt } from "@/Global/Models/OuterDebt";
import Provider from "@/Global/Models/Provider";

export default interface IProvider {
  id: number;
  name: string;
  borrowedPrice: number;
  payedPrice: number;
  phoneNumber: string;
  itemsList: OuterDebt[];
  notes: string;
}

export interface IProviderProps {
  id: number;
  updateFromProvidersList: (provider: Provider) => void;
}
