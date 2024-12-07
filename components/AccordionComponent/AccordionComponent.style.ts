import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  headerContainer: {
    borderRadius: 10,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  contentContainer: {
    overflow: "hidden",
  },
  contentWrapper: {
    marginTop: 10,
    borderColor: Constants.colors.gray,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default styles;
