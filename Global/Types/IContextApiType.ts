import ISnackBarOptions from "./ISnackBarOptions";

export default interface ContextProps {
  fontsLoaded: boolean;
  snackBarOptions: ISnackBarOptions;
  toggleSnackBar: (value: ISnackBarOptions) => void;
  onDismissSnackBar: () => void;
}
