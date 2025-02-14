import ICustomer from "./ICustomer";

export default interface IAddCustomerProps {
  addToCustomersList: (value: ICustomer) => void;
  toggleModal: () => void;
}
