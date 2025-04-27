import Constants from "@/Global/Constants/Constants";
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 48) / 2; // 48 = 16px padding * 2 + 8px margin * 2

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardWidth,
    margin: 8,
    backgroundColor: Constants.colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: Constants.fontFamily.font600SemiBold,
    color: Constants.colors.black,
    maxWidth: "100%",
  },
});

export default styles;
