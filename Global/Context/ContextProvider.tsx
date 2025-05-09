import React, { createContext, useContext } from "react";
import ContextProps from "../Types/IContextApiType";
import { useContextService } from "./useContextService";

const Context = createContext<ContextProps>({} as ContextProps);

export default function useGlobalContext() {
  return useContext(Context);
}

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const props = useContextService();
  return (
    <Context.Provider
      value={{
        ...props,
      }}
    >
      {children}
    </Context.Provider>
  );
};
