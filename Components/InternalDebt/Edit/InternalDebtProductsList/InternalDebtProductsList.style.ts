import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemsRow: {
    gap: 10,
    marginBottom: 10,
  },
  dropDownContainerStyle: {
    flex: 1,
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  dropDownStyle: {},
  dataTableContainer: {
    minHeight: 500,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: Constants.colors.gray,
    borderRadius: 5,
    fontSize: 12,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  addIcon: {
    padding: 10,
  },
});

export default styles;
