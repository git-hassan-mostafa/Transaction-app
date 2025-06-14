import InnerDebt from "@/Models/InnerDebt";

export default interface IProvider {
  providerId: number;
  providerName: string;
  providerBorrowedPrice: number;
  providerPayedPrice: number;
  providerPhoneNumber: string;
  providerNotes: string;
}
