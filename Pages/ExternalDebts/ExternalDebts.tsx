import { View } from "react-native";
import useExternalDebtsService from "./ExternalDebts.service";

export default function ExternalDebts() {
  const service = useExternalDebtsService();
  return <View></View>;
}
