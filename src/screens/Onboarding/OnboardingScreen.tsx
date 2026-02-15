import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StyleSheet } from "react-native";
import DatePicker from "@components/DatePicker";
import Button from "@components/Button";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { UserProfile } from "types/user";
import { RootStackParamList } from "types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GenderPicker from "@components/GenderPicker";
import { AppStyles } from "constants/styles";
import { useUserProfile } from "hooks/useUserProfile";
import { Ionicons } from "@expo/vector-icons";

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
    null,
  );
  const { updateProfile } = useUserProfile();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const [focusedField, setFocusedField] = useState<string | null>(null);

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

      await updateProfile(userProfile);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTab" }],
        }),
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="leaf-outline"
                size={36}
                color={AppColors.Accent}
              />
            </View>
            <Text style={styles.heroTitle}>Begin Your Practice</Text>
            <Text style={styles.heroSubtitle}>
              Know yourself to grow yourself
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  focusedField === "name" && styles.labelFocused,
                ]}
              >
                What should we call you?
              </Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "name" && styles.inputFocused,
                  errors.name && styles.inputError,
                ]}
                placeholder="Enter your full name"
                placeholderTextColor={AppColors.PlaceHolder}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="words"
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  focusedField === "date" && styles.labelFocused,
                ]}
              >
                When were you born?
              </Text>
              <DatePicker
                value={birthDate}
                onChange={(date) => {
                  setBirthDate(date);
                  setErrors((prev) => ({ ...prev, birthDate: "" }));
                }}
                onFocus={() => setFocusedField("date")}
                onBlur={() => setFocusedField(null)}
                maxDate={new Date()}
                placeholder="Select your date of birth"
              />
              {errors.birthDate && (
                <Text style={styles.errorText}>{errors.birthDate}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  focusedField === "gender" && styles.labelFocused,
                ]}
              >
                How do you identify?
              </Text>
              <GenderPicker
                value={gender}
                onGenderChange={(selectedGender) => {
                  setGender(selectedGender);
                  setErrors((prev) => ({ ...prev, gender: "" }));
                }}
                onFocus={() => setFocusedField("gender")}
                onBlur={() => setFocusedField(null)}
                error={errors.gender}
              />
              {errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text={isSubmitting ? "Beginning..." : "Begin Your Journey"}
              onPress={handleSubmit}
              iconName="arrow-forward"
              iconPosition="right"
              disabled={isSubmitting}
              fullWidth
            />

            <Text style={styles.disclaimer}>
              You can update these details in Settings
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: AppColors.AppBackground,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
  },
  heroSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl * 1.5,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: AppColors.AccentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: AppColors.SoftBlack,
    letterSpacing: -0.5,
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 15,
    color: AppColors.SoftBlack,
    opacity: 0.6,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
  },
  formSection: {
    marginBottom: Spacing.xl * 1.5,
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
  labelFocused: {
    color: AppColors.Accent,
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
  inputFocused: {
    borderColor: AppColors.Accent,
    borderWidth: 1.5,
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
    marginTop: Spacing.md,
  },
  disclaimer: {
    fontSize: 12,
    color: AppColors.SoftBlack,
    opacity: 0.4,
    textAlign: "center",
    marginTop: Spacing.md,
    fontWeight: "400",
  },
});
