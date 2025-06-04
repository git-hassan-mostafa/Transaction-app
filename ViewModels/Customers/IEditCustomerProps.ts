import ICustomer from "./ICustomer";

export default interface IEditCustomerProps {
  id: number;
  updateFromCustomersList: (customer: ICustomer) => void;
  toggleModal: () => void;
}
