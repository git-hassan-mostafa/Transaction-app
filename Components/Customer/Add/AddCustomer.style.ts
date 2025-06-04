import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const baseInputStyle = {
  borderWidth: 1,
  borderColor: Constants.colors.gray,
  borderRadius: 5,
  padding: 5,
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
    fontFamily: Constants.fontFamily.font400Regular,
  },
  input: baseInputStyle,
  textInput: {
    ...baseInputStyle,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: Constants.colors.customers,
    borderRadius: 10,
    paddingVertical: 2,
  },
  saveText: {
    color: Constants.colors.lightGray,
    textAlign: "center",
  },
});

export default styles;
