import AppBar from "@components/AppBar";
import Button from "@components/Button";
import DatePicker from "@components/DatePicker";
import GenderPicker from "@components/GenderPicker";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { useUserProfile } from "hooks/useUserProfile";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import { UserProfile } from "types/user";

export default function SettingsScreen() {
  const { userProfile, updateProfile } = useUserProfile();
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    birthDate: "",
    gender: "",
  });
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userProfile?.dateOfBirth) {
      setBirthDate(new Date(userProfile.dateOfBirth));
    }
  }, [userProfile?.dateOfBirth]);

  useEffect(() => {
    if (userProfile?.name) {
      setName(userProfile.name);
    }
  }, [userProfile?.name]);

  useEffect(() => {
    if (userProfile?.gender) {
      setGender(userProfile.gender);
    }
  }, [userProfile?.gender]);

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

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const profile: UserProfile = {
        name: name,
        dateOfBirth: birthDate!.toISOString(),
        gender: gender!,
      };

      await updateProfile(profile);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar title={"Settings"} showBackButton={true} />
      <ScrollView contentContainerStyle={AppStyles.buttonContainer}>
        <View style={[AppStyles.inputContainer, { marginBottom: 24 }]}>
          <Text style={AppStyles.inputText}>Your Name</Text>
          <TextInput
            placeholder="Enter your full name"
            value={name}
            style={AppStyles.input}
            placeholderTextColor={AppColors.PlaceHolder}
            autoCapitalize="words"
            onChangeText={(text) => {
              setName(text);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
          />
          {errors.name && (
            <Text style={AppStyles.inputErrorText}>{errors.name}</Text>
          )}
        </View>

        <View style={[AppStyles.inputContainer, { marginBottom: 24 }]}>
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
            <Text style={AppStyles.inputErrorText}>{errors.birthDate}</Text>
          )}
        </View>

        <View style={[AppStyles.inputContainer, { marginBottom: 48 }]}>
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
          text={isSubmitting ? "Saving..." : "Save"}
          onPress={handleSave}
        />
      </ScrollView>
    </View>
  );
}
