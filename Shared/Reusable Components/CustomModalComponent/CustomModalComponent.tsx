import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CustomModalComponent.style";
import { ThemedText } from "@/Shared/Reusable Components/HelperComponents/ThemedText";
import IModalProps from "@/Shared/Types/IModalProps";

const CustomModal: React.FC<IModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
}) => {
  const { height } = useWindowDimensions();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText fontSize={16} weight={700}>
              {title}
            </ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          {/* Content */}
          <ScrollView style={[styles.content, { maxHeight: height * 0.7 }]}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
