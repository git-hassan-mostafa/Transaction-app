import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CustomModalComponent.style";
import { ThemedText } from "@/Components/Reusable Components/HelperComponents/ThemedText";
import IModalProps from "@/Global/Types/IModalProps";

const CustomModal: React.FC<IModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
}) => {
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
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>{title}</ThemedText>
          </View>
          {/* Content */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
