import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_600SemiBold,
  NotoKufiArabic_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/noto-kufi-arabic";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import CreateTablesManager from "../../DAL/CreateTablesManager";
import ISnackBarOptions from "../Types/ISnackBarOptions";

export function useContextService() {
  const db = useSQLiteContext();

  useEffect(() => {
    createSqlTables();
  }, []);

  const [fontsLoaded] = useFonts({
    NotoKufiArabic_400Regular,
    NotoKufiArabic_600SemiBold,
    NotoKufiArabic_800ExtraBold,
  });
  const [snackBarOptions, setSnackBarOptions] = useState<ISnackBarOptions>({
    visible: false,
    text: "",
    type: "info",
  });

  function toggleSnackBar(value: ISnackBarOptions) {
    setSnackBarOptions(value);
    setTimeout(() => {
      setSnackBarOptions({ visible: false, text: "", type: "error" });
    }, 3000);
  }

  function onDismissSnackBar() {
    toggleSnackBar({
      visible: false,
      text: "",
      type: "error",
    });
  }

  function createSqlTables() {
    new CreateTablesManager().init(db);
  }

  return {
    fontsLoaded,
    snackBarOptions,
    toggleSnackBar,
    onDismissSnackBar,
  };
}
