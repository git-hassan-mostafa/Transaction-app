import useAccordionComponentService from "./AccordionComponent.service";
import styles from "./AccordionComponent.style";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "@/Global/Constants/Constants";
import { ThemedText } from "../HelperComponents/ThemedText";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ICustomAccordionProps from "@/Global/Types/IAccordionProps";

export default function AccordionComponent({
  id,
  headerText,
  children,
  style = {},
  iconSize = 24,
  iconColor = "#000",
  headerColor = Constants.colors.gray,
  handleDelete,
}: ICustomAccordionProps) {
  const { toggleAccordion, isOpen } = useAccordionComponentService();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={toggleAccordion}
        style={[styles.headerContainer, { backgroundColor: headerColor }]}
      >
        <View style={styles.headerTextContainer}>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={iconSize}
            color={iconColor}
          />
          <ThemedText style={styles.headerText}>
            {" "}
            {headerText.length > 25
              ? headerText.slice(0, 25) + "..."
              : headerText}
          </ThemedText>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => handleDelete(id)}>
            <MaterialIcon style={styles.deleteItem} name="delete-forever" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.contentWrapper}>{children}</View>}
    </View>
  );
}
