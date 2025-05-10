import Constants from "@/Global/Constants/Constants";
import { ThemedText } from "../HelperComponents/ThemedText";
import useCustomSnackBarComponentService from "./CustomSnackBarComponent.service";
import { Snackbar } from "react-native-paper";

export default function CustomSnackBarComponent() {
  const { options, onDismissSnackBar, backgroundColor } =
    useCustomSnackBarComponentService();
  return (
    <Snackbar
      visible={options.visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: "",
        onPress: () => {
          onDismissSnackBar();
        },
      }}
      style={{ backgroundColor }}
    >
      <ThemedText color="white">{options.text || ""}</ThemedText>
    </Snackbar>
  );
}
