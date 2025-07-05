import { StyleSheet } from "react-native";
import Constants from "../Constants/Constants";

const formStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
  },
  containerWithTab: {
    paddingTop: 0,
  },
  row: {
    marginBottom: 10,
  },
  label: {},
  input: {
    borderWidth: 1,
    borderColor: Constants.colors.gray,
    borderRadius: 5,
    fontFamily: Constants.fontFamily.font400Regular,
    backgroundColor: "transparent",
    fontSize: 13,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    borderRadius: 10,
    paddingTop: 5,
  },
  saveText: {
    fontFamily: Constants.fontFamily.font400Regular,
    color: Constants.colors.lightGray,
  },
});

export default formStyle;
