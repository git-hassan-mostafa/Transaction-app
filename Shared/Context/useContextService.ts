import {
  NotoKufiArabic_400Regular,
  NotoKufiArabic_600SemiBold,
  NotoKufiArabic_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/noto-kufi-arabic";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSQLiteContext } from "expo-sqlite";
import CreateTablesManager from "../../DataBase/DAL/CreateTablesManager";
import ISnackBarOptions from "../Types/ISnackBarOptions";
import IContextProps from "../Types/IContextProps";
import IInternalDebtProduct_IInternalDebt_IProduct from "@/Models/RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import useService from "./ServiceProvider";

export function useContextService(): IContextProps {
  const db = useSQLiteContext();
  const { internalDebtManager } = useService();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    // Cleanup function to clear any pending timeouts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function constructor() {
    try {
      await createSqlTables();
    } catch (error) {
      console.error("Error in useContextService constructor:", error);
    }
  }

  const toggleSnackBar = useCallback((value: ISnackBarOptions) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSnackBarOptions(value);
    timeoutRef.current = setTimeout(() => {
      setSnackBarOptions({ visible: false, text: "", type: value.type });
      timeoutRef.current = null;
    }, 3000);
  }, []);

  const onDismissSnackBar = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    toggleSnackBar({
      visible: false,
      text: "",
      type: "error",
    });
  }, [toggleSnackBar]);

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
