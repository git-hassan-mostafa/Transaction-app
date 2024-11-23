import { ContextProvider } from "@/Global/ContextApi/ContextApi";
import LayoutPage from "@/Pages/Layout/LayoutPage";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={"Transaction.db"}>
      <ContextProvider>
        <LayoutPage />
      </ContextProvider>
    </SQLiteProvider>
  );
}
