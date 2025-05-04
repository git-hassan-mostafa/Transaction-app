import Constants from "@/Global/Constants/Constants";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  color?: string;
  type?:
    | "small"
    | "medium"
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link";
};

export function ThemedText({
  color,
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        type == "small" ? styles.small : undefined,
        type === "medium" ? styles.medium : undefined,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        { color },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 11,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  medium: {
    fontSize: 12,
    fontFamily: Constants.fontFamily.font600SemiBold,
  },
  default: {
    fontSize: 14,
    fontFamily: Constants.fontFamily.font600SemiBold,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontFamily: Constants.fontFamily.font600SemiBold,
  },
  defaultBold: {
    fontSize: 24,
    fontFamily: Constants.fontFamily.font800ExtraBold,
  },
  title: {
    fontSize: 32,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: Constants.fontFamily.font400Regular,
  },
});
