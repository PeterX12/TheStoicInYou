import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "@screens/Onboarding/OnboardingScreen";
import * as SplashScreen from "expo-splash-screen";
import { useUserSetup } from "hooks/useUserSetup";
import { MainTabNavigator } from "navigation/MainTabNavigator";
import { useEffect } from "react";
import { RootStackParamList } from "types/navigation";

SplashScreen.preventAutoHideAsync();

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { isLoading, isUserSetup } = useUserSetup();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={isUserSetup ? "MainTab" : "Onboarding"}
        screenOptions={{ headerShown: false }}
      >
        {!isUserSetup && (
          <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
        <RootStack.Screen name="MainTab" component={MainTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
