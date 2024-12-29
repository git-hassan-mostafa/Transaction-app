import Constants from "@/Global/Constants/Constants";
import useContextProvider from "@/Global/ContextApi/ContextApi";

export default function useCustomSnackBarComponentService() {
  const { snackBarOptions, onDismissSnackBar } = useContextProvider();

  var backgroundColor;
  switch (snackBarOptions.type) {
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
      backgroundColor = Constants.colors.green;
  }

  return { options: snackBarOptions, onDismissSnackBar, backgroundColor };
}
