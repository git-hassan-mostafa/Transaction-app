import CustomerManager from "../Services/customers.service";
import ItemManager from "../Services/items.service";
import { PeopleManager } from "../Services/people.service";
import ProviderManager from "../Services/provider.service";

export default interface ContextProps {
  fontsLoaded: boolean;
  customerManager: CustomerManager;
  peopleManager: PeopleManager;
  providerManager: ProviderManager;
  itemManager: ItemManager;
  snackBarOptions: SnackBarOptions;
  toggleSnackBar: (value: SnackBarOptions) => void;
  onDismissSnackBar: () => void;
}

export interface SnackBarOptions {
  visible: boolean;
  text?: string;
  type?: "info" | "error" | "warning" | "success";
}
