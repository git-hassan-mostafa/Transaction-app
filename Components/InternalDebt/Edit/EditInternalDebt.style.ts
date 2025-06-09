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
  content: {
    marginTop: 5,
  },
  debtDate: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
    justifyContent: "flex-end",
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
});

export default styles;
