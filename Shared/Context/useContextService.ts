import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_600SemiBold,
  NotoKufiArabic_700Bold,
  NotoKufiArabic_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/noto-kufi-arabic";
import { useEffect, useState } from "react";
import ISnackBarOptions from "../Types/ISnackBarOptions";
import IContextProps from "../Types/IContextProps";

export function useContextService(): IContextProps {
  //states
  const [fontsLoaded] = useFonts({
    NotoKufiArabic_400Regular,
    NotoKufiArabic_600SemiBold,
    NotoKufiArabic_700Bold,
    NotoKufiArabic_800ExtraBold,
  });
  const [snackBarOptions, setSnackBarOptions] = useState<ISnackBarOptions>({
    visible: false,
    text: "",
    type: "info",
  });

  useEffect(() => {}, []);

  function toggleSnackBar(value: ISnackBarOptions) {
    setSnackBarOptions(value);
    setTimeout(() => {
      setSnackBarOptions({ visible: false, text: "", type: value.type });
    }, 3000);
  }

  function onDismissSnackBar() {
    toggleSnackBar({
      visible: false,
      text: "",
      type: "error",
    });
  }

  return {
    fontsLoaded,
    snackBarOptions,
    toggleSnackBar,
    onDismissSnackBar,
  };
}
