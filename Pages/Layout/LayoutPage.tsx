import useGlobalContext from "@/Global/Context/ContextProvider";
import { Stack } from "expo-router";
import useLayoutPageService from "./LayoutPage.service";
import Constants from "@/Global/Constants/Constants";
import React from "react";
import CustomSnackBarComponent from "@/Components/Reusable Components/CustomSnackBarComponent/CustomSnackBarComponent";
import pages from "@/Global/Constants/Pages";

export default function LayoutPage() {
  const layoutService = useLayoutPageService();
  const { fontsLoaded } = useGlobalContext();
  if (fontsLoaded) {
    return (
      <React.Fragment>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: Constants.colors.white },
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
