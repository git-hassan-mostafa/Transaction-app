import InnerDebt from "@/Models/InnerDebt";

export default interface ICustomer {
  customerId: number;
  customerName: string;
  customerBorrowedPrice: number;
  customerPayedPrice: number;
  customerPhoneNumber: string;
  customerNotes: string;
}
