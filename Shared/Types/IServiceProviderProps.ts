import CustomerManager from "@/Services/CustomerManager";
import InternalDebtManager from "@/Services/InternalDebtManager";
import PeopleManager from "@/Services/PeopleManager";
import ProductManager from "@/Services/ProductManager";
import ProviderManager from "@/Services/ProviderManager";

export default interface IServiceProviderProps {
  customerManager: CustomerManager;
  internalDebtManager: InternalDebtManager;
  productManager: ProductManager;
  peopleManager: PeopleManager;
  providerManager: ProviderManager;
}
