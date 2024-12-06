import {
  Image,
  View,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import useCardComponentService from "./CardComponent.service";
import styles from "./CardComponent.style";
import CardType from "./CardComponent.types";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function CardComponent(props: CardType) {
  const cardcomponentService = useCardComponentService();
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => cardcomponentService.onNavigationButtonClick(props.route)}
    >
      <Icon name={props.icon} color={props.color} style={styles.icon} />
      <View>
        <Text style={[styles.title, { color: props.color }]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
