export interface OuterDebt {
  Id?: number;
  TotalPrice?: number;
  PricePaid?: number;
  Date?: string;
  ItemsList?: { item: string; quantity: number; price: number }[] | null;
  PaymentsList?: { amount: number; date: string }[] | null;
  PersonId?: number;
  ProviderId?: number;
  Notes?: string;
}
