import { AppColors } from "constants/colors";
import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "@components/DatePicker";

export default function OnboardingScreen() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    birthDate: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Stoic in You</Text>
      <Text style={styles.subtitle}>
        Please enter your name and date of birth
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Your Name</Text>
        <TextInput
          style={[styles.input, errors.name && styles.errorText]}
          placeholder="Enter your full name"
          placeholderTextColor={AppColors.Black}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <DatePicker
          label="Date of Birth"
          value={birthDate}
          onChange={setBirthDate}
          maxDate={new Date()}
        />
        {errors.birthDate && (
          <Text style={styles.errorText}>{errors.birthDate}</Text>
        )}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.AppBackground,
    paddingHorizontal: 76,
  },
  title: {
    color: AppColors.White,
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    color: AppColors.White,
    fontSize: 16,
    marginVertical: 30,
    textAlign: "center",
  },
  inputContainer: { width: "100%" },
  inputText: {
    color: AppColors.White,
    fontSize: 16,
  },
  input: {
    backgroundColor: AppColors.White,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginTop: 8,
  },
  errorText: {
    color: AppColors.Error,
    fontSize: 14,
    marginTop: 8,
  },
  dateText: {
    color: AppColors.Black,
    fontSize: 16,
  },
});
