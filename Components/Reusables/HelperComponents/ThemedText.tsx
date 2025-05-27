import Constants from "@/Global/Constants/Constants";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  color?: string;
  weight?: 400 | 600 | 700 | 800;
  fontSize?: number;
  isLineHeight?: boolean;
};

export function ThemedText({
  color,
  weight = 400,
  fontSize = 14,
  style,
  isLineHeight = false,
  ...rest
}: ThemedTextProps) {
  const lineHeightStyle = isLineHeight ? { lineHeight: fontSize + 5 } : {};
  return (
    <Text
      style={[
        weight == 400 ? styles.f400 : undefined,
        weight === 600 ? styles.f600 : undefined,
        weight === 700 ? styles.f700 : undefined,
        weight === 800 ? styles.f800 : undefined,
        lineHeightStyle,
        { color },
        { fontSize },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  f400: {
    fontFamily: Constants.fontFamily.font400Regular,
  },
  f600: {
    fontFamily: Constants.fontFamily.font600SemiBold,
  },
  f700: {
    fontFamily: Constants.fontFamily.font700Bold,
  },
  f800: {
    fontFamily: Constants.fontFamily.font800ExtraBold,
  },
});
