import { AppStyles } from "constants/styles";
import { View, Text } from "react-native";

export default function OnboardingScreen() {
  return (
    <View style={AppStyles.fullScreen}>
      <Text>Welcome to the Stoic in You</Text>
      <Text>Please enter your name and date of birth.</Text>
    </View>
  );
}
