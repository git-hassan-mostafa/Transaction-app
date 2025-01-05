import { ActivityIndicator, View } from "react-native";
import useCustomActivityIndicatorComponentService from "./CustomActivityIndicatorComponent.service";
import styles from "./CustomActivityIndicatorComponent.style";

export default function CustomActivityIndicatorComponent() {
  const CustomActivityIndicatorComponentService =
    useCustomActivityIndicatorComponentService();
  return <ActivityIndicator size={50} style={styles.activityIndicator} />;
}
