import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemedText } from "@/Shared/Components/ThemedText";
import IModalProps from "@/Shared/Types/IModalProps";
import Constants from "@/Shared/Constants/Constants";
import { StyleSheet } from "react-native";

const IModal: React.FC<IModalProps> = ({
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modalContainer: {
    width: "90%", // 90% of screen width
    maxWidth: 700,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 20,
  },
  content: {
    backgroundColor: Constants.colors.lightGray,
    borderRadius: 10,
  },
});

export default React.memo(IModal);
