import { StyleSheet } from "react-native";
import Constants from "../Constants/Constants";

const formStyle = StyleSheet.create({
  saveButton: {
    backgroundColor: Constants.colors.internalDebts,
    borderRadius: 10,
    paddingTop: 5,
  },
  saveText: {
    fontFamily: Constants.fontFamily.font400Regular,
    color: Constants.colors.lightGray,
  },
});

export default formStyle;
