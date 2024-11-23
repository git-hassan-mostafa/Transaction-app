export default interface InnerDebt {
  id: number;
  customerId: number;
  itemsList: { item: string; quantity: number; price: number }[] | null;
  totalPrice: number;
  paymentsList: { amount: number; date: string }[] | null;
  pricePaid: number;
  date: string;
  personId: number;
}
