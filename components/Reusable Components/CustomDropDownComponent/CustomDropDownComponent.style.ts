import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: "right",
    fontFamily: Constants.fontFamily.font400Regular,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: Constants.fontFamily.font400Regular,
    textAlign: "right",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    textAlign: "right",
    fontFamily: Constants.fontFamily.font400Regular,
  },
  inputSearchStyle: {
    display: "none",
  },
});

export default styles;
