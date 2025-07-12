import { ContextProvider } from "@/Shared/Context/ContextProvider";
import LayoutPage from "@/Pages/Layout/LayoutPage";
import { Provider } from "react-native-paper";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

export default function RootLayout() {
  return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider>
          <ContextProvider>
            <LayoutPage />
          </ContextProvider>
        </Provider>
      </ApplicationProvider>
  );
}
