import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 220,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "NotoKufiArabic_800ExtraBold",
    color: "white",
  },
});

export default styles;
