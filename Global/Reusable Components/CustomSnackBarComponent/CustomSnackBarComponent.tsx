import { ThemedText } from "../HelperComponents/ThemedText";
import useCustomSnackBarComponentService from "./CustomSnackBarComponent.service";
import { Snackbar } from "react-native-paper";

export default function CustomSnackBarComponent() {
  const { snackBarOptions, onDismissSnackBar, backgroundColor } =
    useCustomSnackBarComponentService();
  return (
    <Snackbar
      visible={snackBarOptions.visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: "",
        onPress: () => {
          onDismissSnackBar();
        },
      }}
      style={{ backgroundColor, bottom: 30 }}
    >
      <ThemedText color="white">{snackBarOptions.text || ""}</ThemedText>
    </Snackbar>
  );
}
