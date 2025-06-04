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
    paddingVertical: 7,
  },
  pricesContainer: {
    gap: 5,
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
  },
  totalDebtPrice: {
    backgroundColor: Constants.colors.darkGray,
  },
  payedPrice: {
    backgroundColor: Constants.colors.darkGreen,
  },
  remainingPrice: {
    backgroundColor: Constants.colors.red,
  },
  priceIcon: {
    fontSize: 30,
  },
  price: {
    textAlign: "center",
    width: 70,
    color: Constants.colors.white,
    paddingVertical: 2,
    borderRadius: 5,
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
  saveButton: {
    backgroundColor: Constants.colors.customers,
    borderRadius: 10,
    paddingVertical: 2,
  },
  saveText: {
    color: Constants.colors.lightGray,
    textAlign: "center",
  },
});

export default styles;
