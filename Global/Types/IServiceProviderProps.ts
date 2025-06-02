import CustomerManager from "@/BLL/CustomerManager";
import InternalDebtManager from "@/BLL/InternalDebtManager";
import ProductManager from "@/BLL/ProductManager";
import { PeopleManager } from "@/BLL/PeopleManager";
import ProviderManager from "@/BLL/ProviderManager";

export default interface IServiceProviderProps {
  customerManager: CustomerManager;
  internalDebtManager: InternalDebtManager;
  productManager: ProductManager;
  peopleManager: PeopleManager;
  providerManager: ProviderManager;
}
