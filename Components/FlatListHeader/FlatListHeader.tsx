import { View } from "react-native";
import useFlatListHeaderComponentService from "./FlatListHeader.service";
import styles from "./FlatListHeader.style";
import { ThemedText } from "@/Global/Reusable Components/HelperComponents/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "@/Global/I18n/I18n";

export default function FlatListHeader() {
  const FlatListHeaderComponentService = useFlatListHeaderComponentService();
  return (
    <LinearGradient
      colors={["#FFFFFF", "#F8F9FA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.statsContainer}>
        <View style={[styles.statItem, styles.incomeStat]}>
          <View style={styles.statIconContainer}>
            <ThemedText style={styles.statIcon}>↑</ThemedText>
          </View>
          <ThemedText style={styles.statValue}>$100.00</ThemedText>
          <ThemedText style={styles.statLabel}>
            {i18n.t("customers-debts")}
          </ThemedText>
        </View>
        <View style={[styles.statItem, styles.expenseStat]}>
          <View style={styles.statIconContainer}>
            <ThemedText style={styles.statIcon}>↓</ThemedText>
          </View>
          <ThemedText style={styles.statValue}>$100.00</ThemedText>
          <ThemedText style={styles.statLabel}>
            {i18n.t("providers-debts")}
          </ThemedText>
        </View>
      </View>
    </LinearGradient>
  );
}
