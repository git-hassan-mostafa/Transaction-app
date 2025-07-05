import useGlobalContext from "@/Shared/Context/ContextProvider";
import { Snackbar } from "react-native-paper";
import Constants from "@/Shared/Constants/Constants";
import { ThemedText } from "./ThemedText";
import React from "react";

function ISnackBar() {
  const context = useGlobalContext();

  var backgroundColor;
  switch (context.snackBarOptions.type) {
    case "info":
      backgroundColor = Constants.colors.gray;
      break;
    case "warning":
      backgroundColor = Constants.colors.yellow;
      break;
    case "error":
      backgroundColor = Constants.colors.red;
      break;
    case "success":
      backgroundColor = Constants.colors.darkGreen;
      break;
  }
  return (
    <Snackbar
      visible={context.snackBarOptions.visible}
      onDismiss={context.onDismissSnackBar}
      action={{
        label: "",
        onPress: () => {
          context.onDismissSnackBar();
        },
      }}
      style={{ backgroundColor, bottom: 30 }}
    >
      <ThemedText color="white">
        {context.snackBarOptions.text || ""}
      </ThemedText>
    </Snackbar>
  );
}

export default React.memo(ISnackBar);
