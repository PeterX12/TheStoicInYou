import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Gender = "male" | "female" | "other";

interface GenderPickerProps {
  value: Gender | null;
  onGenderChange: (gender: Gender) => void;
  label?: string;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const GenderPicker = ({
  value,
  onGenderChange,
  label,
  error,
  onFocus,
  onBlur,
}: GenderPickerProps) => {
  const [showModal, setShowModal] = useState(false);
  const [tempGender, setTempGender] = useState<Gender>("male");
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    setIsFocused(true);
    onFocus?.();
    setTempGender(value || "male");
    setShowModal(true);
  };

  const handleClose = () => {
    setIsFocused(false);
    onBlur?.();
    setShowModal(false);
  };

  const handleConfirm = () => {
    onGenderChange(tempGender);
    setIsFocused(false);
    onBlur?.();
    setShowModal(false);
  };

  const handleCancel = () => {
    setIsFocused(false);
    onBlur?.();
    setShowModal(false);
  };

  const genderOptions: {
    label: string;
    value: Gender;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    { label: "Male", value: "male", icon: "male-outline" },
    { label: "Female", value: "female", icon: "female-outline" },
    { label: "Other", value: "other", icon: "person-outline" },
  ];

  const getDisplayValue = () => {
    if (!value) return "Select your gender";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            isFocused && styles.labelFocused,
            error && styles.labelError,
          ]}
        >
          {label}
        </Text>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          pressed && styles.inputPressed,
        ]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.genderText,
            !value && styles.placeholderText,
            error && styles.inputErrorText,
          ]}
        >
          {getDisplayValue()}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={
            error
              ? AppColors.Error
              : isFocused
                ? AppColors.Accent
                : AppColors.PlaceHolder
          }
        />
      </Pressable>

      {/* REMOVED: The error display from here - now only shows in parent */}

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCancel}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <Pressable onPress={handleCancel} hitSlop={Spacing.sm}>
                <Ionicons name="close" size={24} color={AppColors.SoftBlack} />
              </Pressable>
            </View>

            <View style={styles.optionsContainer}>
              {genderOptions.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.option,
                    tempGender === option.value && styles.selectedOption,
                  ]}
                  onPress={() => setTempGender(option.value)}
                >
                  <View style={styles.optionLeft}>
                    <Ionicons
                      name={option.icon}
                      size={22}
                      color={
                        tempGender === option.value
                          ? AppColors.Accent
                          : AppColors.SoftBlack
                      }
                    />
                    <Text
                      style={[
                        styles.optionText,
                        tempGender === option.value &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {tempGender === option.value && (
                    <Ionicons
                      name="checkmark"
                      size={22}
                      color={AppColors.Accent}
                    />
                  )}
                </Pressable>
              ))}
            </View>

            <View style={styles.modalFooter}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: AppColors.SoftBlack,
    marginBottom: Spacing.xs,
  },
  labelFocused: {
    color: AppColors.Accent,
  },
  labelError: {
    color: AppColors.Error,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: AppColors.White,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.Black10,
  },
  inputFocused: {
    borderColor: AppColors.Accent,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: AppColors.Error,
  },
  inputPressed: {
    opacity: 0.9,
  },
  genderText: {
    color: AppColors.SoftBlack,
    fontSize: 16,
    flex: 1,
    fontWeight: "400",
  },
  placeholderText: {
    color: AppColors.PlaceHolder,
  },
  inputErrorText: {
    color: AppColors.Error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColors.Black60,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: AppColors.White,
    borderRadius: 24,
    width: "100%",
    maxWidth: 400,
    padding: Spacing.lg,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.Black10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.SoftBlack,
  },
  optionsContainer: {
    paddingVertical: Spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: 12,
    marginVertical: 2,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  optionText: {
    fontSize: 16,
    color: AppColors.SoftBlack,
    fontWeight: "400",
  },
  selectedOption: {
    backgroundColor: AppColors.AccentSoft,
  },
  selectedOptionText: {
    color: AppColors.AccentDark,
    fontWeight: "500",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: AppColors.Black10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: AppColors.White,
    borderWidth: 1,
    borderColor: AppColors.Black20,
  },
  cancelButtonText: {
    color: AppColors.SoftBlack,
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButton: {
    backgroundColor: AppColors.Accent,
  },
  confirmButtonText: {
    color: AppColors.White,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GenderPicker;
