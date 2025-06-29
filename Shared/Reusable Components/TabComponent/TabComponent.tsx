import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import useTabComponentService from "./TabComponent.service";
import styles from "./TabComponent.style";
import { ThemedText } from "@/Shared/Reusable Components/HelperComponents/ThemedText";

export default function TabComponent({
  titles,
  children,
}: {
  titles: string[];
  children: React.ReactNode[];
}) {
  const service = useTabComponentService();

  return (
    <View>
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContainer}
          bounces={false}
        >
          {titles.map((title, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                service.activeTab === index && styles.activeTab,
              ]}
              onPress={() => service.setActiveTab(index)}
            >
              <ThemedText weight={700} style={styles.tabText}>
                {title}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>{children[service.activeTab]}</View>
    </View>
  );
}
