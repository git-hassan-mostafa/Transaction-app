import IDropDownItem from "@/Shared/Types/IDropDownItem";
import { StyleProp, ViewStyle } from "react-native";

export default interface IDropDownType {
  value: string | number;
  setValue: (value: string | number) => void;
  data: IDropDownItem[];
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  size?: "small" | "medium" | "large";
}
