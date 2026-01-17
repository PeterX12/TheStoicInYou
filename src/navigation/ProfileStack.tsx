import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "@screens/Profile/ProfileScreen";
import SettingsScreen from "@screens/Profile/SettingsScreen";
import { ProfileStackParamList } from "types/navigation";

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
};
