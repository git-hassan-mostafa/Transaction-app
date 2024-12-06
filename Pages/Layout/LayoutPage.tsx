import useContextProvider, {
  ContextProvider,
} from "@/Global/ContextApi/ContextApi";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import useLayoutPageService from "./LayoutPage.service";

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
              headerTitleStyle: { fontFamily: "NotoKufiArabic_800ExtraBold" },
              headerTitleAlign: screen.name === "index" ? "center" : "left",
            }}
          />
        ))}
      </Stack>
    );
  }
  return <ActivityIndicator />;
}
