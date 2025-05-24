import { View } from "react-native";
import useOuterDebtsService from "./OuterDebts.service";
import styles from "./OuterDebts.style";

export default function OuterDebts() {
  const service = useOuterDebtsService();
  return <View></View>;
}
