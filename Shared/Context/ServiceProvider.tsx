import React from "react";
import IServiceProviderProps from "../Types/IServiceProviderProps";
import BLLFactory from "@/Factories/BLLFactory";

const Context = React.createContext<IServiceProviderProps>(
  {} as IServiceProviderProps
);

export const ServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const props: IServiceProviderProps = {
    customerManager: BLLFactory.CustomerManager(),
    internalDebtManager: BLLFactory.InternalDebtManager(),
    productManager: BLLFactory.ProductManager(),
    peopleManager: BLLFactory.PeopleManager(),
    providerManager: BLLFactory.ProviderManager(),
  };

  return <Context.Provider value={props}>{children}</Context.Provider>;
};

export default function useService() {
  return React.useContext(Context);
}
