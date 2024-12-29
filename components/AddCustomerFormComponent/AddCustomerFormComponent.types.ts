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

export interface IAddCustomerProps {
  addToCustomersList: (value: Customer) => void;
  toggleModal: () => void;
}
