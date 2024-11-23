import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/noto-kufi-arabic";
import React, { createContext, useContext } from "react";
import ContextProps from "./ContextApi.type";
import CustomerManager from "../Services/customers.service";

const Context = createContext<ContextProps>({} as ContextProps);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontsLoaded] = useFonts({
    NotoKufiArabic_400Regular,
    NotoKufiArabic_800ExtraBold,
  });
  const customerManager = new CustomerManager();
  return (
    <Context.Provider value={{ fontsLoaded, customerManager }}>
      {children}
    </Context.Provider>
  );
};

export default function useContextProvider() {
  return useContext(Context);
}
