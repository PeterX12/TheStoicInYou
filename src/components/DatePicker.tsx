import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  maxDate?: Date;
  minDate?: Date;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
}

const DatePicker = ({
  label,
  value,
  onChange,
  error,
  maxDate,
  minDate,
  onFocus,
  onBlur,
  placeholder = "Select your date of birth",
}: DatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(value ?? null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setTempDate(value ?? null);
  }, [value]);

  const handlePress = () => {
    setIsFocused(true);
    onFocus?.();
    setShowDatePicker(true);
  };

  const handleClose = () => {
    setIsFocused(false);
    onBlur?.();
    setShowDatePicker(false);
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setIsFocused(false);
      onBlur?.();
      setShowDatePicker(false);
      if (date) onChange(date);
    } else {
      if (date) setTempDate(date);
    }
  };

  const handleConfirm = () => {
    setIsFocused(false);
    onBlur?.();
    setShowDatePicker(false);
    if (tempDate) onChange(tempDate);
  };

  const handleCancel = () => {
    setIsFocused(false);
    onBlur?.();
    setShowDatePicker(false);
    setTempDate(value ?? null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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
            styles.dateText,
            !value && styles.placeholderText,
            error && styles.inputErrorText,
          ]}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
        <Ionicons
          name="calendar-outline"
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

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Android Picker */}
      {showDatePicker && Platform.OS === "android" && (
        <View style={styles.androidPickerContainer}>
          <DateTimePicker
            value={tempDate || new Date()}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            textColor={AppColors.SoftBlack}
            themeVariant="light"
            maximumDate={maxDate}
            minimumDate={minDate}
            style={styles.androidPicker}
          />
        </View>
      )}

      {/* iOS/Web Modal Picker */}
      <Modal
        visible={showDatePicker && Platform.OS !== "android"}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCancel}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <Pressable onPress={handleCancel} hitSlop={Spacing.sm}>
                <Ionicons name="close" size={24} color={AppColors.SoftBlack} />
              </Pressable>
            </View>

            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempDate || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                style={styles.picker}
                minimumDate={minDate}
                maximumDate={maxDate}
                textColor={AppColors.SoftBlack}
                themeVariant="light"
              />
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
  dateText: {
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
  errorText: {
    color: AppColors.Error,
    fontSize: 13,
    marginTop: Spacing.xs,
    fontWeight: "400",
  },
  androidPickerContainer: {
    width: width * 0.9,
    alignSelf: "center",
    backgroundColor: AppColors.White,
    borderRadius: 16,
    marginTop: Spacing.xs,
    overflow: "hidden",
  },
  androidPicker: {
    height: 180,
    width: "100%",
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
  pickerContainer: {
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  picker: {
    height: 200,
    width: "100%",
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

export default DatePicker;
