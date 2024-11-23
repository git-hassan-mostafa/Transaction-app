import CustomerManager from "../Services/customers.service";

export default interface ContextProps {
  fontsLoaded: boolean;
  customerManager: CustomerManager;
}
