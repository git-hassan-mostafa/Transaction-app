import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_600SemiBold,
  NotoKufiArabic_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/noto-kufi-arabic";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import CreateTablesManager from "../../DataBase/DAL/CreateTablesManager";
import ISnackBarOptions from "../Types/ISnackBarOptions";
import IContextProps from "../Types/IContextProps";
import IInternalDebtProduct_IInternalDebt_IProduct from "@/Models/RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import useService from "./ServiceProvider";

export function useContextService(): IContextProps {
  const db = useSQLiteContext();

  //states
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

  useEffect(() => {
    constructor();
  }, []);

  async function constructor() {
    try {
      await createSqlTables();
    } catch (error) {
      console.error("Error in useContextService constructor:", error);
    }
  }
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

  async function createSqlTables() {
    await new CreateTablesManager().init(db);
  }

  return {
    fontsLoaded,
    snackBarOptions,
    toggleSnackBar,
    onDismissSnackBar,
  };
}
