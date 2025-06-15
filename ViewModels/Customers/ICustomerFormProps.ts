import ICustomer from "./ICustomer";

export default interface ICustomerFormProps {
  id: number | undefined;
  addToCustomersList: (value: ICustomer) => void;
  updateFromCustomersList: (customer: ICustomer) => void;
  toggleModal: () => void;
}
