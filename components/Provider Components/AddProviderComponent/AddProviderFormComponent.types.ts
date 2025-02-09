import { OuterDebt } from "@/Global/Models/OuterDebt";
import Provider from "@/Global/Models/Provider";

export default interface IProvider {
  id: number;
  name: string;
  borrowedPrice: number;
  payedPrice: number;
  phoneNumber: string;
  itemsList: OuterDebt[] | null;
  notes: string;
}

export interface IAddProviderProps {
  addToProvidersList: (value: Provider) => void;
  toggleModal: () => void;
}
