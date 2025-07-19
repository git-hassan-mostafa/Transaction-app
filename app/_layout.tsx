import { ContextProvider } from "@/Shared/Context/ContextProvider";
import LayoutPage from "@/Pages/Layout/LayoutPage";
import { Provider } from "react-native-paper";
import * as eva from "@eva-design/eva";

export default function RootLayout() {
  return (
    <Provider>
      <ContextProvider>
        <LayoutPage />
      </ContextProvider>
    </Provider>
  );
}
