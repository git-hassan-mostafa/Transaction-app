import { OuterDebt } from "@/Global/Models/OuterDebt";
import Provider from "@/Global/Models/Provider";

export default interface IProvider {
  id: number;
  name: string;
  borrowedPrice: number;
  payedPrice: number;
  phoneNumber: string;
  itemsList: OuterDebt[] | null;
}

export interface IProviderProps {
  id: number;
  deleteFromProviderList: (id: number) => void;
  updateFromProvidersList: (provider: Provider) => void;
}
