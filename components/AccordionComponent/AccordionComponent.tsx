import useAccordionComponentService from "./AccordionComponent.service";
import styles from "./AccordionComponent.style";
import React from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomAccordionProps from "./AccordionComponent.types";
import Constants from "@/Global/Constants/Constants";

export default function CustomAccordionComponent({
  header,
  children,
  style = {},
  iconSize = 24,
  iconColor = "#000",
  headerColor = Constants.colors.gray,
}: CustomAccordionProps) {
  const { toggleAccordion, isOpen, heightInterpolate } =
    useAccordionComponentService();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={toggleAccordion}
        style={[styles.headerContainer, { backgroundColor: headerColor }]}
      >
        {header}
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={iconSize}
          color={iconColor}
        />
      </TouchableOpacity>

      <Animated.View
        style={[styles.contentContainer, { height: heightInterpolate }]}
      >
        <View style={styles.contentWrapper}>{children}</View>
      </Animated.View>
    </View>
  );
}
