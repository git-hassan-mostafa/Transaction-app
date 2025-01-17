import CustomerManager from "../Services/customers.service";
import { PeopleManager } from "../Services/people.service";
import ProviderManager from "../Services/provider.service";

export default interface ContextProps {
  fontsLoaded: boolean;
  customerManager: CustomerManager;
  peopleManager: PeopleManager;
  providerManager: ProviderManager;
  snackBarOptions: SnackBarOptions;
  toggleSnackBar: (value: SnackBarOptions) => void;
  onDismissSnackBar: () => void;
}

export interface SnackBarOptions {
  visible: boolean;
  text?: string;
  type?: "info" | "error" | "warning" | "success";
}
