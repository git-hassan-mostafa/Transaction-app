import React, { createContext, useContext, useState } from "react";
import ContextProps, { SnackBarOptions } from "./ContextApi.type";
import { useContextService } from "./useContextService";

const Context = createContext<ContextProps>({} as ContextProps);

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

export default function useContextProvider() {
  return useContext(Context);
}
