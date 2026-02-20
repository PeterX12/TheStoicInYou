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
        tabBarActiveTintColor: AppColors.Accent,
        tabBarInactiveTintColor: AppColors.SoftBlack,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 72,
          paddingBottom: 12,
          paddingTop: 8,
          backgroundColor: AppColors.White,
          borderTopWidth: 0,
          shadowColor: AppColors.Black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 0,
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
