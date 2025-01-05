import Customer from "@/Global/Models/Customer";
import InnerDebt from "@/Global/Models/InnerDebt";

export default interface ICustomer {
  id: number;
  name: string;
  borrowedPrice: number;
  payedPrice: number;
  phoneNumber: string;
  borrowList: InnerDebt[] | null;
}

export interface ICustomerProps {
  id: number;
  deleteFromCustomerList: (id: number) => void;
  updateFromCustomersList: (customer: Customer) => void;
}
