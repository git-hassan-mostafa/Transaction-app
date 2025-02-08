import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export default interface CustomAccordionProps {
  id: number;
  headerText: string;
  children: ReactNode;
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  headerColor?: string;
  handleDelete: (id: number) => void;
}
