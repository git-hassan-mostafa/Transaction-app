import { ContextProvider } from "@/Global/Context/ContextProvider";
import { ServiceProvider } from "@/Global/Context/ServiceProvider";
import LayoutPage from "@/Pages/Layout/LayoutPage";
import { SQLiteProvider } from "expo-sqlite";
import { Provider } from "react-native-paper";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={"Transaction.db"}>
      <Provider>
        <ServiceProvider>
          <ContextProvider>
            <LayoutPage />
          </ContextProvider>
        </ServiceProvider>
      </Provider>
    </SQLiteProvider>
  );
}
