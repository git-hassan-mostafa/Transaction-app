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
  iconHeader: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  deleteItem: {
    fontSize: 40,
    color: Constants.colors.red,
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
  saveButton: {
    backgroundColor: Constants.colors.orange,
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
