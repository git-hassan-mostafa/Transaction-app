import Constants from "@/Global/Constants/Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  headerContainer: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerListIcon: {
    fontSize: 30,
    color: Constants.colors.lightGray,
  },
  icons: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  deleteItem: {
    fontSize: 30,
    color: Constants.colors.white,
  },
  headerText: {
    fontSize: 15,
    fontFamily: Constants.fontFamily.font800ExtraBold,
    color: Constants.colors.lightGray,
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
