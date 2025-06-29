import React, { createContext, useContext } from "react";
import IContextProps from "../Types/IContextProps";
import { useContextService } from "./useContextService";

const Context = createContext<IContextProps>({} as IContextProps);

export default function useGlobalContext() {
  return useContext(Context);
}

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const props = useContextService();
  return <Context.Provider value={props}>{children}</Context.Provider>;
};
