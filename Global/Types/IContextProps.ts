import IInnerDebtItem_IInnerDebt_IItem from "@/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import ISnackBarOptions from "./ISnackBarOptions";

export default interface IContextProps {
  fontsLoaded: boolean;
  snackBarOptions: ISnackBarOptions;
  toggleSnackBar: (value: ISnackBarOptions) => void;
  onDismissSnackBar: () => void;
}
