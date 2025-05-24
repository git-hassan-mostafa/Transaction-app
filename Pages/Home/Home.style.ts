import { StyleSheet } from "react-native";
import Constants from "@/Global/Constants/Constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.colors.white,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    paddingBottom: 100,
  },
  headerContainer: {
    backgroundColor: Constants.colors.white,
    borderRadius: 15,
    marginBottom: 24,
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
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Constants.fontFamily.font600SemiBold,
    color: Constants.colors.black,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default styles;
