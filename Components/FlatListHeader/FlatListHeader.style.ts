import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
    borderRadius: 24,
  },
  totalContainer: {
    alignItems: "center",
    gap: 8,
  },
  totalLabel: {
    fontSize: 20,
    fontFamily: Constants.fontFamily.font600SemiBold,
    color: Constants.colors.gray,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  total: {
    fontSize: 36,
    fontFamily: Constants.fontFamily.font800ExtraBold,
    color: Constants.colors.black,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  statItem: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
    color: "white",
    fontFamily: Constants.fontFamily.font700Bold,
  },
  statValue: {
    fontSize: 18,
    fontFamily: Constants.fontFamily.font700Bold,
    color: "white",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Constants.fontFamily.font600SemiBold,
    color: "white",
    opacity: 0.9,
  },
  customersDebts: {
    backgroundColor: Constants.colors.green,
  },
  providersDebts: {
    backgroundColor: Constants.colors.red,
  },
});

export default styles;
