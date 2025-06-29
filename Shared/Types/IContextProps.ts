import IInternalDebtProduct_IInternalDebt_IProduct from "@/Models/RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import ISnackBarOptions from "./ISnackBarOptions";

export default interface IContextProps {
  fontsLoaded: boolean;
  snackBarOptions: ISnackBarOptions;
  toggleSnackBar: (value: ISnackBarOptions) => void;
  onDismissSnackBar: () => void;
}
