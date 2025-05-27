import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabsScrollContainer: {
    flexDirection: "row",
    minWidth: "100%",
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
    padding: 5,
  },
});

export default styles;
