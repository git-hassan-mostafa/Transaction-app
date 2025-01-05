import useContextProvider from "@/Global/ContextApi/ContextApi";
import { Stack } from "expo-router";
import useLayoutPageService from "./LayoutPage.service";
import Constants from "@/Global/Constants/Constants";
import React from "react";
import CustomSnackBarComponent from "@/Components/Reusable Components/CustomSnackBarComponent/CustomSnackBarComponent";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

export default function LayoutPage() {
  const LayoutPageService = useLayoutPageService();
  const { fontsLoaded } = useContextProvider();
  if (fontsLoaded) {
    return (
      <React.Fragment>
        <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
          {LayoutPageService.screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              options={{
                title: screen.title,
                headerTitleStyle: {
                  fontFamily: Constants.fontFamily.font800ExtraBold,
                  color:
                    screen.name == "index"
                      ? Constants.colors.black
                      : Constants.colors.white,
                },
                headerStyle: {
                  backgroundColor: screen.color,
                },
                statusBarBackgroundColor: screen.color,
                statusBarStyle: "dark",
                headerTitleAlign: screen.name === "index" ? "center" : "left",
                headerTintColor:
                  screen.name == "index"
                    ? Constants.colors.black
                    : Constants.colors.white,
              }}
            />
          ))}
        </Stack>
        <CustomSnackBarComponent />
      </React.Fragment>
    );
  }
}
