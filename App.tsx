import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArchiveScreen from "@screens/Archive/ArchiveScreen";
import MeditationsScreen from "@screens/Meditations/MeditationsScreen";
import ProfileScreen from "@screens/Profile/ProfileScreen";
import { AppColors } from "constants/colors";
import * as SplashScreen from "expo-splash-screen";
import { useUserSetup } from "hooks/useUserSetup";
import { useEffect } from "react";
import OnboardingScreen from "@screens/Onboarding/OnboardingScreen";

const ArchiveStack = createNativeStackNavigator();
const MeditationsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const OnboardingStack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

function OnboardingStackScreen() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Onboarding" component={OnboardingScreen} />
    </OnboardingStack.Navigator>
  );
}

function ArchiveStackScreen() {
  return (
    <ArchiveStack.Navigator screenOptions={{ headerShown: false }}>
      <ArchiveStack.Screen name="ArchiveHome" component={ArchiveScreen} />
    </ArchiveStack.Navigator>
  );
}

function MeditationsStackScreen() {
  return (
    <MeditationsStack.Navigator screenOptions={{ headerShown: false }}>
      <MeditationsStack.Screen
        name="MeditationsHome"
        component={MeditationsScreen}
      />
    </MeditationsStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile Home" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Archive") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "Meditations") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else {
            iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: AppColors.tabBarActiveColor,
        tabBarInactiveTintColor: AppColors.tabBarInactiveColor,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          borderTopWidth: 0,
          elevation: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Archive" component={ArchiveStackScreen} />
      <Tab.Screen name="Meditations" component={MeditationsStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

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
