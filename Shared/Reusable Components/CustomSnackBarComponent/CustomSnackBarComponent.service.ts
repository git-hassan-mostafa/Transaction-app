import Constants from "@/Shared/Constants/Constants";
import useGlobalContext from "@/Shared/Context/ContextProvider";

export default function useCustomSnackBarComponentService() {
  const { snackBarOptions, onDismissSnackBar } = useGlobalContext();

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
      backgroundColor = Constants.colors.darkGreen;
      break;
  }

  return { snackBarOptions, onDismissSnackBar, backgroundColor };
}
