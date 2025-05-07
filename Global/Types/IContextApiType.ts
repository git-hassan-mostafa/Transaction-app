export default interface ContextProps {
  fontsLoaded: boolean;
  snackBarOptions: SnackBarOptions;
  toggleSnackBar: (value: SnackBarOptions) => void;
  onDismissSnackBar: () => void;
}

export interface SnackBarOptions {
  visible: boolean;
  text?: string;
  type?: "info" | "error" | "warning" | "success";
}
