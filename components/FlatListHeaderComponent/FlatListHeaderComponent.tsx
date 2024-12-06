import { View, Text } from "react-native";
import useFlatListHeaderComponentService from "./FlatListHeaderComponent.service";
import styles from "./FlatListHeaderComponent.style";

export default function FlatListHeaderComponent() {
  const FlatListHeaderComponentService = useFlatListHeaderComponentService();
  return (
    <View style={styles.container}>
      <Text style={styles.total}>$200.00</Text>
      <View style={styles.plusMinusNumbers}>
        <View>
          <Text style={styles.plusNumber}>$100.0 +</Text>
        </View>
        <Text style={styles.minusNumber}>$100.0 -</Text>
      </View>
    </View>
  );
}
