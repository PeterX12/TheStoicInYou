import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArchiveScreen from "@screens/Archive/ArchiveScreen";
import MeditationsScreen from "@screens/Meditations/MeditationsScreen";
import ProfileScreen from "@screens/Profile/ProfileScreen";
import { AppColors } from "constants/colors";

const ArchiveStack = createNativeStackNavigator();
const MeditationsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ArchiveStackScreen() {
  return (
    <ArchiveStack.Navigator>
      <ArchiveStack.Screen name="Archive" component={ArchiveScreen} />
    </ArchiveStack.Navigator>
  );
}

function MeditationsStackScreen() {
  return (
    <MeditationsStack.Navigator>
      <MeditationsStack.Screen
        name="Meditations"
        component={MeditationsScreen}
      />
    </MeditationsStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.AppBackground,
    alignItems: "center",
    justifyContent: "center",
  },
});
