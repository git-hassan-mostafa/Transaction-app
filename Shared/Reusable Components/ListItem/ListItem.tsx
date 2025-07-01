import { View, TouchableOpacity } from "react-native";
import useListItemService from "./ListItem.service";
import styles from "./ListItem.style";
import { ThemedText } from "../HelperComponents/ThemedText";
import Icon from "react-native-vector-icons/MaterialIcons";
import IListItemProps from "@/Shared/Types/IListItemProps";
import Constants from "@/Shared/Constants/Constants";
import React from "react";

const ListItem = React.memo(function ListItem(props: IListItemProps) {
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
});

export default ListItem;
