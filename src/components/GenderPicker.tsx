import { AppColors } from "constants/colors";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";

type Gender = "male" | "female" | "other";

interface GenderPickerProps {
  value: Gender | null;
  onGenderChange: (gender: Gender) => void;
  label?: string;
  error?: string;
}

const GenderPicker = ({
  value,
  onGenderChange,
  label,
  error,
}: GenderPickerProps) => {
  const [showModal, setShowModal] = useState(false);
  const [tempGender, setTempGender] = useState<Gender>("male");

  const handleConfirm = () => {
    onGenderChange(tempGender);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const genderOptions: { label: string; value: Gender }[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.inputText}>{label}</Text>}

      <Pressable
        style={styles.input}
        onPress={() => {
          setTempGender(value || "male");
          setShowModal(true);
        }}
      >
        <Text style={[styles.genderText, !value && styles.placeholderText]}>
          {value
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : "Select your gender"}
        </Text>
      </Pressable>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCancel}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable onPress={handleCancel}>
                <Text style={styles.modalButton}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleConfirm}>
                <Text style={[styles.modalButton, styles.confirmButton]}>
                  Done
                </Text>
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
                  <Text style={styles.optionText}>{option.label}</Text>
                </Pressable>
              ))}
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
    marginBottom: 16,
  },
  inputText: {
    color: AppColors.White,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: AppColors.White,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  genderText: {
    color: AppColors.Black,
    fontSize: 16,
  },
  placeholderText: {
    color: AppColors.PlaceHolder,
  },
  errorText: {
    color: AppColors.Error,
    fontSize: 14,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: AppColors.White,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.Black,
  },
  modalButton: {
    fontSize: 16,
    color: AppColors.Black,
    padding: 8,
  },
  confirmButton: {
    fontWeight: "bold",
    color: AppColors.Black,
  },
  optionsContainer: {
    paddingVertical: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedOption: {
    backgroundColor: AppColors.Black + "20",
  },
  optionText: {
    fontSize: 16,
    color: AppColors.Black,
  },
});

export default GenderPicker;
