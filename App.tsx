import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useUserSetup } from "hooks/useUserSetup";
import { MainTabNavigator } from "navigation/MainTabNavigator";
import { OnboardingStackScreen } from "navigation/OnboardingStack";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

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
      {!isUserSetup ? <OnboardingStackScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
}
