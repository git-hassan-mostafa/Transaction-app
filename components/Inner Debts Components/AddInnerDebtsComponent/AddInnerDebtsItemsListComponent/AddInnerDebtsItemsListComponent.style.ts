import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropDownContainerStyle: {
    flex: 1,
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 12,
    color: Constants.colors.darkGray,
  },
  dropDownStyle: {},
  dataTableContainer: {
    minHeight: 500,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 12,
    fontFamily: Constants.fontFamily.font400Regular,
  },
});

export default styles;
