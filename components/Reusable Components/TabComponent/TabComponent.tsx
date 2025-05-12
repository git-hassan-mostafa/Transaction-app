import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import useTabComponentService from "./TabComponent.service";
import styles from "./TabComponent.style";
import { ThemedText } from "@/Components/Reusable Components/HelperComponents/ThemedText";

export default function TabComponent({
  titles,
  children,
}: {
  titles: string[];
  children: React.ReactNode[];
}) {
  const { activeTab, setActiveTab } = useTabComponentService();

  return (
    <View>
      <ScrollView
        horizontal
        style={styles.tabContainer}
        contentContainerStyle={{ width: "100%" }}
      >
        {titles.map((title, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <ThemedText type="default" style={styles.tabText}>
              {title}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.contentContainer}>{children[activeTab]}</View>
    </View>
  );
}
