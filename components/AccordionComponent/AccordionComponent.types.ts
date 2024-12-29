import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export default interface CustomAccordionProps {
  headerText: string;
  children: ReactNode;
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  headerColor?: string;
}
