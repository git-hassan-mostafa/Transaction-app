import IDropDownItem from "@/Global/Types/IDropDownItem";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export default interface IDropDownType {
  value: string | number;
  setValue: (value: string | number) => void;
  data: IDropDownItem[];
  dropDownContainerStyle?: StyleProp<ViewStyle>;
  dropDownStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: StyleProp<TextStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  search?: boolean;
}
