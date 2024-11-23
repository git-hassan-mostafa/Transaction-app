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
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    );
  }
  return <ActivityIndicator />;
}
