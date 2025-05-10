import { View } from "react-native";
import useFlatListHeaderComponentService from "./FlatListHeaderComponent.service";
import styles from "./FlatListHeaderComponent.style";
import { ThemedText } from "@/Components/Reusable Components/HelperComponents/ThemedText";
import { LinearGradient } from "expo-linear-gradient";

export default function FlatListHeaderComponent() {
  const FlatListHeaderComponentService = useFlatListHeaderComponentService();
  return (
    <LinearGradient
      colors={["#FFFFFF", "#F8F9FA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.totalContainer}>
        <ThemedText style={styles.totalLabel}>الرصيد الكلي</ThemedText>
        <ThemedText style={styles.total}>$200.00</ThemedText>
      </View>
      <View style={styles.statsContainer}>
        <View style={[styles.statItem, styles.expenseStat]}>
          <View style={styles.statIconContainer}>
            <ThemedText style={styles.statIcon}>↓</ThemedText>
          </View>
          <ThemedText style={styles.statValue}>$100.00</ThemedText>
          <ThemedText style={styles.statLabel}>عليك</ThemedText>
        </View>
        <View style={[styles.statItem, styles.incomeStat]}>
          <View style={styles.statIconContainer}>
            <ThemedText style={styles.statIcon}>↑</ThemedText>
          </View>
          <ThemedText style={styles.statValue}>$100.00</ThemedText>
          <ThemedText style={styles.statLabel}>لك</ThemedText>
        </View>
      </View>
    </LinearGradient>
  );
}
