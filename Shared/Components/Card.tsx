import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { ThemedText } from "./ThemedText";
import ICardType from "@/Shared/Types/IPageType";
import Constants from "@/Shared/Constants/Constants";
import { StyleSheet, Dimensions } from "react-native";
import { Href, router } from "expo-router";
import React from "react";

function Card(props: ICardType) {
  function onNavigationButtonClick(path: string) {
    router.navigate(("/" + path) as Href);
  }
  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: props.color }]}
      onPress={() => onNavigationButtonClick(props.route)}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${props.color}20` },
          ]}
        >
          <Icon
            name={props.icon}
            style={[styles.icon, { color: props.color }]}
          />
        </View>
        <ThemedText style={styles.title}>{props.title}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 48) / 2; // 48 = 16px padding * 2 + 8px margin * 2

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardWidth,
    margin: 8,
    backgroundColor: Constants.colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    textAlign: "center",
    maxWidth: "100%",
  },
});

export default React.memo(Card);
