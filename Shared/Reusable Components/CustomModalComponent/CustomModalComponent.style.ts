import Constants from "@/Shared/Constants/Constants";
import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modalContainer: {
    width: "90%", // 90% of screen width
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 20,
  },
  content: {
    backgroundColor: Constants.colors.lightGray,
    borderRadius: 10,
  },
});

export default styles;
