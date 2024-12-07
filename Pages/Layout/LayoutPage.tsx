import useContextProvider, {
  ContextProvider,
} from "@/Global/ContextApi/ContextApi";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import useLayoutPageService from "./LayoutPage.service";
import styles from "./LayoutPage.style";
import Constants from "@/Global/Constants/Constants";

export default function LayoutPage() {
  const LayoutPageService = useLayoutPageService();
  const { fontsLoaded } = useContextProvider();
  if (fontsLoaded) {
    return (
      <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
        {LayoutPageService.screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={{
              title: screen.title,
              headerTitleStyle: {
                fontFamily: Constants.fontFamily.font800ExtraBold,
              },
              headerTitleAlign: screen.name === "index" ? "center" : "left",
            }}
          />
        ))}
      </Stack>
    );
  }
}
