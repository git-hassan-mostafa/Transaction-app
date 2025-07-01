import { ContextProvider } from "@/Shared/Context/ContextProvider";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";
import LayoutPage from "@/Pages/Layout/LayoutPage";
import { SQLiteProvider } from "expo-sqlite";
import { Provider } from "react-native-paper";
import ErrorBoundary from "@/Shared/Reusable Components/ErrorBoundary/ErrorBoundary";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SQLiteProvider databaseName={"Transaction.db"}>
        <Provider>
          <ContextProvider>
            <LayoutPage />
          </ContextProvider>
        </Provider>
      </SQLiteProvider>
    </ErrorBoundary>
  );
}
