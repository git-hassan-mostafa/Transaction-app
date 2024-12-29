import Constants from "@/Global/Constants/Constants";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  color?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
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
  default: {
    fontSize: 14,
    fontFamily: Constants.fontFamily.font400Regular,
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
    fontWeight: "bold",
    fontFamily: Constants.fontFamily.font400Regular,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Constants.fontFamily.font400Regular,
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: Constants.fontFamily.font400Regular,
  },
});
