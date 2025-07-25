import { StyleSheet } from "react-native";
import Constants from "../Constants/Constants";

const globalStyles = StyleSheet.create({
  errorMessage: {
    color: Constants.colors.red,
    fontSize: 12,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  column: { width: 120, flex: 1, justifyContent: "flex-start" },
  numberColumn: { width: 80, flex: 1, justifyContent: "flex-start" },
  iconColumn: { width: 30 },
  dateColumn: { width: 150, flex: 1, justifyContent: "flex-start" },
  delete: { fontSize: 20, color: Constants.colors.red },
});

export default globalStyles;
