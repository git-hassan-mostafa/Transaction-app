import Item from "@/Global/Models/Item";

export default interface IItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  providerId: number;
}

export interface IItemProps {
  id: number;
  updateFromItemsList: (item: Item) => void;
}
