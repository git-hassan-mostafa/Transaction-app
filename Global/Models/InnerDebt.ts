export default interface InnerDebt {
  id?: number;
  totalPrice?: number;
  pricePaid?: number;
  date?: string;
  itemsList?: { item: string; quantity: number; price: number }[] | null;
  paymentsList?: { amount: number; date: string }[] | null;
  personId?: number;
  customerId?: number;
}
