export default interface Provider {
  id: number;
  name: string;
  borrowedPrice: number;
  payedPrice: number;
  phoneNumber: string;
  itemsList: { item: string; price: number }[] | null;
}
