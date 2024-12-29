import useAccordionComponentService from "./AccordionComponent.service";
import styles from "./AccordionComponent.style";
import React from "react";
import { View, TouchableOpacity, Animated, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomAccordionProps from "./AccordionComponent.types";
import Constants from "@/Global/Constants/Constants";
import Icon from "react-native-vector-icons/Entypo";
import { ThemedText } from "../HelperComponents/ThemedText";

export default function AccordionComponent({
  headerText,
  children,
  style = {},
  iconSize = 24,
  iconColor = "#000",
  headerColor = Constants.colors.gray,
}: CustomAccordionProps) {
  const { toggleAccordion, isOpen } = useAccordionComponentService();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={toggleAccordion}
        style={[styles.headerContainer, { backgroundColor: headerColor }]}
      >
        <View style={styles.headerTextContainer}>
          <Icon style={styles.headerListIcon} name="dot-single" />
          <ThemedText style={styles.headerText}> {headerText}</ThemedText>
        </View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={iconSize}
          color={iconColor}
        />
      </TouchableOpacity>
      {isOpen && <View style={styles.contentWrapper}>{children}</View>}
    </View>
  );
}
