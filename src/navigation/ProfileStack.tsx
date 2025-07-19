import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "@screens/Profile/ProfileScreen";

const ProfileStack = createNativeStackNavigator();

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};
