import useContextProvider from "@/Global/ContextApi/ContextApi";
import { Stack } from "expo-router";
import useLayoutPageService from "./LayoutPage.service";
import Constants from "@/Global/Constants/Constants";
import React from "react";
import CustomSnackBarComponent from "@/Components/Reusable Components/CustomSnackBarComponent/CustomSnackBarComponent";
import pages from "@/Global/Constants/Pages";

export default function LayoutPage() {
  const layoutService = useLayoutPageService();
  const { fontsLoaded } = useContextProvider();
  if (fontsLoaded) {
    return (
      <React.Fragment>
        <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
          {pages.map((p) => (
            <Stack.Screen
              key={p.route}
              name={p.route}
              options={{
                title: p.title,
                headerTitleStyle: {
                  fontFamily: Constants.fontFamily.font800ExtraBold,
                  color:
                    p.route == "index"
                      ? Constants.colors.black
                      : Constants.colors.white,
                },
                headerStyle: {
                  backgroundColor: p.color,
                },
                statusBarBackgroundColor: p.color,
                statusBarStyle: "dark",
                headerTitleAlign: p.route === "index" ? "center" : "left",
                headerTintColor:
                  p.route == "index"
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
