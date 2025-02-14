import InnerDebt from "@/Global/Models/InnerDebt";

export default interface IProvider {
  id: number;
  name: string;
  borrowedPrice: number;
  payedPrice: number;
  phoneNumber: string;
  itemsList: InnerDebt[];
  notes: string;
}
