import Item from "@/Global/Models/Item";

export default interface IItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  providerId: number;
}

export interface IAddItemProps {
  addToItemsList: (value: Item) => void;
  toggleModal: () => void;
}
