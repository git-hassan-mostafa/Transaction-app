import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    gap: 20,
  },
  total: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "bold",
  },
  plusMinusNumbers: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  plusNumber: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: Constants.colors.green,
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  minusNumber: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: Constants.colors.red,
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  icons: {
    textAlign: "center",
    fontSize: 40,
    color: Constants.colors.green,
  },
});

export default styles;
