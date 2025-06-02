import { AppColors } from "constants/colors";
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import DatePicker from "@components/DatePicker";
import Button from "@components/Button";

export default function OnboardingScreen() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    birthDate: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      birthDate: "",
    };

    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    } else if (name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!birthDate) {
      newErrors.birthDate = "Please select your date of birth";
    } else if (birthDate > new Date()) {
      newErrors.birthDate = "Date of birth cannot be in the future";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    try {
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Welcome to the{"\n"} Stoic in You</Text>
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
          onChangeText={(text) => {
            setName(text);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          autoCapitalize="words"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <DatePicker
          label="Date of Birth"
          value={birthDate}
          onChange={(date) => {
            setBirthDate(date);
            setErrors((prev) => ({ ...prev, birthDate: "" }));
          }}
          maxDate={new Date()}
        />
        {errors.birthDate && (
          <Text style={styles.errorText}>{errors.birthDate}</Text>
        )}

        <Button text={"Continue"} onPress={handleSubmit} />
      </View>
    </ScrollView>
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
  inputContainer: { width: "100%", marginTop: 8 },
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
