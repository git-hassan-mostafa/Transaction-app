import { ContextProvider } from "@/Global/Context/ContextProvider";
import LayoutPage from "@/Pages/Layout/LayoutPage";
import { SQLiteProvider } from "expo-sqlite";
import { Provider } from "react-native-paper";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={"Transaction.db"}>
      <Provider>
        <ContextProvider>
          <LayoutPage />
        </ContextProvider>
      </Provider>
    </SQLiteProvider>
  );
}
