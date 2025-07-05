import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import Icon from "react-native-vector-icons/MaterialIcons";
import IListItemProps from "@/Shared/Types/IListItemProps";
import Constants from "@/Shared/Constants/Constants";
import { StyleSheet } from "react-native";
import React from "react";

const ListItem = (props: IListItemProps) => {
  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardContent}>
          <View style={styles.content}>
            {props.sign?.visible && (
              <View
                style={[styles.sign, { backgroundColor: props.sign.color }]}
              />
            )}
            <View style={styles.textBlock}>
              <ThemedText
                isLineHeight
                weight={700}
                fontSize={14}
                style={styles.title}
              >
                {props.title}
              </ThemedText>
              <ThemedText
                isLineHeight
                fontSize={12}
                style={[styles.subtitle, { color: props.subTitle.color }]}
              >
                {props.subTitle.text}
              </ThemedText>
              {props.subTitle2 && (
                <ThemedText
                  isLineHeight
                  fontSize={12}
                  style={[styles.subtitle, { color: props.subTitle2.color }]}
                >
                  {props.subTitle2.text}
                </ThemedText>
              )}
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={props.onEdit} style={styles.iconWrapper}>
              <Icon name="edit" size={20} color={Constants.colors.darkGray} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onDelete}
              style={styles.iconWrapper}
            >
              <Icon name="delete" size={20} color={Constants.colors.red} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 7,
    backgroundColor: Constants.colors.white,
  },
  cardWrapper: {
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "stretch",
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    gap: 20,
  },
  sign: {
    width: 15,
    height: 15,
    alignSelf: "center",
    borderRadius: 15,
  },
  textBlock: {
    justifyContent: "center",
    gap: 5,
  },
  title: {
    color: "#222",
  },
  subtitle: {
    color: Constants.colors.red,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: Constants.colors.lightGray,
  },
});

export default React.memo(ListItem);
