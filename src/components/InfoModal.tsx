import Ionicons from "@expo/vector-icons/build/Ionicons";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
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
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="information-circle-outline"
              size={32}
              color={AppColors.Accent}
            />
          </View>

          <Text style={styles.content}>{content}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.closeButtonPressed,
            ]}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Got it</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.Black60,
  },
  modalContent: {
    backgroundColor: AppColors.White,
    borderRadius: 28,
    padding: Spacing.xl,
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    maxWidth: 400,
    width: "100%",
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: AppColors.AccentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  content: {
    fontSize: 16,
    color: AppColors.SoftBlack,
    opacity: 0.85,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  closeButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: 20,
    backgroundColor: AppColors.AccentSoft,
    minWidth: 120,
    alignItems: "center",
  },
  closeButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: AppColors.Accent,
  },
});

export default InfoModal;
