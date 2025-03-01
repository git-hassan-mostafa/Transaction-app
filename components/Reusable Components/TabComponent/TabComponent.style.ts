import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tab: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    textAlign: "center",
  },
  contentContainer: {
    padding: 10,
  },
});

export default styles;
