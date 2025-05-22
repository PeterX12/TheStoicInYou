import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Stoic in You</Text>
      <Text style={styles.subtitle}>
        Please enter your name and date of birth
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />
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
  },
  subtitle: {
    color: AppColors.White,
    fontSize: 16,
    marginVertical: 30,
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
});
