import { ContextProvider } from "@/Shared/Context/ContextProvider";
import LayoutPage from "@/Pages/Layout/LayoutPage";
import { SQLiteProvider } from "expo-sqlite";
import { Provider } from "react-native-paper";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={"Transaction.db"}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider>
          <ContextProvider>
            <LayoutPage />
          </ContextProvider>
        </Provider>
      </ApplicationProvider>
    </SQLiteProvider>
  );
}
