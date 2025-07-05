import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "@/Shared/Constants/Constants";
import { ThemedText } from "./ThemedText";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ICustomAccordionProps from "@/Shared/Types/IAccordionProps";
import { StyleSheet } from "react-native";
function Accordion({
  id,
  headerText,
  children,
  style = {},
  iconSize = 24,
  iconColor = "#000",
  headerColor = Constants.colors.gray,
  handleDelete,
}: ICustomAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

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

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  headerContainer: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerListIcon: {
    fontSize: 30,
    color: Constants.colors.lightGray,
  },
  icons: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  deleteItem: {
    fontSize: 25,
    color: Constants.colors.lightGray,
  },
  headerText: {
    fontSize: 15,
    fontFamily: Constants.fontFamily.font800ExtraBold,
    color: Constants.colors.lightGray,
  },
  contentContainer: {
    overflow: "hidden",
  },
  contentWrapper: {
    marginTop: 10,
    borderColor: Constants.colors.gray,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default React.memo(Accordion);
