import { StyleSheet } from "react-native";
import Constants from "@/Global/Constants/Constants";

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 7,
    backgroundColor: Constants.colors.white,
  },
  cardWrapper: {
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "stretch",
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    gap: 20,
  },
  sign: {
    width: 15,
    height: 15,
    alignSelf: "center",
    borderRadius: 15,
  },
  textBlock: {
    justifyContent: "center",
    gap: 5,
  },
  title: {
    color: "#222",
  },
  subtitle: {
    color: Constants.colors.red,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: Constants.colors.lightGray,
  },
});

export default styles;
