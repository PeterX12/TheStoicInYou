import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MeditationsScreen from "@screens/Meditations/MeditationsScreen";

const MeditationStack = createNativeStackNavigator();

export const MeditationsStackScreen = () => {
  return (
    <MeditationStack.Navigator screenOptions={{ headerShown: false }}>
      <MeditationStack.Screen
        name="MeditationHome"
        component={MeditationsScreen}
      />
    </MeditationStack.Navigator>
  );
};
