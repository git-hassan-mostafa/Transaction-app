import { View } from "react-native";
import useFlatListHeaderService from "./FlatListHeader.service";
import styles from "./FlatListHeader.style";
import { ThemedText } from "@/Shared/Reusable Components/HelperComponents/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "@/Shared/I18n/I18n";
import Icon from "react-native-vector-icons/AntDesign";
export default function FlatListHeader() {
  const serice = useFlatListHeaderService();
  return (
    <LinearGradient
      colors={["#FFFFFF", "#F8F9FA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.statsContainer}>
        <View style={[styles.statItem, styles.customersDebts]}>
          <View style={styles.statIconContainer}>
            <ThemedText style={styles.statIcon}>
              <Icon size={14} name="arrowup" />
            </ThemedText>
          </View>
          <ThemedText style={styles.statValue}>
            ${serice.borrowedPrice}
          </ThemedText>
          <ThemedText style={styles.statLabel}>
            {i18n.t("customers-debts")}
          </ThemedText>
        </View>
        <View style={[styles.statItem, styles.providersDebts]}>
          <View style={styles.statIconContainer}>
            <ThemedText style={styles.statIcon}>
              <Icon size={14} name="arrowdown" />
            </ThemedText>
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
