import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "@/Shared/Components/ThemedText";
import { StyleSheet } from "react-native";

function Tabs({
  titles,
  children,
}: {
  titles: string[];
  children: React.ReactNode[];
}) {
  const [activeTab, setActiveTab] = useState(0);

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
              style={[styles.tab, activeTab === index && styles.activeTab]}
              onPress={() => setActiveTab(index)}
            >
              <ThemedText weight={700} style={styles.tabText}>
                {title}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>{children[activeTab]}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabsScrollContainer: {
    flexDirection: "row",
    minWidth: "100%",
  },
  tab: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    textAlign: "center",
  },
  contentContainer: {
    padding: 5,
  },
});

export default React.memo(Tabs);
