import { AppColors } from "constants/colors";
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { StyleSheet } from "react-native";
import DatePicker from "@components/DatePicker";
import Button from "@components/Button";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { UserProfile } from "types/user";
import { saveUserProfile } from "services/userService";
import { RootStackParamList } from "types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GenderPicker from "@components/GenderPicker";

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

export default function OnboardingScreen() {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    birthDate: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(
    null
  );

  const validateForm = () => {
    const newErrors = {
      name: "",
      birthDate: "",
      gender: "",
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

    if (!gender) {
      newErrors.gender = "Please select your gender";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const userProfile: UserProfile = {
        name: name.trim(),
        dateOfBirth: birthDate!.toISOString(),
        gender: gender!,
      };

      await saveUserProfile(userProfile);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTab" }],
        })
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save user profile. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setIsSubmitting(false);
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

      <View style={[styles.inputContainer, { marginBottom: 24 }]}>
        <Text style={styles.inputText}>Your Name</Text>
        <TextInput
          style={styles.input}
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

      <View style={[styles.inputContainer, { marginBottom: 24 }]}>
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
      </View>

      <View style={[styles.inputContainer, { marginBottom: 48 }]}>
        <GenderPicker
          value={gender}
          onGenderChange={(selectedGender) => {
            setGender(selectedGender);
            setErrors((prev) => ({ ...prev, gender: "" }));
          }}
          label="Gender"
          error={errors.gender}
        />
      </View>

      <Button
        text={isSubmitting ? "Saving..." : "Continue"}
        onPress={handleSubmit}
      />
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
  inputContainer: {
    width: "100%",
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
    fontSize: 16,
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
