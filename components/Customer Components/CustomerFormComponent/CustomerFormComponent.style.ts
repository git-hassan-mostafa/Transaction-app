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
    paddingTop: 0,
  },
  customerScrollView: {
    marginTop: 20,
    maxHeight: 370,
  },
  iconHeader: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  deleteCustomer: {
    fontSize: 40,
    color: Constants.colors.red,
  },
  editCustomer: {
    fontSize: 40,
    color: Constants.colors.lighBlue,
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  borrowedListContainer: {},
  borrowedList: {
    alignItems: "flex-end",
    gap: 10,
  },
  itemName: { width: 90, textAlign: "center" },
  column: { width: 40, textAlign: "center" },
  dateColumn: { flex: 1, textAlign: "center" },
  itemRow: {
    backgroundColor: Constants.colors.white,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 2,
    paddingRight: 10,
    borderRightColor: Constants.colors.blue,
    borderRightWidth: 5,
  },
  itemRowTitle: {
    backgroundColor: Constants.colors.white,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 5,
    paddingRight: 15,
    // borderRightWidth: 5,
  },
});

export default styles;
