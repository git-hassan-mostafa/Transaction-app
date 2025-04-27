import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemsRow: {
    gap: 10,
    marginBottom: 10,
  },
  item: { width: 90, textAlign: "right" },
  dropDownContainerStyle: {
    // flex: 1,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  dropDownStyle: {
    height: 40,
    width: 90,
  },
  itemRow: {
    backgroundColor: Constants.colors.white,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    paddingRight: 10,
    gap: 20,
    borderRightColor: Constants.colors.red,
    borderRightWidth: 5,
  },
  addItemRow: {
    backgroundColor: Constants.colors.white,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    paddingRight: 10,
    gap: 5,
    borderRightColor: Constants.colors.red,
    borderRightWidth: 5,
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: Constants.colors.gray,
    // height: 5,
    width: 40,
    fontSize: 12,
  },
  addIcon: {
    padding: 10,
    textAlign: "right",
  },
  delete: { fontSize: 20, color: Constants.colors.red },
});

export default styles;
