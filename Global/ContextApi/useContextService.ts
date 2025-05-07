import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_600SemiBold,
  NotoKufiArabic_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/noto-kufi-arabic";
import { useEffect, useState } from "react";
import { SnackBarOptions } from "./ContextApi.type";
import CreateTablesManager from "../Services/CreateTablesManager";
import { useSQLiteContext } from "expo-sqlite";

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
