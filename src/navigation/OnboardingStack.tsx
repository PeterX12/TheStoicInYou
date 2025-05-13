import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "@screens/Onboarding/OnboardingScreen";

const OnboardingStack = createNativeStackNavigator();

export const OnboardingStackScreen = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Onboarding" component={OnboardingScreen} />
    </OnboardingStack.Navigator>
  );
};
