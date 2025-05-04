import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const baseInputStyle = {
  borderWidth: 1,
  borderColor: Constants.colors.gray,
  borderRadius: 5,
  padding: 5,
  textAlign: "right",
  fontFamily: Constants.fontFamily.font400Regular,
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
  },
  row: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: Constants.fontFamily.font400Regular,
  },
  input: baseInputStyle,
  textInput: {
    ...baseInputStyle,
    writingDirection: "rtl",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  errorMessage: {
    color: Constants.colors.red,
    fontSize: 12,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: Constants.fontFamily.font400Regular,
  },
  saveButton: {
    backgroundColor: Constants.colors.red,
    borderRadius: 10,
    paddingTop: 5,
  },
  saveText: {
    fontFamily: Constants.fontFamily.font400Regular,
    color: Constants.colors.lightGray,
    textAlign: "center",
  },
});

export default styles;
