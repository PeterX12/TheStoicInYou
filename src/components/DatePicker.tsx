import { AppColors } from "constants/colors";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width } = Dimensions.get("window");

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
        <Text style={styles.dateText}>
          {value ? value.toLocaleDateString() : "Select your date of birth"}
        </Text>
      </Pressable>

      {/* Show date picker on Android */}
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
      {/* Show date picker on iOS */}
      {showDatePicker && Platform.OS === "ios" && (
        <View style={styles.iosPickerContainer}>
          <Pressable style={styles.iosOverlay} onPress={handleCancel} />
          <View style={styles.iosPickerWrapper}>
            <View style={styles.iosButtonContainer}>
              <Pressable onPress={handleCancel}>
                <Text style={styles.iosButton}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleConfirm}>
                <Text style={[styles.iosButton, styles.iosButtonConfirm]}>
                  Done
                </Text>
              </Pressable>
            </View>

            <DateTimePicker
              value={tempDate || new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              style={styles.iosPicker}
              minimumDate={minDate}
              maximumDate={maxDate}
            />
          </View>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
    padding: 12,
    justifyContent: "center",
    minHeight: 48,
    width: "100%",
  },
  dateText: {
    color: AppColors.Black,
    fontSize: 16,
    width: "100%",
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
  iosPickerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    zIndex: 10,
  },
  iosOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.Black + "80",
  },
  iosPickerWrapper: {
    backgroundColor: AppColors.White,
    borderRadius: 16,
    margin: 20,
    padding: 16,
    maxHeight: 400,
    width: width * 0.9,
    alignSelf: "center",
  },
  iosPicker: {
    height: 300,
    width: "100%",
  },
  iosButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.Black,
  },
  iosButton: {
    fontSize: 16,
    color: AppColors.Black,
    padding: 8,
  },
  iosButtonConfirm: {
    color: AppColors.Black,
    fontWeight: "bold",
  },
});

export default DatePicker;
