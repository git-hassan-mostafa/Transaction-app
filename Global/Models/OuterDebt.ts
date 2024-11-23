export interface OuterDebt {
  id: number;
  providerId: number;
  price: number;
  date: string;
  itemsList: { item: string; quantity: number; price: number }[] | null;
  paymentsList: { amount: number; date: string }[] | null;
  personId: number;
}
