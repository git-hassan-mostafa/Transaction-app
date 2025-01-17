import { Dimensions } from "react-native";

export default function useHomeService() {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = Math.floor(screenWidth / 150);

  return { numColumns };
}
