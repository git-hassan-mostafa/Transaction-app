import Constants from "@/Shared/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemsRow: {
    gap: 10,
    marginBottom: 10,
  },
  dataTableContainer: {
    minHeight: 500,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: Constants.colors.gray,
    borderRadius: 5,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  addProducts: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  addIcon: {
    padding: 10,
  },
});

export default styles;
