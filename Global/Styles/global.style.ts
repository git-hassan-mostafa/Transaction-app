import { StyleSheet } from "react-native";
import Constants from "../Constants/Constants";

const globalStyles = StyleSheet.create({
  errorMessage: {
    color: Constants.colors.red,
    fontSize: 12,
    fontFamily: Constants.fontFamily.font400Regular,
  },
});

export default globalStyles;
