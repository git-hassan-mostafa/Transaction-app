import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const baseInputStyle = {
  flex: 3,
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
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    flex: 1.5,
    fontSize: 16,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: Constants.fontFamily.font400Regular,
  },
  pricesRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
    justifyContent: "space-between",
  },
  pricesContainer: {
    flexDirection: "row-reverse",
    gap: 5,
    alignItems: "center",
    backgroundColor: "red",
    padding: 7,
    borderRadius: 10,
  },
  borrowedConainer: {
    backgroundColor: Constants.colors.red,
  },
  payedContainer: {
    backgroundColor: Constants.colors.green,
  },
  totalContainer: {
    backgroundColor: Constants.colors.lighBlue,
  },
  priceIcon: {
    fontSize: 30,
    color: "white",
  },
  price: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: baseInputStyle,
  textInput: {
    ...baseInputStyle,
    writingDirection: "rtl",
  },
  borrowedListContainer: {},
  borrowedListTitle: {
    fontSize: 20,
    fontFamily: Constants.fontFamily.font800ExtraBold,
    textAlign: "right",
    marginBottom: 10,
  },
  borrowedList: {
    alignItems: "flex-end",
    gap: 10,
  },
  borrowedListItem: {
    backgroundColor: Constants.colors.lightGray,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 5,
    paddingRight: 10,
    gap: 20,
    borderRightColor: Constants.colors.blue,
    borderRightWidth: 5,
  },
  borrowedListText: {
    fontSize: 14,
    fontFamily: Constants.fontFamily.font400Regular,
  },
});

export default styles;
