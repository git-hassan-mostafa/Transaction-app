import ICustomer from "./ICustomer";

export default interface ICustomerFormProps {
  id: number;
  updateFromCustomersList: (customer: ICustomer) => void;
}
