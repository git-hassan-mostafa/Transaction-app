import { View, TouchableOpacity } from "react-native";
import useCardComponentService from "./CardComponent.service";
import styles from "./CardComponent.style";
import Icon from "react-native-vector-icons/FontAwesome6";
import { ThemedText } from "../../HelperComponents/ThemedText";
import ICardType from "@/Global/Types/ICardType";

export default function CardComponent(props: ICardType) {
  const cardcomponentService = useCardComponentService();
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => cardcomponentService.onNavigationButtonClick(props.route)}
    >
      <Icon name={props.icon} color={props.color} style={styles.icon} />
      <View>
        <ThemedText style={[styles.title, { color: props.color }]}>
          {props.title}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}
