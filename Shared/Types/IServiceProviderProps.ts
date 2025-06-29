import CustomerManager from "@/Pages/Customers/Services/CustomerManager";
import InternalDebtManager from "@/Pages/InternalDebts/Services/InternalDebtManager";
import ProductManager from "@/Pages/Products/Services/ProductManager";
import { PeopleManager } from "@/Pages/People/Services/PeopleManager";
import ProviderManager from "@/Pages/Providers/Services/ProviderManager";

export default interface IServiceProviderProps {
  customerManager: CustomerManager;
  internalDebtManager: InternalDebtManager;
  productManager: ProductManager;
  peopleManager: PeopleManager;
  providerManager: ProviderManager;
}
