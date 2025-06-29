import { View, TouchableOpacity } from "react-native";
import useCardComponentService from "./CardComponent.service";
import styles from "./CardComponent.style";
import Icon from "react-native-vector-icons/FontAwesome6";
import { ThemedText } from "../HelperComponents/ThemedText";
import ICardType from "@/Shared/Types/IPageType";

export default function CardComponent(props: ICardType) {
  const cardcomponentService = useCardComponentService();
  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: props.color }]}
      onPress={() => cardcomponentService.onNavigationButtonClick(props.route)}
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
