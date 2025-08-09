import { AppColors } from "constants/colors";
import { useState } from "react";
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

const { width, height } = Dimensions.get("window");

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  maxDate?: Date;
  minDate?: Date;
}

const DatePicker = ({
  label,
  value,
  onChange,
  error,
  maxDate,
  minDate,
}: DatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(value ?? null);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (date) onChange(date);
    } else {
      if (date) setTempDate(date);
    }
  };

  const handleConfirm = () => {
    setShowDatePicker(false);
    if (tempDate) onChange(tempDate);
  };

  const handleCancel = () => {
    setShowDatePicker(false);
    setTempDate(value ?? null);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.inputText}>{label}</Text>}

      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={[styles.dateText, !value && styles.placeholderText]}>
          {value ? value.toLocaleDateString() : "Select your date of birth"}
        </Text>
      </Pressable>

      {/* Android Picker */}
      {showDatePicker && Platform.OS === "android" && (
        <View style={styles.androidPickerContainer}>
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            textColor={AppColors.Black}
            themeVariant="light"
            maximumDate={maxDate}
            minimumDate={minDate}
            style={[styles.androidPicker, { backgroundColor: AppColors.White }]}
          />
        </View>
      )}

      {/* iOS/Web Picker - Now using Modal for center positioning */}
      <Modal
        visible={showDatePicker && Platform.OS !== "android"}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCancel}>
          <View style={styles.modalContent}>
            <View style={styles.pickerContainer}>
              <View style={styles.buttonContainer}>
                <Pressable onPress={handleCancel}>
                  <Text style={styles.button}>Cancel</Text>
                </Pressable>
                <Pressable onPress={handleConfirm}>
                  <Text style={[styles.button, styles.confirmButton]}>
                    Done
                  </Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={tempDate || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                style={styles.picker}
                minimumDate={minDate}
                maximumDate={maxDate}
              />
            </View>
          </View>
        </Pressable>
      </Modal>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "100%",
  },
  inputText: {
    fontSize: 16,
    marginBottom: 8,
    color: AppColors.White,
  },
  input: {
    backgroundColor: AppColors.White,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    paddingVertical: 12,
    width: "100%",
  },
  dateText: {
    color: AppColors.Black,
    fontSize: 16,
    width: "100%",
  },
  placeholderText: {
    color: AppColors.PlaceHolder,
  },
  errorText: {
    color: AppColors.Error,
    fontSize: 14,
    marginTop: 4,
  },
  androidPickerContainer: {
    width: width * 0.9,
    alignSelf: "center",
    backgroundColor: AppColors.White,
  },
  androidPicker: {
    height: 180,
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColors.Black + "80",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: AppColors.White,
    borderRadius: 16,
    overflow: "hidden",
  },
  pickerContainer: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.Black,
  },
  button: {
    fontSize: 16,
    color: AppColors.Black,
    padding: 8,
  },
  confirmButton: {
    fontWeight: "bold",
    color: AppColors.Black,
  },
  picker: {
    height: 200,
    width: "100%",
  },
});

export default DatePicker;
