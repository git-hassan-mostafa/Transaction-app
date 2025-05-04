import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemsRow: {
    gap: 10,
    marginBottom: 10,
  },
  item: { width: 80, textAlign: "right" },
  dropDownContainerStyle: {
    // flex: 1,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  dropDownStyle: {
    height: 40,
    width: 100,
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
  itemRowTitle: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingRight: 15,
    gap: 20,
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
    width: 90,
    height: 40,
    borderRadius: 5,
    fontSize: 12,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  addIcon: {
    padding: 10,
    textAlign: "right",
  },
  delete: { fontSize: 20, color: Constants.colors.red },
});

export default styles;
