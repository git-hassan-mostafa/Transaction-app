import CustomerManager from "@/BLL/CustomerManager";
import InternalDebtManager from "@/BLL/InternalDebtManager";
import ItemManager from "@/BLL/ItemManager";

export default interface IServiceProviderProps {
  customerManager: CustomerManager;
  internalDebtManager: InternalDebtManager;
  itemManager: ItemManager;
}
