import { Image, View, Text } from "react-native";
import useCardComponentService from "./CardComponent.service";
import styles from "./CardComponent.style";
import CardType from "./CardComponent.types";

export default function CardComponent(props: CardType) {
  const cardcomponentService = useCardComponentService();
  return (
    <View style={[styles.container, { backgroundColor: props.color }]}>
      <Image style={styles.image} source={props.image} resizeMode="cover" />
      <View>
        <Text style={[styles.title]}>{props.title}</Text>
      </View>
    </View>
  );
}
