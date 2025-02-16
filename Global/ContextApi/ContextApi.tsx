import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_800ExtraBold,
  NotoKufiArabic_600SemiBold,
  useFonts,
} from "@expo-google-fonts/noto-kufi-arabic";
import React, { createContext, useContext, useState } from "react";
import ContextProps, { SnackBarOptions } from "./ContextApi.type";

const Context = createContext<ContextProps>({} as ContextProps);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontsLoaded] = useFonts({
    NotoKufiArabic_400Regular,
    NotoKufiArabic_600SemiBold,
    NotoKufiArabic_800ExtraBold,
  });
  const [snackBarOptions, setSnackBarOptions] = useState<SnackBarOptions>({
    visible: false,
    text: "",
    type: "info",
  });

  function toggleSnackBar(value: SnackBarOptions) {
    setSnackBarOptions(value);
    setTimeout(() => {
      setSnackBarOptions({ visible: false });
    }, 3000);
  }

  function onDismissSnackBar() {
    toggleSnackBar({ visible: false });
  }

  return (
    <Context.Provider
      value={{
        fontsLoaded,
        snackBarOptions,
        toggleSnackBar,
        onDismissSnackBar,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default function useContextProvider() {
  return useContext(Context);
}
