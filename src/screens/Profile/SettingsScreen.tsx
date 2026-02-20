import AppBar from "@components/AppBar";
import Button from "@components/Button";
import DatePicker from "@components/DatePicker";
import GenderPicker from "@components/GenderPicker";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { Spacing } from "constants/spacing";
import { useUserProfile } from "hooks/useUserProfile";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
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
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

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

      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Settings"} showBackButton={true} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile Settings</Text>
          <Text style={styles.headerSubtitle}>
            Manage your personal information
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={name}
              style={[styles.input, errors.name && styles.inputError]}
              placeholderTextColor={AppColors.PlaceHolder}
              autoCapitalize="words"
              onChangeText={(text) => {
                setName(text);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Date Picker */}
          <View style={styles.inputGroup}>
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

          {/* Gender Picker */}
          <View style={styles.inputGroup}>
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
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            text={isSubmitting ? "Saving..." : "Save Changes"}
            onPress={handleSave}
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "500",
    color: AppColors.SoftBlack,
    letterSpacing: -0.4,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: 15,
    color: AppColors.SoftBlack,
    opacity: 0.6,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: AppColors.White,
    borderRadius: 24,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: AppColors.SoftBlack,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: AppColors.White,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: AppColors.SoftBlack,
    borderWidth: 1,
    borderColor: AppColors.Black10,
    fontWeight: "400",
  },
  inputError: {
    borderColor: AppColors.Error,
  },
  errorText: {
    color: AppColors.Error,
    fontSize: 13,
    marginTop: Spacing.xs,
    fontWeight: "400",
  },
  buttonContainer: {
    marginTop: Spacing.xs,
  },
});
