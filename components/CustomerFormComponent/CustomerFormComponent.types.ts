export default interface ICustomer {
  id: number;
  name: string;
  borrowedPrice: number;
  payedPrice: number;
  phoneNumber: string;
  borrowList: { item: string; price: number }[] | null;
}
