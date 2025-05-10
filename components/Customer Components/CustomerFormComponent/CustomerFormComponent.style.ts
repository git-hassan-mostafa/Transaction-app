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
  row: {
    marginBottom: 15,
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
    fontFamily: Constants.fontFamily.font400Regular,
  },
  pricesRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  pricesContainer: {
    gap: 5,
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
  },
  totalDebtPrice: {
    color: Constants.colors.darkGray,
  },
  payedPrice: {
    color: Constants.colors.green,
  },
  remainingPrice: {
    color: Constants.colors.red,
  },
  priceIcon: {
    fontSize: 30,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: baseInputStyle,
  textInput: {
    ...baseInputStyle,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dataTableContainer: { minHeight: 400 },
});

export default styles;
