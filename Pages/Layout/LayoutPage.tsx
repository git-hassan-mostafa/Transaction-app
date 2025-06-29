import useGlobalContext from "@/Shared/Context/ContextProvider";
import { Stack } from "expo-router";
import useLayoutPageService from "./LayoutPage.service";
import Constants from "@/Shared/Constants/Constants";
import React from "react";
import CustomSnackBarComponent from "@/Shared/Reusable Components/CustomSnackBarComponent/CustomSnackBarComponent";
import pages from "@/Shared/Constants/Pages";

export default function LayoutPage() {
  const layoutService = useLayoutPageService();
  const { fontsLoaded } = useGlobalContext();
  if (fontsLoaded) {
    return (
      <React.Fragment>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: Constants.colors.lightGray,
            },
          }}
        >
          {pages.map((p) => (
            <Stack.Screen
              key={p.route}
              name={p.route}
              options={{
                title: p.title,
                headerTitleStyle: {
                  fontFamily: Constants.fontFamily.font600SemiBold,
                  fontSize: 18,
                  color: Constants.colors.black,
                },
                statusBarBackgroundColor: Constants.colors.white,
                statusBarStyle: "dark",
                headerTitleAlign: p.route === "index" ? "center" : undefined,
                headerTintColor: Constants.colors.black,
              }}
            />
          ))}
        </Stack>
        <CustomSnackBarComponent />
      </React.Fragment>
    );
  }
}
