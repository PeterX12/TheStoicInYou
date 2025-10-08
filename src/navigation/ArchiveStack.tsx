import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArchiveScreen from "@screens/Archive/ArchiveScreen";
import QuotesScreen from "@screens/Archive/QuotesScreen";

const ArchiveStack = createNativeStackNavigator();

export const ArchiveStackScreen = () => {
  return (
    <ArchiveStack.Navigator screenOptions={{ headerShown: false }}>
      <ArchiveStack.Screen name="ArchiveHome" component={ArchiveScreen} />
      <ArchiveStack.Screen name="Quotes" component={QuotesScreen} />
    </ArchiveStack.Navigator>
  );
};
