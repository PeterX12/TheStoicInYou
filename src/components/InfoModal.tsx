import Ionicons from "@expo/vector-icons/build/Ionicons";
import { AppColors } from "constants/colors";
import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";

interface InfoModalProps {
  isVisible: boolean;
  onClose?: () => void;
  content: string;
}

const InfoModal = ({ isVisible, onClose, content }: InfoModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconRow}>
            <View style={styles.centerIcon}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={AppColors.Black}
              />
            </View>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons
                name="close-outline"
                size={24}
                color={AppColors.Black}
              />
            </Pressable>
          </View>
          <Text style={styles.content}>{content}</Text>
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
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: AppColors.White,
    borderRadius: 8,
    padding: 16,
    paddingBottom: 32,
    alignItems: "center",
    marginHorizontal: 16,
  },
  content: {
    fontSize: 16,
    color: AppColors.Black,
    textAlign: "center",
  },
  iconRow: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  centerIcon: {
    flex: 1,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
});

export default InfoModal;
