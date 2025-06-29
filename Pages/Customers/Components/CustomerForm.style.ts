import Constants from "@/Shared/Constants/Constants";
import { StyleSheet } from "react-native";

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
  pricesRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 7,
    marginBottom: 10,
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
  dataTableContainer: { minHeight: 400 },
});

export default styles;
