import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArchiveScreen from "@screens/Archive/ArchiveScreen";

const ArchiveStack = createNativeStackNavigator();

export const ArchiveStackScreen = () => {
  return (
    <ArchiveStack.Navigator screenOptions={{ headerShown: false }}>
      <ArchiveStack.Screen name="ArchiveHome" component={ArchiveScreen} />
    </ArchiveStack.Navigator>
  );
};
