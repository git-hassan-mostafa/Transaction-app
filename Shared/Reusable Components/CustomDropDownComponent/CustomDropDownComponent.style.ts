import Constants from "@/Shared/Constants/Constants";
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
    fontSize: 14,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: Constants.fontFamily.font400Regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    fontSize: 14,

    fontFamily: Constants.fontFamily.font400Regular,
  },
  inputSearchStyle: {
    fontSize: 14,
    fontFamily: Constants.fontFamily.font400Regular,
  },
});

export default styles;
