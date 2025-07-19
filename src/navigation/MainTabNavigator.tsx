import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppColors } from "constants/colors";
import { ArchiveStackScreen } from "./ArchiveStack";
import { MeditationsStackScreen } from "./MeditationsStack";
import { ProfileStackScreen } from "./ProfileStack";
import { TabParamList } from "types/navigation";

const Tab = createBottomTabNavigator<TabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Archive"
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
};
